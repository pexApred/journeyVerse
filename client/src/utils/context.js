import React, { createContext, useState } from 'react';

export const Context = createContext();

export const Provider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [journeys, setJourneys] = useState([]);

    const updateJourneys = (newJourney) => {
        setJourneys((prevJourneys) => [...prevJourneys, newJourney]);
    };

    const deleteContextJourney = (journeyId) => {
        setJourneys((prevJourneys) => prevJourneys.filter((journey) => journey.id !== journeyId));
    };

    return (
        <Context.Provider value={{ loggedIn, setLoggedIn, journeys, setJourneys, updateJourneys, deleteContextJourney }}>
            {props.children}
        </Context.Provider>
    );
};