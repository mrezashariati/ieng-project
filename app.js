const express = require('express')
const app = express()

require('dotenv').config()
polygonAPI = require(process.env.ROOT + '/polygons/polygonAPI')
const bodyParser = require('body-parser')

// api declaration goes here..
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use('/gis',polygonAPI);

module.exports = app
