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
        <div className="filters-container">
            {planetsLoading ? (
                <Loader />
            ) : (
                <section>
                    <div>
                        <label htmlFor="planets">Planets:</label>
                        <select
                            onChange={(e) => onFilterChange(e.target.value)}
                            id="planets"
                        >
                            <option value="">All Planets</option>
                            {planets.map((planet) => (
                                <option key={planet.name} value={planet.url}>
                                    {planet.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="planetsPages" className="filters-label">
                            Page:
                        </label>
                        <input
                            id="planetsPages"
                            type="number"
                            min="1"
                            max={totalPlanetsPages.toString()}
                            onChange={(e) => onPageChange(e.target.value)}
                            value={planetPage}
                        />
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
