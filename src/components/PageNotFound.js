import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

const PageNotFound = () => {
    return (
        <div className="not-found parallax">
            <div className="sky-bg"></div>
            <div className="wave-7"></div>
            <div className="wave-6"></div>

            <Link to="/" className="wave-island">
                <img src="/images/island.svg" alt="Island" />
            </Link>
            <div className="wave-5"></div>
            <div className="wave-lost wrp">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>

            <div className="wave-4"></div>
            <div className="wave-boat">
                <img className="boat" src="/images/boat.svg" alt="Boat" />
            </div>
            <div className="wave-3"></div>
            <div className="wave-2"></div>
            <div className="wave-1"></div>
            <div className="wave-message">
                <p>Your're lost</p>
                <p>Click on the island to return</p>
            </div>
        </div>
    );
};

export default withRouter(PageNotFound);
