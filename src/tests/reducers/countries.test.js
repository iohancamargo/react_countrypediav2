import countriesReducer from '../../reducers/countries';

const countries = [];
for (let index = 0; index < 10; index++) {
    let country = {
        nativeName: `country_native_${index}` ,
        alpha3Code: `AB${index}`,
        name: `country_native_${index}`,
        capital: `capital_${index}`,
        area: 652230 * index,
        population: 27657145 * index,
        topLevelDomains: {
            name: `.a${index}`
        },
        flag: {
            emoji: "=O",
            emojiUnicode: "U+1F1E6 U+1F1EB",
            svgFile: "https://restcountries.eu/data/bra.svg"
        }
    };
    countries.push(country);
}

/* Testa a insercao de array de dados de paises */
test('should populate countries with redux', () => {
    const action = { type: 'POPULATE_COUNTRIES', countries };
    const state = countriesReducer([], action);
    expect(state.length).toBe(action.countries.length);    
});


/* Testa a adicao de array de dados de paises */
test('should add countries with redux', () => {
    const action = { type: 'POPULATE_COUNTRIES', countries };
    const state = countriesReducer([], action);

    let country = {
        nativeName: `Brasil` ,
        alpha3Code: `BRA`,
        name: `Brazil`,
        capital: `Brasilia`,
        area: 8515767,
        population: 206135893,
        topLevelDomains: {
            name: `.br`
        },
        flag: {
            emoji: "=O",
            emojiUnicode: "U+1F1E6 U+1F1EB",
            svgFile: "https://restcountries.eu/data/bra.svg"
        }
    };

    const addAction = { type: 'ADD_COUNTRIES', country };
    const addState = countriesReducer(state, addAction);

    expect(addState).toEqual([...countries, country]);
});

/* Testa a edicao de um pais no redux component */
test('should edit country with redux', () => {
    // Primeiro eh populado o arr
    const action = { type: 'POPULATE_COUNTRIES', countries };
    const state = countriesReducer([], action);
    
    // Depois filtra uma post aleatoria para edicao.
    let index = Math.floor(Math.random() * 10);
    let country = countries[index];

    country.alpha3Code = "BRA";
    country.name = "Brazil";
    country.nativeName = "Brasil";
    country.capital = "Brasilia";
    country.area = 8515767;
    country.population = 206135893;

    const editAction = { type: 'EDIT_COUNTRIES', country };
    const editState = countriesReducer(state, editAction);

    expect(editState[index].alpha3Code).toBe(editAction.country.alpha3Code);    
    expect(editState[index].name).toBe(editAction.country.name);    
    expect(editState[index].nativeName).toBe(editAction.country.nativeName);    
    expect(editState[index].capital).toBe(editAction.country.capital);    
    expect(editState[index].area).toBe(editAction.country.area);    
    expect(editState[index].population).toBe(editAction.country.population);    
});

test('should remove one country with redux', () => {
    const action = { type: 'POPULATE_COUNTRIES', countries };
    const state = countriesReducer([], action);
    let country = countries[0] ;

    const removeAction = { type: 'REMOVE_COUNTRIES', country };
    const removedState = countriesReducer(state, removeAction);

    expect(removedState).toEqual([
        countries[1],
        countries[2],
        countries[3],
        countries[4],
        countries[5],
        countries[6],
        countries[7],
        countries[8],
        countries[9],
    ]);
});

test('should not remove one country with redux', () => {
    const action = { type: 'POPULATE_COUNTRIES', countries };
    const state = countriesReducer([], action);
    let country = {
        alpha3Code: `ABC`,
    }

    const removeAction = { type: 'REMOVE_COUNTRIES', country };
    const removedState = countriesReducer(state, removeAction);
    
    expect(state).toEqual(removedState);
});