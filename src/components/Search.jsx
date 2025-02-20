import PropTypes from "prop-types";
import "./search.css";

const Search = ({ onSearch }) => {
    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        onSearch(newQuery);
    };

    return (
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                onChange={handleInputChange}
                placeholder="Search..."
            />
        </div>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Search;
