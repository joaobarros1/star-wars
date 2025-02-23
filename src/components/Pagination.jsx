import { PropTypes } from "prop-types";
import "./pagination.css";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Pagination = () => {
    const {
        currentPage,
        setCurrentPage,
        totalCharactersPages,
        totalCharactersScores,
        charactersPerPage,
    } = useContext(DataContext);

    return (
        <div className="pagination">
            {totalCharactersPages > 1 && (
                <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
            )}
            <span>
                Page{" "}
                {totalCharactersScores < charactersPerPage ? 1 : currentPage} of{" "}
                {totalCharactersPages}
            </span>
            {totalCharactersPages > 1 && (
                <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={currentPage === totalCharactersPages}
                >
                    Next
                </button>
            )}
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalCharactersPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
