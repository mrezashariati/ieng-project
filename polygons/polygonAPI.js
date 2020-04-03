const express = require('express');
const router = express.Router();
let polygonUtils = require(process.env.ROOT + 'polygons/polygonUtils');
let dbUtils = require(process.env.ROOT + 'db/dbUtils');
let {initializeLogger,createLogger,log,getLogger} = require(process.env.ROOT + 'logger.js')

router.use('/polygons',(req,res,next)=>{
    log(message = '/gis/polygons access')
    next()
})

router.route('/polygons')
    .get(function(req,res){
        try{
            let getGeoJson = dbUtils.getGeoJson;
            res.json(getGeoJson());
        }catch(err){
            log(message="internal error",level='error',err.toString())
            res.status(500).json("Internal error occured");
        }
    })

router.use('/testpoint',(req,res,next)=>{
        log(message='/gis/testpoint access')
        next()
})


router.get('/testpoint',function(req,res){
    try{
        let coordinates = [parseFloat(req.query.long),parseFloat(req.query.lat)]
        positives = polygonUtils.polygonsHasPoint(coordinates)
        res.json(positives)
    }catch(err){
        if(err.toString() === "Error: coordinates must contain numbers"){
            log(message='/testpoint Bad Request',level='info',err=err.toString())
            res.status(400).json("Bad Request")
        }
        else{
            log(message='internal error',level='error',err.toString())
            res.status(500).json('Internal error occured')
        }
    }
})

router.use('/addpolygon',(req,res,next)=>{
    log(message='/gis/addpolygon access')
    next()
})


router.put('/addpolygon',function(req,res){
    try{
        addPolygon = polygonUtils.addPolygon;
        getGeoJson = dbUtils.getGeoJson;
        addPolygon(req.body);
        res.json(getGeoJson())
    }catch(err){
        if(err.toString() === "invalid polygon"){
            log(message='/addpolygon Bad Request',level='info',err=err.toString())
            res.status(400).json('Bad Request')
        }else{
            log(message='internal error',level='error',err.toString())
            res.status(500).json('Interal error occured')
        }
    }
})

module.exports = router