import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            id
            firstName
            lastName
            email
            profilePicture
        }
    }
`;

export const GET_USERS = gql`
    query users {
        users {
            id
            firstName
            lastName
            email
        }
    }
`;

export const GET_USER = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            firstName
            lastName
            email
            profilePicture
        }
    }
`;

export const GET_JOURNEYS = gql`
    query journeys {
        journeys {
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

export const GET_JOURNEY = gql`
    query journey($id: ID!) {
        journey(id: $id) {
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