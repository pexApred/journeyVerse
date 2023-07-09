const User = require('../models/User');
const Journey = require('../models/Journey');
const { generateToken } = require('../utils/auth');

// Define your GraphQL resolvers
const resolvers = {
  Query: {
    users: () => User.find(),// returns all users
    user: (_, { id }) => User.findById(id),// returns a single user by id
    journeys: () => Journey.find(),// returns all journeys
    journey: (_, { id }) => Journey.findById(id),// returns a single journey by id
  },
  Mutation: {
//     addProfile: (_, { firstName, lastName, email }) => {
//       const user = new User({ firstName, lastName, email });// creates a new user
//       return user.save();
//     },

//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//           throw new AuthenticationError('Sorry, no user found with this email! Please try again!');
//       }
//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//           throw new AuthenticationError('Sorry, incorrect password! Please try again!');
//       }
//       const token = signToken(user);
//       return { token, user };
//   },
    createUser: async (parent, { firstName, lastName, password, email }, context) => {
      try {
          const user = await User.create( { firstName, lastName, password, email });

          if (!user) {
              throw new Error("Something is wrong!");
          }
          const token = generateToken(user.toJSON());
          return { token, user };
      } catch (err) {
          throw new Error(err);
      }
  },
    // creates a new journey
    createJourney: (
      _,
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
      }
    ) => {
      // creates a new journey
      const journey = new Journey({
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
      return journey.save();// returns the new journey
    },
  },
  User: {
    journeys: (user) => Journey.find({ $or: [{ creator: user.id }, { invitedTravelers: user.id }] }),// returns all journeys created by the user or the user was invited to
  },
  // returns the user who created the journey
  Journey: {
    creator: (journey) => User.findById(journey.creator),
    invitedTravelers: (journey) => User.find({ _id: { $in: journey.invitedTravelers } }),// returns all users invited to the journey
  },
};

module.exports = resolvers;