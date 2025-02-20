import { createContext, useState } from "react";
import { PropTypes } from "prop-types";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);

    return (
        <DataContext.Provider
            value={{ characters, setCharacters, planets, setPlanets }}
        >
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
