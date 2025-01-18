const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');



module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    try {
        const { address } = req.query;
        const coordinates = await mapService.getAddressCoordinate(address);
        console.log("🚀 ~ module.exports.getCoordinates= ~ coordinates:", coordinates)
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
        
}

module.exports.getDistanceTime = async (req, res, next) => {


    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { origin, destination } = req.query;
   
        origin = origin.trim();
        destination = destination.trim();

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);
      

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
      
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}