import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        savedJourneys {
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
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($firstName: String!,$lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const CREATE_JOURNEY = gql`
  mutation createJourney($input: CreateJourneyInput!) {
    createJourney(input: $input) {
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
      }
      invitedTravelers {
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
    $creator: ID
    $invitedTravelers: [InvitedTravelerInput!]
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

export const SAVE_JOURNEY = gql`
  mutation saveJourney($journeyId: ID!) {
    saveJourney(journeyId: $journeyId) {
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

export const ADD_TRAVELER = gql`
  mutation addTraveler($id: ID!, $travelerId: ID!) {
    addTraveler(id: $id, travelerId: $travelerId) {
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

export const REMOVE_TRAVELER = gql`
  mutation removeTraveler($id: ID!, $travelerId: ID!) {
    removeTraveler(id: $id, travelerId: $travelerId) {
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