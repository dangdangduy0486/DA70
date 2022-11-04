const config = require('../config');
const axios = require('axios');
const { response } = require('express');

const axiosOptions = {
    headers: {
        "Content-Type": "application/json",
    }
}

const getCityName = async (cityName) => {
    const res = await axios.get(
        config.weatherUrl(cityName), 
        axiosOptions
    )
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err)
    })
    return res.data;
}

const weatherParser = async (req, res) => {
    if(!req.query.cityName){
        return res.status(403).json({ error: "missing city name" })
    }
    const weatherData = await getCityName(req.query.cityName);
    return res.status(200).json(weatherData);
}
//3802856f6798411cb2b81923220311
module.exports = {
    weatherParser
}