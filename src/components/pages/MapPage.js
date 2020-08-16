import React from "react";
import MapMarkLine from './MapMarkLine';
import { withGoogleMap, GoogleMap} from "react-google-maps";

const MapWithAMarker = withGoogleMap((props) =>

    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={4.5}
        defaultCenter={{ lat: props.countrySelected.location.latitude, lng: props.countrySelected.location.longitude }}
    >

        <MapMarkLine 
            mainCountry={true}
            country={props.countrySelected}
            latitudeRef={props.countrySelected.location.latitude}
            longitudeRef={props.countrySelected.location.longitude}
            index={props.countrySelected.distanceToOtherCountries.length +1}
        />

    {
        props.countrySelected.distanceToOtherCountries.length === 5 && 
        props.countrySelected.distanceToOtherCountries.map((country, keyCountry) => {
        if(country.latitude > 0 && country.longitude > 0){
            return (
                <div key={country.countryName} >
                    <MapMarkLine 
                        country={country}
                        index={keyCountry}
                        mainCountry={false}
                        latitudeRef={props.countrySelected.location.latitude}
                        longitudeRef={props.countrySelected.location.longitude}
                    />                        
                </div>
            )
        }
        })
    }

    </GoogleMap>
    
);

export default MapWithAMarker;