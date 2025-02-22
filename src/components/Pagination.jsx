import { PropTypes } from "prop-types";
import "./pagination.css";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Pagination = () => {
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        totalScores,
        charactersPerPage,
    } = useContext(DataContext);

    return (
        <div className="pagination">
            {totalPages > 1 && (
                <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
            )}
            <span>
                Page {totalScores < charactersPerPage ? 1 : currentPage} of{" "}
                {totalPages}
            </span>
            {totalPages > 1 && (
                <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            )}
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
