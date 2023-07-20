const mongoose = require('mongoose');
const { User, Journey } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

// TODO:
// Go through and make more generic error messages after complete for security reasons
// 

module.exports = {
  // set up a query resolver to get all users
  Query: {
    me: async (parent, args, context) => {
      const userId = context.user._id;
      try {
        const user = await User.findById(userId);
        console.log(user, userId);
        return user;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding myself!');
      }
    },
    user: async (parent, { id }) => {
      try {
        const user = await User.findById(id);
        console.log(user, user.id, id);
        return user;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding a user by id!');
      }
    },
    users: async () => {
      try {
        const users = await User.find();
        console.log(users);
        return users;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding a user !');
      }
    },
    journey: async (parent, { id }) => {
      try {
        const journey = await Journey.findById(id).populate('creator').populate('invitedTravelers').execPopulate();
        return journey;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding and populating the creator with the invited travelers!');
      }
    },
    journeys: async (parent, args, context) => {
      try {
        const journeys = await Journey.find({ creator: context.user._id }).populate('creator').populate('invitedTravelers').exec();
        return journeys;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding and populating the creator with the invited travelers!');
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
      console.log(args);

      const user = await User.create(args);
      console.log(user);
      if (!user) {
        throw new Error("Something is wrong!");
      }
      const token = signToken(user);
      console.log(token);
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
      console.log("Invited Travelers: ", invitedTravelers);
      if (!context.user) {
        throw new Error("Something went horribly wrong!");
      }
      try {
        // Create traveler documents for each invited traveler to grab their ids
        console.log("Invited Travelers: ", invitedTravelers);
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
            return traveler._id;
          }))
        } else {
          console.log("Invited Travelers is undefined or not an array");
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
          creator: context.user._id,
          invitedTravelers: invitedTravelerIds,
        });

        if (!createdJourney) {
          throw new Error("Something went wrong with creating a journey!");
        }
        console.log("Invited Travelers: ", invitedTravelers);
        console.log("Creator: ", creator);
        console.log("CreatedJourney: ", createdJourney);
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedJourneys: createdJourney._id } },
          { new: true }
        );
        console.log("Creator: ", creator);
        console.log("UpdatedUser: ", updatedUser);

        const populatedJourney = createdJourney
          ? await Journey.findById(createdJourney._id).populate('creator').populate('invitedTravelers')
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
    deleteJourney: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("Something went horribly wrong!");
      }
      try {
        const journeyToDelete = await Journey.findById(args.id);
        const updatedUser = await User.findByIdAndUpdate(
          journeyToDelete.creator,
          { $pull: { savedJourneys: journeyToDelete._id } },
          { new: true }
        );
        const deletedJourney = await Journey.findByIdAndDelete(args.id);
        return deletedJourney;
      } catch (err) {
        console.error(err);
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