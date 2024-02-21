import React, { createContext, useState } from 'react';

export const Context = createContext();

export const Provider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [journeys, setJourneys] = useState([]);

    const updateContextJourneys = (updatedJourney, journeyId) => {
        setJourneys((prevJourneys) => 
            prevJourneys.map((journey) =>
                journey.id === journeyId ? updatedJourney : journey
            )
        );
    };

    const deleteContextJourney = (id) => {
        setJourneys((prevJourneys) => prevJourneys.filter((journey) => journey.id !== id));
    };

    return (
        <Context.Provider value={{ loggedIn, setLoggedIn, journeys, setJourneys, updateContextJourneys, deleteContextJourney }}>
            {props.children}
        </Context.Provider>
    );
};