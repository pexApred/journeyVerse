import React, { createContext, useState } from 'react';

export const Context = createContext();

export const Provider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [journeys, setJourneys] = useState([]);

    return (
        <Context.Provider value={{ loggedIn, setLoggedIn, journeys, setJourneys }}>
            {props.children}
        </Context.Provider>
    );
};