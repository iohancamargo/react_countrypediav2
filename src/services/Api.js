/* Adrress for emulation :
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/

const { createApolloFetch } = require('apollo-fetch');

const Api = createApolloFetch({
    uri: 'https://countries-274616.ew.r.appspot.com/',
});

export default Api;