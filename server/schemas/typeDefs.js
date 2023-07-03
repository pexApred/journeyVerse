const { gql } = require('apollo-server-express');

// Define your GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profilePicture: String
    journeys: [Journey!]!
  }

  type Journey {
    id: ID!
    destinationCity: String!
    destinationState: String!
    destinationCountry: String!
    departingDate: String!
    returningDate: String!
    transportationOutbound: String!
    transportationReturn: String!
    transportationDetails: String!
    accommodations: String!
    creator: User!
    invitedTravelers: [User!]!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    journeys: [Journey!]!
    journey(id: ID!): Journey
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!): User!
    createJourney(
      destinationCity: String!
      destinationState: String!
      destinationCountry: String!
      departingDate: String!
      returningDate: String!
      transportationOutbound: String!
      transportationReturn: String!
      transportationDetails: String!
      accommodations: String!
      creator: ID!
      invitedTravelers: [ID!]!
    ): Journey!
  }
`;

module.exports = typeDefs;
