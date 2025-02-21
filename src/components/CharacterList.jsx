import { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import CharacterCard from "./CharacterCard";
import Loader from "./Loader";
import Modal from "./Modal";
import { DataContext } from "../context/DataContext";
import Search from "./Search";
import Pagination from "./Pagination";
import Filters from "./Filters";
import "./characterList.css";

const charactersPerPage = 10;

const CharacterList = () => {
    const { characters, setCharacters } = useContext(DataContext);
    const { planets, setPlanets } = useContext(DataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {
        data: charactersData,
        loading,
        error,
    } = useFetch(`https://swapi.dev/api/people/?page=${currentPage}`);
    const { data: planetsData } = useFetch(`https://swapi.dev/api/planets/`);
    const [activeCharacter, setActiveCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredCharacters, setFilteredCharacters] = useState([]);

    useEffect(() => {
        if (charactersData) {
            setTotalPages(Math.ceil(charactersData.count / charactersPerPage));
            setCharacters(charactersData.results);
        }
    }, [charactersData, setCharacters]);

    useEffect(() => {
        if (planetsData) {
            setPlanets(planetsData.results);
        }
        // console.log("Planets data:", planetsData);
    }, [planetsData, setPlanets]);

    const handleCardClick = (character) => {
        setActiveCharacter(character);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSearch = (query) => {
        const filteredData = charactersData.results.filter((character) =>
            character.name.toLowerCase().includes(query.toLowerCase())
        );
        setCharacters(filteredData);
    };

    const handleFilterChange = (planetName) => {
        if (planetName === "") {
            setFilteredCharacters(characters);
        } else {
            const filteredData = characters.filter(
                (character) => character.homeworld === planetName
            );
            setFilteredCharacters(filteredData);
        }
    };

    return (
        <div className="character-list-container">
            <h1 className="list-title">Star Wars</h1>
            <Search onSearch={handleSearch} />
            <Filters planets={planets} onFilterChange={handleFilterChange} />
            <section className="character-list">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p>Error: Failed retrieving characters</p>
                ) : (
                    filteredCharacters.map((character) => (
                        <CharacterCard
                            key={character.name}
                            character={character}
                            onCardClick={handleCardClick}
                        />
                    ))
                )}
            </section>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            {isModalOpen && activeCharacter && (
                <Modal
                    onOpen={isModalOpen}
                    character={activeCharacter}
                    characterImageUrl={`https://starwars-databank-server.vercel.app/api/v1/characters/name/${encodeURIComponent(
                        activeCharacter.name
                    )}`}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default CharacterList;
