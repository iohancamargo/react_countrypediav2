/* Libs  */
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { withRouter } from "react-router";

export const Header = () => {
    return (
        <>
        <header>
            <Navbar bg="dark" variant="dark">
                <Link to={`/`}>
                    <Navbar.Brand>
                        Countrypedia
                    </Navbar.Brand>
                </Link>
            </Navbar>
        </header>
        </>
    );
};

export default withRouter(Header);
