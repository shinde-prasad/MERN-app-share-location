import React, { useEffect, useRef, useState } from "react";
import { getCoordsFromAddress } from './utility';
import { API_URL } from "./config/api";
import LoadMaps from "./LoadMaps";

const Location = () => {
    const [myLocation, setMyLocation] = useState(null);
    const [coords, setCoords] = useState(null);
    const [sharableLink, setSharableLink] = useState('');
    const myAddress = useRef();
    const shareLinkRef = useRef();
    let center = myLocation || { lat: 0, lng: 0 };
    let locationId = null;

    useEffect(() => {
        setMyLocation({ lat: 0, lng: 0 });
        try {
            if (!navigator.geolocation) {
                alert(`geolocation is not supported by this browser`);

                // navigator.geolocation.getCurrentPosition((position) => {
                //     setCoords({
                //         lat: position.coords.latitude,
                //         lng: position.coords.longitude
                //     });
                // },
                //     (error) => {
                //         console.log(`There is some error with getCurrentPosition ${JSON.stringify(error)}`);
                //     });
            }
        } catch (err) {
            console.log(`There is some error with fetching user location ${JSON.stringify(err)}`);
        }
    }, []);


    // add location into db
    const submitLocation = async function (e) {
        e.preventDefault();
        const getCoords = await getCoordsFromAddress(myAddress.current.value);

        console.log(getCoords, myAddress.current.value);

        if (myAddress.current.value == null || getCoords?.results.length === 0) {
            alert("Either location not found or enter correct location.");
            return;
        }
        fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: getCoords.lat || 0,
                lng: getCoords.lng || 0,
                address: myAddress.current.value
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("data", data);
                locationId = data.locId;

                setMyLocation({
                    lat: getCoords.lat,
                    lng: getCoords.lng
                });

                center = {
                    lat: getCoords.lat,
                    lng: getCoords.lng
                };

                locationId = `${window.location.origin}/my-place?id=${locationId}`;
                setSharableLink(locationId);
            })
            .catch(error => console.error(error));
    }

    function getCurrentLocation() {
        try {
            if (navigator.geolocation) {
                center = { lat: 0, lng: 0 };
                navigator.geolocation.getCurrentPosition(async position => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setMyLocation(coords);
                    center = coords;

                    console.log(myLocation);
                },
                    (error) => {
                        console.log(`There is some error with getCurrentPosition ${JSON.stringify(error)}`);
                    });
            } else {
                console.log(`geolocation is not supported by this browser`);
            }
        } catch (err) {
            console.log(`There is some error with fetching user location ${JSON.stringify(err)}`);
        }
    }
    const sharePlaceHandler = function () {
        if (!navigator.clipboard) {
            shareLinkRef.current.select()
            return;
        }
        navigator.clipboard
            .writeText(sharableLink)
            .then(() => alert('Copied into clipboard!'))
            .catch(err => {
                console.log(err);
                shareLinkRef.current.select();
            });
    }

    return (
        <React.Fragment>
            <h2>Share my location app</h2>
            <form name="mapmylocation" onSubmit={submitLocation}>
                <input type="text" width="100%" placeholder="Type address to find location and shareble link" ref={myAddress} name="address" />
                <input type="submit" name="submit" value="submit" />
            </form>
            <div>
                <br />
                <button onClick={getCurrentLocation}>Get Current Location</button>
            </div>

            <br />
            <br />
            <section id="share-controls">
                <input
                    ref={shareLinkRef}
                    value={sharableLink}
                    type="text"
                    readOnly
                    placeholder="Select a place to get a sharable link."
                />
                <button disabled={!sharableLink} onClick={sharePlaceHandler}>
                    Share Place
                </button>
            </section>
            <br />
            <br />

            {myLocation &&
                <div>
                    Latitude: {myLocation.lat},
                    Longitude: {myLocation.lng}
                    <LoadMaps centerCoords={myLocation}
                        fallbackText="Could not find a place!"
                    />
                </div>
            }
        </React.Fragment>
    )
}

// export default React.memo(Location);
export default Location;