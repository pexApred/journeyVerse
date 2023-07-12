const { gql } = require('apollo-server-express');

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    me: User
    users: [User!]!
    user(id: ID!): User
    journeys: [Journey!]
    journey(id: ID!): Journey
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
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
      invitedTravelers: [InvitedTravelerInput!]!
    ): Journey!
    updateJourney(
      id: ID!
      destinationCity: String
      destinationState: String
      destinationCountry: String
      departingDate: String
      returningDate: String
      transportationOutbound: String
      transportationReturn: String
      transportationDetails: String
      accommodations: String
      creator: ID!
      invitedTravelers: [InvitedTravelerInput!]!
    ): Journey!
    deleteJourney(id: ID!): Journey
    addTraveler(id: ID!, travelerId: ID!): Journey
    removeTraveler(id: ID!, travelerId: ID!): Journey
    inviteTraveler(id: ID!, traveler: InvitedTravelerInput!): Journey
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profilePicture: String
    journeyCount: Int!
    savedJourneys: [Journey!]
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

  input InvitedTravelerInput {
    firstName: String!
    lastName: String!
    email: String!
  }

type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
