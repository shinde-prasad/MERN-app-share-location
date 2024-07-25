import React from "react";
import { GoogleMap, MarkerF, LoadScript } from '@react-google-maps/api';
import { GOOGLE_MAP_KEY } from "./config/api";

const containerStyle = {
    width: '400px',
    height: '400px',
    margin: '0 auto'
};

function LoadMaps(props) {
    const { centerCoords, fallbackText } = props;

    return (
        <>{centerCoords &&
            <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={centerCoords}
                    zoom={13}
                >
                    {centerCoords && <MarkerF position={centerCoords} />}
                    {!centerCoords && <p>{fallbackText}</p>}
                </GoogleMap>
            </LoadScript>
        }
        </>
    )
}

export default LoadMaps;