import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($firstName: String!,$lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const CREATE_JOURNEY = gql`
  mutation createJourney(
    $destinationCity: String!
    $destinationState: String!
    $destinationCountry: String!
    $departingDate: String!
    $returningDate: String!
    $transportationOutbound: String!
    $transportationReturn: String!
    $transportationDetails: String!
    $accommodations: String!
    $creator: ID!
    $invitedTravelers: [ID!]
  ) {
    createJourney(
      destinationCity: $destinationCity
      destinationState: $destinationState
      destinationCountry: $destinationCountry
      departingDate: $departingDate
      returningDate: $returningDate
      transportationOutbound: $transportationOutbound
      transportationReturn: $transportationReturn
      transportationDetails: $transportationDetails
      accommodations: $accommodations
      creator: $creator
      invitedTravelers: $invitedTravelers
    ) {
      id
      destinationCity
      destinationState
      destinationCountry
      departingDate
      returningDate
      transportationOutbound
      transportationReturn
      transportationDetails
      accommodations
      creator {
        id
        firstName
        lastName
        email
      }
      invitedTravelers {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_JOURNEY = gql`
  mutation updateJourney(
    $id: ID!
    $destinationCity: String
    $destinationState: String
    $destinationCountry: String
    $departingDate: String
    $returningDate: String
    $transportationOutbound: String
    $transportationReturn: String
    $transportationDetails: String
    $accommodations: String
    $creator: ID!
    $invitedTravelers: [ID!]
  ) {
    updateJourney(
      id: $id
      destinationCity: $destinationCity
      destinationState: $destinationState
      destinationCountry: $destinationCountry
      departingDate: $departingDate
      returningDate: $returningDate
      transportationOutbound: $transportationOutbound
      transportationReturn: $transportationReturn
      transportationDetails: $transportationDetails
      accommodations: $accommodations
      creator: $creator
      invitedTravelers: $invitedTravelers
    ) {
      id
      destinationCity
      destinationState
      destinationCountry
      departingDate
      returningDate
      transportationOutbound
      transportationReturn
      transportationDetails
      accommodations
      creator {
        id
        firstName
        lastName
        email
      }
      invitedTravelers {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const DELETE_JOURNEY = gql`
  mutation deleteJourney($id: ID!) {
    deleteJourney(id: $id) {
      id
      destinationCity
      destinationState
      destinationCountry
      departingDate
      returningDate
      transportationOutbound
      transportationReturn
      transportationDetails
      accommodations
      creator {
        id
        firstName
        lastName
        email
      }
      invitedTravelers {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

// export const SAVE_JOURNEY = gql`
//   mutation saveJourney($journeyId: ID!) {
//     saveJourney(journeyId: $journeyId) {
//       id
//       destinationCity
//       destinationState
//       destinationCountry
//       departingDate
//       returningDate
//       transportationOutbound
//       transportationReturn
//       transportationDetails
//       accommodations
//       creator {
//         id
//         firstName
//         lastName
//         email
//       }
//       invitedTravelers {
//         id
//         firstName
//         lastName
//         email
//       }
//     }
//   }
// `;

