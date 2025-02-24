import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [planetPage, setPlanetPage] = useState(1);
    const [totalCharactersPages, setTotalCharactersPages] = useState(1);
    const [totalPlanetsPages, setTotalPlanetsPages] = useState(1);
    const [searchCharacterName, setSearchCharacterName] = useState("");
    const [totalCharactersScores, setTotalCharactersScores] = useState(0);
    const [totalPlanetsScores, setTotalPlanetsScores] = useState(0);
    const [charactersPerPage, setCharactersPerPage] = useState(0);
    const [planetsPerPage, setPlanetsPerPage] = useState(0);

    const { data: characters, isFetching: charactersLoading } = useQuery({
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
                setTotalCharactersScores(data.count);
                setCharactersPerPage(data.results?.length);
                setTotalCharactersPages(
                    Math.ceil(data.count / data.results?.length)
                );

                return data.results;
            } catch (err) {
                console.error(err);
                return [];
            }
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const { data: planets, isFetching: planetsLoading } = useQuery({
        queryKey: ["planets", planetPage],
        queryFn: async () => {
            try {
                const { data } = await axios.get(
                    "https://swapi.dev/api/planets",
                    {
                        params: {
                            page: planetPage,
                            format: "json",
                        },
                    }
                );
                setTotalPlanetsScores(data.count);
                setPlanetsPerPage(data.results?.length);
                setTotalPlanetsPages(
                    Math.ceil(data.count / data.results?.length)
                );

                return data.results;
            } catch (err) {
                console.error(err);
                return [];
            }
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    return (
        <DataContext.Provider
            value={{
                characters,
                planets,
                charactersLoading,
                currentPage,
                setCurrentPage,
                planetPage,
                setPlanetPage,
                totalCharactersPages,
                searchCharacterName,
                setSearchCharacterName,
                totalCharactersScores,
                charactersPerPage,
                totalPlanetsScores,
                planetsPerPage,
                totalPlanetsPages,
                planetsLoading,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
