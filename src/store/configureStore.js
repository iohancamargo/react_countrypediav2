/* Libs */
import { createStore, combineReducers } from 'redux';

/* Reducers */
import countriesReducer from '../reducers/countries';

export default () => {
    const store = createStore(
        combineReducers({
            countries: countriesReducer
        }),
    );

    return store;
};
