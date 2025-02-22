import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const DataContext = createContext();

const charactersPerPage = 10;

export const DataProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [searchCharacterName, setSearchCharacterName] = useState("");

    const { data: characters, loading } = useQuery({
        queryKey: ["characters", currentPage, searchCharacterName],
        queryFn: async () => {
            try {
                const { data } = await axios.get(
                    "https://swapi.dev/api/people",
                    {
                        params: {
                            search: searchCharacterName,
                            page: currentPage,
                            format: "json",
                        },
                    }
                );

                setTotalPages(Math.ceil(data.count / charactersPerPage));

                return data.results;
            } catch (err) {
                console.error(err);
                return [];
            }
        },
        initialData: [],
    });

    const { data: planets, loading: planetsLoading } = useQuery({
        queryKey: ["planets", currentPage],
        queryFn: async () => {
            try {
                const { data } = await axios.get(
                    "https://swapi.dev/api/planets",
                    {
                        params: {
                            page: 1,
                            // page: currentPage,
                            format: "json",
                        },
                    }
                );

                return data.results;
            } catch (err) {
                console.error(err);
                return [];
            }
        },
        initialData: [],
    });

    return (
        <DataContext.Provider
            value={{
                characters,
                planets,
                loading,
                currentPage,
                setCurrentPage,
                totalPages,
                searchCharacterName,
                setSearchCharacterName,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
