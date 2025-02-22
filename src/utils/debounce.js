import { PropTypes } from "prop-types";

const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

debounce.propTypes = {
    func: PropTypes.func.isRequired,
    wait: PropTypes.number.isRequired,
};

export default debounce;
