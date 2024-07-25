import React, { useRef, useEffect } from "react";
import LoadMaps from "./LoadMaps";
import { GOOGLE_MAP_KEY } from "./config/api";

const containerStyle = {
    width: '400px',
    height: '400px',
    margin: '0 auto'
};

function SelectedPlace(props) {
    const { centerCoords, fallbackText } = props;
    const mapEl = useRef();

    useEffect(() => {

    }, [centerCoords]);

    return (
        <React.Fragment>
            <div ref={mapEl}>
                {!centerCoords ? <p>No data</p> :
                    <LoadMaps centerCoords={centerCoords}
                    fallbackText="Could not find a place!"
                />
                }
            </div>
        </React.Fragment>
    )
}

export default SelectedPlace;