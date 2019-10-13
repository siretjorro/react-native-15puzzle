import React from "react";

export interface IAppContext {
    orientation: string,
    moves: number,
    game: boolean,
    gameboard: string[][],
    winningSolution: string[][],
    timerStarted: boolean,
    makeMove: (cell: string) => boolean,
    newGame: () => void
}

export const AppContext = React.createContext<IAppContext>(
    // default value, when no Provider is found
    null
);

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
