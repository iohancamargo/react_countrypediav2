/* Libs  */
import React from 'react';
import { withRouter } from "react-router";
import { Navbar } from 'react-bootstrap';

export const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                
                Countrypedia
                </Navbar.Brand>
            </Navbar>
        </>
    );
};

export default withRouter(Header);
