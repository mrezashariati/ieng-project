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
    let coordinates = req.body.geometry.coordinates
    positives = require(process.env.ROOT + 'polygons/polygonUtils').polygonsHasPoint(coordinates)
    res.send(positives)
})
    

router.put('/addpolygon',function(req,res){
    addP = require(process.env.ROOT + 'polygons/polygonUtils').addPolygon
    if(addP(req.body)){
        res.send('polygon added succesfully.')
    }else{
        res.send('failed to add polygon.')
    }
})

module.exports = router