export const searchAllCountries = (queryText, offSetNumber) => {
    
    if(queryText !== ''){
        queryText = queryText.charAt(0).toUpperCase()+ queryText.slice(1);
    }

    let queryCountry = `
    {
        Country ${queryText === '' ? `(first:6 offset: ${offSetNumber})` : '(filter: { name_starts_with: "' + queryText + '" OR:[ {name_contains: "'+ queryText + '"} ] })'}  { 
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



// query {
  
// 	Country(
    
//     filter: {
//       	name_starts_with: "Bra" OR:[
//         {name_contains: "Bra"}
//       ]
//     }
//   ) 
  
//   { 	
//       name
//       nativeName 
//       alpha3Code 
//       area 
//       population 
//       capital 
//       flag { 
//           emoji 
//           emojiUnicode 
//           svgFile 
//       } 
//       topLevelDomains { 
//           name 
//       }
      
//   } 
// }
