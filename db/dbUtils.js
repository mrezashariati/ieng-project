
let geojson = undefined
let polygons = undefined

function loadDB(){
    require('dotenv').config()
    fs = require('fs')
    try{
        let jsonString = fs.readFileSync(process.env.ROOT + 'db/db.json')
        geojson = JSON.parse(jsonString)
        loadPolygons()
    }catch(err){
        console.log(err)
    }
}

function saveDB(){

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
    if(typeof geojson === 'undefined'){
        loadDB()
    }
    if(polygons.hasOwnProperty(name)){
        return polygons.name
    }
    return false
}

function addPolygon(coordinates,properties){
    if(typeof geojson === 'undefined'){
        loadDB()
    }
    polygons[properties['name']] = turf.polygon(coordinates,properties)
}

module.exports = {
    getPolygons,
    getPolygon,    
    addPolygon,
}