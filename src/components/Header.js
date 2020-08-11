/* Libs  */
import React from 'react';
import { withRouter } from "react-router";
import { Navbar } from 'react-bootstrap';

export const Header = () => {
    return (
        <>
        <header>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                Countrypedia
                </Navbar.Brand>
            </Navbar>
        </header>
        </>
    );
};

export default withRouter(Header);
