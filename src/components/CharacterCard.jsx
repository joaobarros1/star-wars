import { useEffect, useState } from "react";
import "./characterCard.css";
import PropTypes from "prop-types";
import Modal from "./Modal";

const characterImageApiBaseUrl =
    "https://starwars-databank-server.vercel.app/api/v1/characters/name/";

const CharacterCard = ({ character, isActive, onCardClick }) => {
    const [showModal, setShowModal] = useState(false);

    const encodedName = encodeURIComponent(character.name);
    const imageApiUrl = `${characterImageApiBaseUrl}${encodedName}`;

    useEffect(() => {
        setShowModal(isActive);
    }, [isActive]);

    const handleCardClick = () => {
        onCardClick();
    };

    if (!character) return null;

    return (
        <div className="character-card" onClick={handleCardClick}>
            {showModal && (
                <Modal
                    character={character}
                    onOpen={showModal}
                    characterImageUrl={imageApiUrl}
                />
            )}
            <h2 className="character-card-title">{character.name}</h2>
        </div>
    );
};

CharacterCard.propTypes = {
    character: PropTypes.shape({
        name: PropTypes.string,
    }),
    isActive: PropTypes.bool.isRequired,
    onCardClick: PropTypes.func.isRequired,
};

export default CharacterCard;
