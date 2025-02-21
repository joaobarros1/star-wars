import PropTypes from "prop-types";
import "./search.css";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Search = () => {
    const { searchCharacterName, setSearchCharacterName } =
        useContext(DataContext);

    const handleInputChange = (e) => {
        const newQuery = e.target.value;

        setSearchCharacterName(newQuery);
    };

    return (
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                onChange={handleInputChange}
                placeholder="Search..."
                value={searchCharacterName}
            />
        </div>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Search;
