export const searchAllCountries = (queryText, offSetNumber) => {
    queryText = queryText.replace(/(^|,\s*)"+/g,'$1');    
    // if(queryText !== ''){
        // queryText = queryText.charAt(0).toUpperCase()+ queryText.slice(1);
    // }

    // Country ${queryText === '' ? `(first:6 offset: ${offSetNumber})` : '(filter: { name_starts_with: "' + queryText + '" OR:[ {name_contains: "'+ queryText + '"} ] })'}  { 
    let queryCountry = `
    {
        Country ${queryText === '' ? `(first:6 offset: ${offSetNumber})` : '(filter: { name_contains: "' + queryText + '"})'}  { 
            _id
            name 
            nativeName 
            alpha3Code 
            area 
            population 
            capital 
            flag { 
                emoji 
                emojiUnicode 
                svgFile 
            } 
            topLevelDomains { 
                name 
            }
            location {
                latitude
                longitude
            }
        } 
    }`;
    return queryCountry;
};

export const searchDetailCountry = (idCountry) => {
    
    let queryDetail = `{
        Country(_id: "${idCountry}") {
            distanceToOtherCountries(first: 5) {
              distanceInKm
              countryName
            }
          }
    }`;
    return queryDetail;
};

export const searchCountryByName = (nameCountry) => {
    
    let queryCountryByName = `{
        Country(name: "${nameCountry}") {
            _id
            name 
            nativeName 
            alpha3Code 
            area 
            population 
            capital 
            flag { 
                emoji 
                emojiUnicode 
                svgFile 
            } 
            topLevelDomains { 
                name 
            }
            location {
                latitude
                longitude
            }
          }
    }`;
    return queryCountryByName;
};