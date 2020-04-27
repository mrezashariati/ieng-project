const express = require('express')
const app = express()
require('dotenv').config()
polygonAPI = require('./polygons/polygonAPI')
countryAPI = require('./countries/countryAPI')
const bodyParser = require('body-parser')

// api declaration goes here..
app.set('view engine','ejs')
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use('/gis',polygonAPI);
app.use('/countries',countryAPI)
app.get('/',(req,res)=>{
    res.send('UP AND RUNNING...')
})

app.get('/test_area',(req,res)=>{
    
})

module.exports = app
