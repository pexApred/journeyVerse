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
        return user;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding myself!');
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
    user: async (parent, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding a user by id!');
      }
    },
    journeys: async () => {
      try {
        const journeys = await Journey.find().populate('creator').populate('invitedTravelers');
        return journeys;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding and populating the creator with the invited travelers!');
      }
    },
    // Check id  parameter if problematic
    journey: async (parent, { id }) => {
      try {
        const journey = await Journey.findById(id).populate('creator').populate('invitedTravelers');
        return journey;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong with finding and populating the creator with the invited travelers!');
      }
    }
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
      if (!user) {
        throw new Error("Something is wrong!");
      }
      const token = signToken(user);
      return { token, user };
    },
    // createJourney: async (parent, args, context) => {
    //   if (!context.user) {
    //     throw new AuthenticationError('Not logged in');
    //   }
    //   try {
    //     const { creator, invitedTravelers } = args;

    //     const invitedTravelerIds = await Promise.all(
    //       invitedTravelers.map(async (traveler) => {
    //         let existingUser = await User.findOne({ email: traveler.email });

    //         if (!existingUser) {
    //           existingUser = await User.create({
    //             email: traveler.email,
    //             firstName: traveler.firstName,
    //             lastName: traveler.lastName,
    //             password: 'password12345',
    //           });
    //         }

    //         return existingUser._id;
    //       })
    //     );

    //     const newJourney = new Journey({
    //       ...args,
    //       creator: mongoose.Types.ObjectId(creator),
    //       invitedTravelers: invitedTravelerIds,
    //     });
    //     console.log("InvitedTravelerIds: ", invitedTravelerIds);
    //     const createdJourney = await newJourney.save();

    //     await User.findByIdAndUpdate(
    //       creator,
    //       { $push: { journeys: createdJourney._id } },
    //       { new: true }
    //     );

    //     return await Journey.findById(createdJourney._id)
    //       .populate('creator')
    //       .populate('invitedTravelers');
    //   } catch (err) {
    //     console.error(err);
    //     throw new Error(`Something went wrong with creating a journey ${err}!`);
    //   }
    // },
    createJourney: async (parent,
      {
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
      }, context
    ) => {
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
        const newJourney = new Journey({
          destinationCity,
          destinationState,
          destinationCountry,
          departingDate,
          returningDate,
          transportationOutbound,
          transportationReturn,
          transportationDetails,
          accommodations,
          creator: new mongoose.Types.ObjectId(creator),
          invitedTravelers: invitedTravelerIds,
        });
        console.log("Cretaor: ", creator);
        console.log("NewJourney: ", newJourney);
        const createdJourney = await newJourney.save();
        console.log("CreatedJourney: ", createdJourney);
        const updatedUser = await User.findByIdAndUpdate(
          creator,
          { $push: { journeys: createdJourney._id } },
          { new: true }
        );
        console.log("Cretaor: ", creator);
        console.log("UpdatedUser: ", updatedUser);
        return await Journey.findById(createdJourney.id).populate('creator').populate('invitedTravelers');
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