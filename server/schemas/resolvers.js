const { User, Journey } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

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
        throw new AuthenticationError('Something went wrong!');
      }
    },
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong!');
      }
    },
    user: async (parent, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong!');
      }
    },
    journeys: async () => {
      try {
        const journeys = await Journey.find();
        return journeys;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong!');
      }
    },
    // Check id  parameter if problematic
    journey: async (parent, { id }) => {
      try {
        const journey = await Journey.findById(id);
        return journey;
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Something went wrong!');
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
      if (!context.user) {
        throw new Error("Something went horribly wrong!");
      }
      try {
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
          creator,
          invitedTravelers,
        });
        const createdJourney = await newJourney.save();

        await User.findByIdAndUpdate(
          creator,
          { $push: { journeys: createdJourney._id } },
          { new: true }
        );
        return createdJourney;
      } catch (err) {
        console.error(err);
        throw new Error('Something went wrong!');
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
        return updatedJourney;
      } catch (err) {
        console.error(err);
        throw new Error('Something went wrong!');
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
    }
    // addTraveler: async(parent, args, context) => {
    //   if (!context.user) {
    //     throw new Error("Something went horribly wrong!");
    //   }
    //   try {
    //     const updatedJourney = await Journey.findByIdAndUpdate(
    //       args.id,
    //       { $push: { invitedTravelers: args.travelerId } },
    //       { new: true }
    //     );
    //     return updatedJourney;
    //   } catch (err) {
    //     console.error(err);
    //     throw new Error('Something went wrong!');
    //   }
    // },
    // removeTraveler: async(parent, args, context) => {
    //   if (!context.user) {
    //     throw new Error("Something went horribly wrong!");
    //   }
    //   try {
    //     const updatedJourney = await Journey.findByIdAndUpdate(
    //       args.id,
    //       { $pull: { invitedTravelers: args.travelerId } },
    //       { new: true }
    //     );
    //     return updatedJourney;
    //   } catch (err) {
    //     console.error(err);
    //     throw new Error('Something went wrong!');
    //   }
    // }
  }
};