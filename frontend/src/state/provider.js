import React, { createContext, useContext, useReducer } from 'react'

export const Context = createContext()

export const GlobalState = ({ reducer, initilastate, children }) => {
    return (
        <Context.Provider value={useReducer(reducer, initilastate)}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalState = () => useContext(Context)