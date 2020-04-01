
let geojson = undefined
let polygons = undefined

function loadDB(){
    require('dotenv').config()
    fs = require('fs')
    let jsonString = fs.readFileSync(process.env.ROOT + 'db/db.json')
    geojson = JSON.parse(jsonString)
    loadPolygons()
}

function loadPolygons(){
    turf = require('@turf/turf')
    polygons = {}
    for(i = 0;i < geojson['features'].length;i++){
        let name = geojson['features'][i]['properties']['name'];
        let coordinates = geojson['features'][i]['geometry']['coordinates'];
        polygons[name] = turf.polygon(coordinates,geojson['features'][i]['properties'])
    }
}

function getPolygons(){
    if(typeof geojson === 'undefined'){
        loadDB()
    }
    return polygons;
}

function getPolygon(name){
    if(polygons.hasOwnProperty(name)){
        return polygons.name
    }
    return `polygon with name ${name} not found!`
}

module.exports = {
    getPolygons,
    getPolygon,    
}