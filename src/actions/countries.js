import Api from '../services/Api';
import { searchAllCountries, searchDetailCountry, searchCountryByName } from '../graphQL/querysModel/countries';

export const startGetCountries = (queryText, offSetNumber) => {
    return new Promise((resolve) => {

        let searchCountryQuery = searchAllCountries(queryText, offSetNumber);

        Api({
            query: `${searchCountryQuery}`,
        }).then(res => {

            let returnObj = {
                data: [],
                success: true,
                message: "Países listados com sucesso",
            };

            if(res.data.hasOwnProperty('Country')){
                returnObj.data = res.data.Country;
            }

            resolve(returnObj);

        }).catch((error) => {
            resolve({
                data: null,
                success: false,
                message: error,
            });
        });
    });
};

export const startGetDetailCountries = (idCountry) => {
    return new Promise((resolve) => {

        let searchDetailCountryQuery = searchDetailCountry(idCountry);

        Api({
            query: `${searchDetailCountryQuery}`,
        }).then(res => {

            let returnObj = {
                data: [],
                success: true,
                message: "Países listados com sucesso",
            };

            if(res.data.hasOwnProperty('Country')){
                returnObj.data = res.data.Country[0].distanceToOtherCountries;
            }

            resolve(returnObj);

        }).catch((error) => {
            resolve({
                data: null,
                success: false,
                message: error,
            });
        });
    });
};

export const startGetCountryByName = (nameCountry) => {
    return new Promise((resolve) => {

        let searchCountryByNameQuery = searchCountryByName(nameCountry);

        Api({
            query: `${searchCountryByNameQuery}`,
        }).then(res => {

            let returnObj = {
                data: [],
                success: true,
                message: "Países listados com sucesso",
            };
            
            if(res.data.hasOwnProperty('Country')){
                returnObj.data = res.data.Country[0];
            }

            resolve(returnObj);

        }).catch((error) => {
            resolve({
                data: null,
                success: false,
                message: error,
            });
        });
    });
};
