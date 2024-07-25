import { GOOGLE_MAP_KEY } from "./config/api";

export async function getCoordsFromAddress(address = null) {
    const urlAddress = encodeURI(address);
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_MAP_KEY}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch coordinates. Please try again!');
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }
    if (!data.results.length) {
        // return Promise()
        return data;
    }
    const coordinates = data.results[0].geometry.location;
    return {results:data.results[0],...coordinates};
}

export async function getAddressFromCoords(coords = null) {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_MAP_KEY}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch address. Please try again!');
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }
    let address = 'UNKNOWN';
    if (data.results.length > 0) {
        address = data.results[0].formatted_address;
    }
    return address;
}