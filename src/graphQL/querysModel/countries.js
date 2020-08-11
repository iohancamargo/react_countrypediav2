export const searchAllCountries = (queryText, offSetNumber) => {
    queryText = queryText.replace(/(^|,\s*)"+/g,'$1');    
    // if(queryText !== ''){
        // queryText = queryText.charAt(0).toUpperCase()+ queryText.slice(1);
    // }

    // Country ${queryText === '' ? `(first:6 offset: ${offSetNumber})` : '(filter: { name_starts_with: "' + queryText + '" OR:[ {name_contains: "'+ queryText + '"} ] })'}  { 
    let queryCountry = `
    {
        Country ${queryText === '' ? `(first:6 offset: ${offSetNumber})` : '(filter: { name_contains: "' + queryText + '"})'}  { 
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
        } 
    }`;
    return queryCountry;
};