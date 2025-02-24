import { useState, useContext, useEffect, memo } from "react";
import CharacterCard from "./CharacterCard";
import Loader from "./Loader";
import Modal from "./Modal";
import { DataContext } from "../context/DataContext";
import Search from "./Search";
import Pagination from "./Pagination";
import Filters from "./Filters";
import "./characterList.css";

const CharacterList = () => {
    const { characters, planets, charactersLoading, error } =
        useContext(DataContext);
    const [activeCharacter, setActiveCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredCharacters, setFilteredCharacters] = useState(characters);

    useEffect(() => {
        setFilteredCharacters(characters);
    }, [characters]);

    const handleCardClick = (character) => {
        setActiveCharacter(character);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFilterChange = (planetUrl) => {
        if (planetUrl === "") {
            setFilteredCharacters(characters);
        } else {
            const filteredData = characters.filter(
                (character) => character.homeworld === planetUrl
            );
            setFilteredCharacters(filteredData);
        }
    };

    return (
        <div className="character-list-container">
            <h1 className="list-title">Star Wars</h1>
            <Search />
            <Filters planets={planets} onFilterChange={handleFilterChange} />
            <section className="character-list">
                {charactersLoading ? (
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
            <Pagination />
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

export default memo(CharacterList);
