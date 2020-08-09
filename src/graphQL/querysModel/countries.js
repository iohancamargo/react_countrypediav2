export const searchAllCountries = `
    {
        Country { 
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
    }
`;