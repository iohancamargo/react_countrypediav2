/* Libs Class */
import React from "react";
import { Route } from "react-router-dom";
import { Header } from "../components/Header";

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
    return (
        <Route
            {...rest}
            render={routeProps => (
                    <>
                        <Header />
                        <RouteComponent {...routeProps} />
                    </>
                )
            }
        />
    );
};

export default PublicRoute;