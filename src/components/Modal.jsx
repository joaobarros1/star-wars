import {
    memo,
    useCallback,
    // useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";
import useFetch from "../hooks/useFetch";
// import { DataContext } from "../context/DataContext";
import starwarsLogo from "../assets/logo-placeholder.jpeg";
import "./modal.css";

const Modal = ({ onOpen, character, characterImageUrl, onClose }) => {
    const { data, loading, error } = useFetch(characterImageUrl);
    const [imageUrl, setImageUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const { planets } = useContext(DataContext);
    const [planet, setPlanet] = useState(null);

    console.log("modal", planet);

    // useEffect(() => {
    //     console.log("Modal component mounted");
    //     return () => {
    //         console.log("Modal component unmounted");
    //     };
    // }, []);

    useEffect(() => {
        if (onOpen && character) {
            setShowModal(true);
        }
    }, [onOpen, character]);

    const fetchPlanetInfo = useCallback(async () => {
        const planetUrl = character.homeworld;
        const response = await fetch(planetUrl);
        const planet = await response.json();
        setPlanet(planet);
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
        setShowModal(false);
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (!showModal) return;
        const handleEscapeKeyPress = (event) => {
            if (event.key === "Escape") {
                handleCloseModal();
            }
        };

        document.addEventListener("keydown", handleEscapeKeyPress);

        return () => {
            document.removeEventListener("keydown", handleEscapeKeyPress);
        };
    }, [showModal, handleCloseModal]);

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
            <section className="character-details">
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
            <section className="planet-details">
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

    const handleBackdropClick = (e) => {
        if (e.target.className === "modal-backdrop") {
            handleCloseModal();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal">
                <div className="modal-header">
                    <button className="modal-close" onClick={handleCloseModal}>
                        &times;
                    </button>
                    <h1 className="modal-title">{character.name}</h1>
                </div>
                <div className="modal-body">
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
                </div>
                <div className="modal-footer">
                    {characterDetails}
                    {planetDetails}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    onOpen: PropTypes.bool.isRequired,
    character: PropTypes.object,
    characterImageUrl: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default memo(Modal);
