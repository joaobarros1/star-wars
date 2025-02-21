import PropTypes from "prop-types";

const Filters = ({ planets, onFilterChange }) => {
    return (
        <div className="filters-container">
            <select onChange={(e) => onFilterChange(e.target.value)}>
                <option value="">All Planets</option>
                {planets.map((planet) => (
                    <option key={planet.name} value={planet.name}>
                        {planet.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

Filters.propTypes = {
    planets: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
