import React, { createContext, useState } from 'react';

export const JourneyContext = createContext();

export const JourneyProvider = (props) => {
    const [journeys, setJourneys] = useState([]);

    return (
        <JourneyContext.Provider value={{journeys, setJourneys}}>
            {props.children}
        </JourneyContext.Provider>
    );
};