import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import CharacterCard from "./CharacterCard";
import "./characterList.css";
import Loader from "./Loader";

const charactersPerPage = 10;

const CharacterList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { data, loading, error } = useFetch(
        `https://swapi.dev/api/people/?page=${currentPage}`
    );
    const [characters, setCharacters] = useState([]);
    const [activeCharacter, setActiveCharacter] = useState(null);

    const handleCardClick = (character) => {
        setActiveCharacter(character);
    };

    useEffect(() => {
        if (data) {
            setCharacters(data.results);
            setTotalPages(Math.ceil(data.count / charactersPerPage));
        }
    }, [data]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="character-list-container">
            <h1 className="list-title">Star Wars Characters</h1>
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
                            isActive={activeCharacter === character}
                            onCardClick={() => handleCardClick(character)}
                        />
                    ))
                )}
            </section>
            <section className="pagination">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </section>
        </div>
    );
};

export default CharacterList;
