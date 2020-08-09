const INITIAL_STATE = [];

const countriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'POPULATE_COUNTRIES':
            return action.countries;
        case 'ADD_COUNTRIES':
            return [
                ...state,
                action.country
            ];
        case 'EDIT_COUNTRIES':
            return state.map((country) => {
                if (country.alpha3Code === action.country.alpha3Code) {
                    return {
                        ...country,
                        ...action.country
                    };
                } else {
                    return country;
                };
            });
        case 'REMOVE_COUNTRIES':
            return state.filter((country) => country.alpha3Code !== action.country.alpha3Code);
        default:
            return state;
    }
}

export { countriesReducer as default }