const express = require('express');
const router = express.Router();
let polygonUtils = require(process.env.ROOT + 'polygons/polygonUtils');
let dbUtils = require(process.env.ROOT + 'db/dbUtils');

router.use(function logger(req,res,next){
    console.log('polygon req')
    next()
})

router.get('/polygons',function(req,res){
    let getGeoJson = polygonUtils.getGeoJson
    res.send(getGeoJson())
})

router.get('/testpoint',function(req,res){
    let coordinates = [parseFloat(req.query.long),parseFloat(req.query.lat)]
    positives = polygonUtils.polygonsHasPoint(coordinates)
    res.send(positives)
})
    

router.put('/addpolygon',function(req,res){
    addP = polygonUtils.addPolygon;
    getGeoJson = dbUtils.getGeoJson;
    addP(req.body.geometry.coordinates,req.body.properties);
    res.send(getGeoJson())
})

module.exports = router