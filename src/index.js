/* Libs */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

/* Styles */
import 'normalize.css/normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

/* Components */
import LoadingPage from './components/LoadingPage';

const store = configureStore();

let hasRendered = false;

toast.configure();
const renderApp = () => {

    if (!hasRendered) {
        // setTimeout( function (){
        ReactDOM.render(<Provider store={store}>
                            <AppRouter />
                        </Provider>, document.getElementById('root'));

        hasRendered = true;
        // }, 3000);

    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

renderApp();
