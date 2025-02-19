import "./Loader.css";
import loaderIconUrl from "../assets/loader.svg";

const Loader = () => {
    return (
        <div className="loader">
            <img src={loaderIconUrl} alt="Loading..." />
        </div>
    );
};

export default Loader;
