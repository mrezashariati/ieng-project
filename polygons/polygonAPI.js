const express = require('express')
const router = express.Router()

router.use(function logger(req,res,next){
    console.log('polygon req')
    next()
})

router.get('/polygons',function(req,res){
    res.send(require(process.env.ROOT + 'db/dbUtils').getPolygons())
})

router.get('/testpoint',function(req,res){
    let coordinates = [parseFloat(req.query.long),parseFloat(req.query.lat)]
    positives = require(process.env.ROOT + 'polygons/polygonUtils').polygonsHasPoint(coordinates)
    res.send(positives)
})
    

router.put('/addpolygon',function(req,res){
    addP = require(process.env.ROOT + 'polygons/polygonUtils').addPolygon
    addP(req.body);
    res.sendStatus(200)
})

module.exports = router