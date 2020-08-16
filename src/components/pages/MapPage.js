import React, { useState } from "react";
import MapMarkLine from './MapMarkLine';
import { withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow} from "react-google-maps";

const MapWithAMarker = withGoogleMap((props) =>

    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={4.5}
        defaultCenter={{ lat: props.countrySelected.location.latitude, lng: props.countrySelected.location.longitude }}
    >

        <Marker
            key={props.countrySelected._id}
            position={{ lat: props.countrySelected.location.latitude, lng: props.countrySelected.location.longitude }}
            
            labelAnchor={new window.google.maps.Point(0, 0)}
        >
            <InfoWindow >
                <span>País selecionado: {props.countrySelected.name}</span>
            </InfoWindow>
        </Marker>


    {
        props.countrySelected.distanceToOtherCountries.length === 5 && 
        props.countrySelected.distanceToOtherCountries.map((country, keyCountry) => {
        if(country.latitude > 0 && country.longitude > 0){
            return (
                <div key={country.countryName} >
                    <MapMarkLine 
                        country={country}
                        index={keyCountry}
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