import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";
import "./modal.css";
import PropTypes from "prop-types";
import starwarsLogo from "../assets/starwarsLogo.png";

const Modal = ({ onOpen, character, characterImageUrl }) => {
    const { data, loading, error } = useFetch(characterImageUrl);
    const [imageUrl, setImageUrl] = useState(null);
    const [showModal, setshowModal] = useState(false);

    console.log("character: ", character);

    useEffect(() => {
        if (onOpen) {
            setshowModal(true);
        }
    }, [onOpen]);

    useEffect(() => {
        if (data && !loading) {
            setImageUrl(data[0]?.image || starwarsLogo);
        } else if (!loading && error) {
            setImageUrl(starwarsLogo);
        }
    }, [data, loading, error]);

    const handleCloseModal = useCallback(() => {
        setshowModal(false);
    }, []);

    useEffect(() => {
        if (!showModal) return;
        const handleEscapeKeyPress = (event) => {
            if (event.key === "Escape") {
                setshowModal(false);
            }
        };

        document.addEventListener("keydown", handleEscapeKeyPress);

        return () => {
            document.removeEventListener("keydown", handleEscapeKeyPress);
        };
    }, [showModal]);

    const characterDetails = useMemo(() => {
        const numberOfFilms = character.films?.length || 0;
        const attributes = [
            "name",
            "height",
            "mass",
            "gender",
            "hair_color",
            "birth_year",
        ];
        return (
            <div className="character-details">
                {attributes.map((attr) => (
                    <div key={attr} className="character-details-item">
                        <span className="character-details-label">
                            {attr.charAt(0).toUpperCase() +
                                attr.slice(1).replace("_", " ")}
                            :{" "}
                        </span>
                        <span className="character-details-value">
                            {character[attr]}
                        </span>
                    </div>
                ))}
                <div className="character-details-item">
                    <span className="character-details-label">
                        Number of films:
                    </span>
                    <span className="character-details-value">
                        {numberOfFilms}
                    </span>
                </div>
            </div>
        );
    }, [character]);

    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-header">
                <button className="modal-close" onClick={handleCloseModal}>
                    &times;
                </button>
                <h1 className="modal-title">{character.name}</h1>
            </div>
            <div className="modal-body">
                <div className="character-details">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        imageUrl && (
                            <img
                                src={imageUrl}
                                alt={character.name}
                                className="character-image"
                            />
                        )
                    )}
                </div>
            </div>
            <div className="modal-footer">{characterDetails}</div>
        </div>
    );
};
Modal.propTypes = {
    onOpen: PropTypes.bool.isRequired,
    character: PropTypes.object,
    characterImageUrl: PropTypes.string,
};

export default memo(Modal);
