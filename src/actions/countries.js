import Api from '../services/Api';
import { searchAllCountries } from '../graphQL/querysModel/countries';
  
// export const startGetCountries = () => {
//     return new Promise((resolve) => {
//         Api({
//             query: `${searchAllCountries}`,
//         }).then(res => {

//             let returnObj = {
//                 data: [],
//                 success: true,
//                 message: "Países listados com sucesso",
//             };

//             if(res.data.hasOwnProperty('Country')){
//                 returnObj.data = res.data.Country;
//             }

//             resolve(returnObj);

//         }).catch((error) => {
//             resolve({
//                 data: null,
//                 success: false,
//                 message: error,
//             });
//         });
//     });
// };

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
