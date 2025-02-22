import PropTypes from "prop-types";
import "./search.css";
import { useContext, useCallback, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import debounce from "../utils/debounce";

const Search = () => {
    const { setSearchCharacterName } = useContext(DataContext);
    const [query, setQuery] = useState("");

    const handleSearch = useCallback((searchQuery) => {
        setSearchCharacterName(searchQuery);
    }, []);

    const debouncedSearch = useCallback(debounce(handleSearch, 300), [
        handleSearch,
    ]);

    useEffect(() => {
        debouncedSearch(query ?? "");
    }, [query, debouncedSearch, handleSearch]);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setQuery(value);
    };

    return (
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                onChange={handleInputChange}
                placeholder="Search..."
                value={query}
            />
        </div>
    );
};

Search.propTypes = {
    searchCharacterName: PropTypes.string,
    setSearchCharacterName: PropTypes.func.isRequired,
};

export default Search;
