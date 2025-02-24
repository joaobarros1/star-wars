import PropTypes from "prop-types";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Loader from "./Loader";
import "./filters.css";

const Filters = ({ onFilterChange }) => {
    const {
        planets,
        planetsLoading,
        totalPlanetsPages,
        planetPage,
        setPlanetPage,
    } = useContext(DataContext);

    const onPageChange = (page) => {
        setPlanetPage(page);
    };

    return (
        <div className="filter-container">
            {planetsLoading ? (
                <Loader />
            ) : (
                <section className="filter-section">
                    <div className="filter-btn-container">
                        {planets.map((planet) => (
                            <button
                                onClick={(e) => onFilterChange(e.target.value)}
                                key={planet.name}
                                value={planet.url}
                            >
                                {planet.name}
                            </button>
                        ))}
                    </div>
                    <div className="filter-pages-container">
                        <label htmlFor="planetsPages">Planets page:</label>
                        <input
                            id="planetsPages"
                            type="number"
                            min="1"
                            max={totalPlanetsPages.toString()}
                            onChange={(e) => onPageChange(e.target.value)}
                            value={planetPage}
                        />
                    </div>
                    <div className="filter-btn-container">
                        <button onClick={() => onFilterChange("")}>
                            All planets
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

Filters.propTypes = {
    planets: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
