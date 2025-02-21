import { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import CharacterCard from "./CharacterCard";
import Loader from "./Loader";
import Modal from "./Modal";
import { DataContext } from "../context/DataContext";
import Search from "./Search";
import Pagination from "./Pagination";
import "./characterList.css";

const charactersPerPage = 10;

const CharacterList = () => {
    const { characters, setCharacters } = useContext(DataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {
        data: fetchData,
        loading,
        error,
    } = useFetch(`https://swapi.dev/api/people/?page=${currentPage}`);
    const [activeCharacter, setActiveCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (character) => {
        setActiveCharacter(character);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (fetchData) {
            setTotalPages(Math.ceil(fetchData.count / charactersPerPage));
            setCharacters(fetchData.results);
        }
    }, [fetchData, setCharacters]);

    const handleSearch = (query) => {
        const filteredData = fetchData.results.filter((character) =>
            character.name.toLowerCase().includes(query.toLowerCase())
        );
        setCharacters(filteredData);
    };

    return (
        <div className="character-list-container">
            <h1 className="list-title">Star Wars</h1>
            <Search onSearch={handleSearch} />
            <section className="character-list">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p>Error: Failed retrieving characters</p>
                ) : (
                    characters.map((character) => (
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
