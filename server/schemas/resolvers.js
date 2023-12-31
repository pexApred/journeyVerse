const { User, Journey } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const dateFormat = require('../utils/dateFormat');

// TODO:
// Go through and make more generic error messages after complete for security reasons
// 

module.exports = {
  // set up a query resolver to get all users
  Query: {
    me: async (parent, args, context) => {
      const userId = context.user.id;
      console.log('contextFetching me for user', userId);
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding myself!');
      }
    },
    user: async (parent, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding a user by id!');
      }
    },
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding a user !');
      }
    },
    journey: async (parent, { id }) => {
      try {
        const journey = await Journey.findById(id).populate('creator').populate('invitedTravelers').execPopulate();
    
        // Convert the ObjectId fields to strings
        journey = journey.toObject();
                journey.id = journey._id.toString();
                journey.creator.id = journey.creator._id.toString();
        journey.invitedTravelers.forEach((traveler, index) => {
          journey.invitedTravelers[index].id = traveler._id.toString();
        });
    
        journey.departingDate = dateFormat(journey.departingDate);
        journey.returningDate = dateFormat(journey.returningDate);
    
        return journey;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding and populating the Journey!');
      }
    },
    journeys: async (parent, args, context) => {
      console.log('contextFetching journeys for user', context.user.id);
      try {
        let journeys = await Journey.find({ creator: context.user.id }).populate('creator').populate('invitedTravelers').exec();
        console.log('journeys', journeys);
    
        journeys = journeys.map(journey => {
          journey = journey.toObject();
                    journey.id = journey._id.toString();
          console.log('journey', journey._id);
                    journey.creator.id = journey.creator._id.toString();
          journey.invitedTravelers.forEach((traveler, index) => {
            journey.invitedTravelers[index].id = traveler._id.toString();
          });
    
          journey.departingDate = dateFormat(journey.departingDate);
          journey.returningDate = dateFormat(journey.returningDate);
          return journey;
        });
    
        return journeys;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding and populating the Journeys!');
      }
    }
    
    // Check id  parameter if problematic

  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Can't find this user");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    createUser: async (parent, args) => {

      const user = await User.create(args);
      if (!user) {
        throw new Error("Something is wrong!");
      }
      const token = signToken(user);
      return { token, user };
    },
    createJourney: async (parent, { input }, context) => {
      const {
        destinationCity,
        destinationState,
        destinationCountry,
        departingDate,
        returningDate,
        transportationOutbound,
        transportationReturn,
        transportationDetails,
        accommodations,
        creator,
        invitedTravelers,
      } = input;
      if (!context.user) {
        throw new Error("Something went horribly wrong!");
      }
      try {
        // Create traveler documents for each invited traveler to grab their ids
        let invitedTravelerIds = [];
        if (Array.isArray(invitedTravelers)) {
          invitedTravelerIds = await Promise.all(invitedTravelers.map(async ({ email, firstName, lastName }) => {
            let traveler = await User.findOne({ email });
            if (!traveler) {
              traveler = await User.create({
                email,
                firstName,
                lastName,
                // TODO: Setup an email to be sent to the invited traveler with a temporary password || create a "pending" user with a flag indicating they need to set up an account
                password: 'password12345',
              });
            }
            return traveler.id;
          }))
        } else {
        }
        const createdJourney = await Journey.create({
          destinationCity,
          destinationState,
          destinationCountry,
          departingDate,
          returningDate,
          transportationOutbound,
          transportationReturn,
          transportationDetails,
          accommodations,
          creator: context.user.id,
          invitedTravelers: invitedTravelerIds,
        });

        if (!createdJourney) {
          throw new Error("Something went wrong with creating a journey!");
        }
        const updatedUser = await User.findByIdAndUpdate(
          context.user.id,
          { $push: { savedJourneys: createdJourney.id } },
          { new: true }
        );

        const populatedJourney = createdJourney
          ? await Journey.findById(createdJourney.id).populate('creator').populate('invitedTravelers')
          : null;

        return populatedJourney;
      } catch (err) {
        console.error(err);
        throw new Error(`Something went wrong with creating a journey: ${err.message}`);
      }
    },
    updateJourney: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("Something went horribly wrong!");
      }
            try {
        const updatedJourney = await Journey.findByIdAndUpdate(
          args.id,
          args,
          { new: true }
        );
        return await Journey.findById(updatedJourney.id).populate('creator').populate('invitedTravelers');
          } catch (err) {
        console.error(err);
        throw new Error('Something went wrong with finding and updating Journey details!');
      }
    },
    deleteJourney: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Something went horribly wrong!");
      }
      try {
        const journeyToDelete = await Journey.findById(id);
        // const updatedUser = await User.findByIdAndUpdate(
          if (!journeyToDelete) {
            throw new Error("Something went wrong with finding the journey to delete!");
          }
          await User.findByIdAndUpdate(
          journeyToDelete.creator,
          { $pull: { savedJourneys: journeyToDelete.id } },
          { new: true }
        );
        const deletedJourney = await Journey.findByIdAndDelete(id);
        return deletedJourney;
      } catch (err) {
        console.error('original', err);
        throw new Error('Something went wrong!');
      }
    },
    addTraveler: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("Something went horribly wrong!");
      }
      try {
        const updatedJourney = await Journey.findByIdAndUpdate(
          args.id,
          { $push: { invitedTravelers: args.travelerId } },
          { new: true }
        );
        return await Journey.findById(updatedJourney.id).populate('creator').populate('invitedTravelers');
      } catch (err) {
        console.error(err);
        throw new Error('Something went wrong!');
      }
    },
    removeTraveler: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("Something went horribly wrong!");
      }
      try {
        const updatedJourney = await Journey.findByIdAndUpdate(
          args.id,
          { $pull: { invitedTravelers: args.travelerId } },
          { new: true }
        );
        return await Journey.findById(updatedJourney.id).populate('creator').populate('invitedTravelers');
      } catch (err) {
        console.error(err);
        throw new Error('Something went wrong!');
      }
    }
  }
};