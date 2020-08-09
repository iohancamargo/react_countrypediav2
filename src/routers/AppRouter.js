/* Libs */
import React from "react";
import { Router } from "react-router";
import { Switch, Redirect } from "react-router-dom";
import { createBrowserHistory as createHistory } from 'history';

/* Components */
import PublicRoute from "./PublicRoute";

/* Pages */
import Detail from '../components/pages/DetailPage';
import HomePage from '../components/pages/HomePage';
import EditPage from '../components/pages/EditPage';
import PageNotFound from '../components/PageNotFound';

export const history = createHistory();

const AppRouter = () => {
    return (
        <Router history= {history}>
            <div>
                <Switch>
                    <PublicRoute exact path="/" component={ HomePage }  />
                    <PublicRoute exact path="/detail/:country" component={ Detail }  />
                    <PublicRoute exact path="/edit/:country" component={ EditPage }  />
                    <PublicRoute exact path='/404' component={ PageNotFound } />
                    <Redirect from='*' to='/404' />
                </Switch>     
            </div>
        </Router>
    );
};

export default AppRouter;
