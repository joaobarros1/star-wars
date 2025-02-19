import useFetch from "../hooks/useFetch";
import CharacterCard from "./CharacterCard";

const CharacterList = () => {
    const { data, loading, error } = useFetch("https://swapi.dev/api/people/");

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!data) {
        return null;
    }

    const characters = data.results;

    return (
        <div>
            {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
            ))}
        </div>
    );
};

export default CharacterList;
