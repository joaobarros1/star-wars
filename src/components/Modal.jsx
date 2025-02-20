import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";
import "./modal.css";
import PropTypes from "prop-types";
import starwarsLogo from "../assets/logo-placeholder.jpeg";

const Modal = ({ onOpen, character, characterImageUrl }) => {
    const { data, loading, error } = useFetch(characterImageUrl);
    const [imageUrl, setImageUrl] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [planet, setPlanet] = useState(null);

    console.log("character: ", character);

    useEffect(() => {
        if (onOpen) {
            setshowModal(true);
        }
    }, [onOpen]);

    const fetchPlanetInfo = useCallback(async () => {
        const planetUrl = character.homeworld;
        const response = await fetch(planetUrl);
        const planet = await response.json();
        setPlanet(planet);
        console.log("planet: ", planet);
    }, [character.homeworld]);

    useEffect(() => {
        if (data && !loading) {
            setImageUrl(data[0]?.image || starwarsLogo);
            fetchPlanetInfo();
        } else if (!loading && error) {
            setImageUrl(starwarsLogo);
        }
    }, [data, loading, error, fetchPlanetInfo]);

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
            <section>
                {attributes.map((attr) => (
                    <div key={attr}>
                        <span>
                            {attr.charAt(0).toUpperCase() +
                                attr.slice(1).replace("_", " ")}
                            :{" "}
                        </span>
                        <span>{character[attr]}</span>
                    </div>
                ))}
                <div>
                    <span>Number of films:</span>
                    <span>{numberOfFilms}</span>
                </div>
            </section>
        );
    }, [character]);

    const planetDetails = useMemo(() => {
        const planetName = planet?.name;
        const attributes = ["terrain", "climate", "population"];
        return (
            <section>
                <span>Homeworld: {planetName}</span>
                {attributes.map((attr) => (
                    <div key={attr}>
                        <span>
                            {attr.charAt(0).toUpperCase() + attr.slice(1)}:{" "}
                        </span>
                        <span>{planet && planet[attr]}</span>
                    </div>
                ))}
            </section>
        );
    }, [planet]);

    if (!showModal) return null;

    return (
        <div className="modal">
            <section className="modal-header">
                <button className="modal-close" onClick={handleCloseModal}>
                    &times;
                </button>
                <h1 className="modal-title">{character.name}</h1>
            </section>
            <section className="modal-body">
                <div>
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
            </section>
            <section className="modal-footer">
                <div className="character-details">{characterDetails}</div>
                <div className="planet-details">{planetDetails}</div>
            </section>
        </div>
    );
};
Modal.propTypes = {
    onOpen: PropTypes.bool.isRequired,
    character: PropTypes.object,
    characterImageUrl: PropTypes.string,
};

export default memo(Modal);
