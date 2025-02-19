import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import CharacterCard from "./CharacterCard";
import "./characterList.css";
import Loader from "./Loader";

const CharacterList = () => {
    const { data, loading, error } = useFetch("https://swapi.dev/api/people/");
    const [characters, setCharacters] = useState([]);
    const [activeCharacter, setActiveCharacter] = useState(null);

    const handleCardClick = (character) => {
        setActiveCharacter(character);
    };

    useEffect(() => {
        if (data) {
            setCharacters(data.results);
        }
    }, [data]);

    return (
        <div className="character-list-container">
            <h1>Star Wars Characters</h1>
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
        </div>
    );
};

export default CharacterList;
