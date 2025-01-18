const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    try {
        const response = await axios.get('https://maps.gomaps.pro/maps/api/geocode/json', {
            params: {
              address: address,
              key: process.env.GO_MAPS_MAPS_API
            }
          });
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GO_MAPS_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        
        console.log("Response status:", response.status, "API status:", response.data.status);
        
        if (response.status === 200 && response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return element;
        } else {
            console.error("Failed to fetch distance and time:", response.data);
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error("Error in getDistanceTime:", err.message);
        throw err;
    }
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GO_MAPS_MAPS_API;
   const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}