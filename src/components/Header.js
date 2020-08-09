/* Libs  */
import React from 'react';
import { withRouter } from "react-router";

export const Header = () => {
    return (
        <>
            <header className="header">
                <div className="content-header__content-container">
                    <div className="header__content header__image"></div>
                </div>
            </header>
        </>
    );
};

export default withRouter(Header);
