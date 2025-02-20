import { memo } from "react";
import loaderIconUrl from "../assets/lightsaber.svg";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader">
            <img src={loaderIconUrl} alt="Loading..." />
        </div>
    );
};

export default memo(Loader);
