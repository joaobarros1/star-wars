import { memo } from "react";
import "./characterCard.css";
import PropTypes from "prop-types";

const CharacterCard = ({ character, onCardClick }) => {
    const handleCardClick = () => {
        onCardClick(character);
    };

    if (!character) return null;

    return (
        <div className="character-card" onClick={handleCardClick}>
            <h2 className="character-card-title">{character.name}</h2>
        </div>
    );
};

CharacterCard.propTypes = {
    character: PropTypes.shape({
        name: PropTypes.string,
    }),
    onCardClick: PropTypes.func.isRequired,
};

export default memo(CharacterCard);
