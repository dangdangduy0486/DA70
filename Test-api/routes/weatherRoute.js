const express = require('express');
// const fetch = require('node-fetch');
const axios = require('axios');

const router = express.Router();

router.get('/:locationName', (req, res) => {
    const locationName = req.params.locationName;
    const url = "https://www.metaweather.com/api/location/search/?query=" + locationName;
});

module.exports = router;
