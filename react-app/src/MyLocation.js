import React, { useEffect, useState } from "react";
import { GET_LOCATION_API_URL } from "./config/api";
import { Link, useLocation } from "react-router-dom";
import SelectedPlace from "./SelectedPlace";
import apiService from "./services/apiService";

function MyLocation(props) {
    const address = null;
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [loading, setLoading] = useState(true);

    // Use the useLocation hook to get the current URL
    const location = useLocation();
    // const urlparams = new URL(window.location.href);
    // queryParams = urlparams.queryParams || "";

    useEffect(() => {
        const getLocationFromId = async () => {
            setLoading(true);
            // Parse query parameters
            const queryParams = new URLSearchParams(location.search);
            const lid = queryParams.get('id');

            if (!lid) {
                alert('No ID provided in query parameters');
                setLoading(false);
                return;
            }

            console.log("getLocationFromId", GET_LOCATION_API_URL);
            if (!GET_LOCATION_API_URL) return;

            try {
                const result = await apiService.get(GET_LOCATION_API_URL, { id: lid });
                console.log("result", result);
                if(result.status == 400) {
                    alert(result.message);
                }else {
                    setCenter(result.coords);
                }
            } catch (error) {
                console.log(error);
                if(error.status == 400) {
                    alert(error.message);
                }
            }
        };
        getLocationFromId();
    }, []);


    return (
        <React.Fragment>
            <p>my-place:</p>
            {/* <div>{address}</div> */}
            <SelectedPlace
                fallbackText="Could not find a place!"
                centerCoords={center} />
            <br />
            <br />
            <section id="share-controls">
                <Link to="/">Share a New Place!</Link>
            </section>
        </React.Fragment>
    )
}

export default MyLocation;