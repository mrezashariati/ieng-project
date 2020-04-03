
let geojson
let polygons = {};
require('dotenv').config();
let fs = require('fs');
turf = require('@turf/turf')
let {initializeLogger,createLogger,log,getLogger} = require('../logger.js')

function loadDB(){
    try{
        fs.exists('./db/db.json',(exists)=>{
            if(exists){
                fs.readFile('./db/db.json',(err,data)=>{
                    if(!err){
                        geojson = JSON.parse(data);
                        loadPolygons()
                    }else{
                        throw err
                    }
                })
            }else{
                fs.writeFile('./db/db.json','{"type": "FeatureCollection","features": []}',()=>{
                    fs.readFile('./db/db.json',(err,data)=>{
                        if(!err){
                            geojson = JSON.parse(data);
                            loadPolygons()
                        }else{
                            throw err
                        }
                    })
                })
            }
        })
    }catch(err){
        log(message='internal error',level='error',err.stack)
    }
}

function saveDB(){

}

function getGeoJson(){
    return geojson
}

function loadPolygons(){
    for(i = 0;i < geojson['features'].length;i++){
        let name = geojson['features'][i]['properties']['name'];
        let coordinates = geojson['features'][i]['geometry']['coordinates'];
        polygons[name] = turf.polygon(coordinates,geojson['features'][i]['properties'])
    }
}

function getPolygons(){
    return polygons;
}

function getPolygon(name){
    return polygons[name];
}

function addPolygon(coordinates,properties){
    newPolygon = turf.polygon(coordinates,properties);
    polygons[properties['name']] = newPolygon;
    geojson.features.push(newPolygon)
}

module.exports = {
    loadDB,
    getPolygons,
    getPolygon,    
    addPolygon,
    getGeoJson,
}