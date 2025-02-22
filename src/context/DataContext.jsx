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
    const [totalScores, setTotalScores] = useState(0);

    const { data: characters, loading: charactersLoading } = useQuery({
        queryKey: ["characters", currentPage, searchCharacterName],
        queryFn: async () => {
            try {
                const { data } = await axios.get(
                    "https://swapi.dev/api/people",
                    {
                        params: {
                            search: searchCharacterName || undefined,
                            page: searchCharacterName ? undefined : currentPage,
                            format: "json",
                        },
                    }
                );
                setTotalScores(data.count);
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
                charactersLoading,
                currentPage,
                setCurrentPage,
                totalPages,
                searchCharacterName,
                setSearchCharacterName,
                totalScores,
                charactersPerPage,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
