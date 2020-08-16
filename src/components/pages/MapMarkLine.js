import React, { useState } from "react";
import { Marker, InfoWindow, Polyline } from "react-google-maps";
import { formatNumberPtBr } from '../../filters/formatNumberBr';

export const MapMarkWithLine = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggleOpen = () => {
        setIsOpen(true);
    }

    const handleToggleClose = () => {
        setIsOpen(false);
    }

    return (
        <Marker
            key={props.index}
            position={{ lat: props.country?.latitude, lng: props.country?.longitude}}
            label={(props.index +1).toString()}
            onClick={() => handleToggleOpen()}
        >
            {
                isOpen &&
                <>
                <Polyline
                    path={[
                        { lat: props.latitudeRef, lng: props.longitudeRef },
                        { lat: props.country?.latitude, lng: props.country?.longitude  }
                    ]}
                    geodesic={true}
                    options={{
                        strokeColor: "#ff2527",
                        strokeOpacity: 0.75,
                        strokeWeight: 2,
                        icons: [
                            {
                                offset: "0",
                                repeat: "20px"
                            }
                        ]
                    }}
                />
                <InfoWindow onCloseClick={handleToggleClose}>
                    <span>{props.country?.countryName}: {formatNumberPtBr(props.country?.distanceInKm)} (km)</span>
                </InfoWindow>
                </>
            }
        </Marker>
    );
};

export default (MapMarkWithLine);
