const User = require('../models/User');
const Journey = require('../models/Journey');

// Define your GraphQL resolvers
const resolvers = {
  Query: {
    users: () => User.find(),// returns all users
    user: (_, { id }) => User.findById(id),// returns a single user by id
    journeys: () => Journey.find(),// returns all journeys
    journey: (_, { id }) => Journey.findById(id),// returns a single journey by id
  },
  Mutation: {
    createUser: (_, { firstName, lastName, email }) => {
      const user = new User({ firstName, lastName, email });// creates a new user
      return user.save();
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
