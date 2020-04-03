let dbUtils = require(process.env.ROOT + 'db/dbUtils');
let turf = require('@turf/turf');
const GJV = require('geojson-validation');

function validatePolygon(body){
    return GJV.isFeature(body)
    
}

function addPolygon(body){
    if(validatePolygon(body)){
        let getPolygon = dbUtils.getPolygon
        let addPolygon = dbUtils.addPolygon
        let coordinates = body.geometry.coordinates
        let properties = body.properties
        if(!getPolygon(properties.name)){
            addPolygon(coordinates,properties)
        }
    }else{
        throw "invalid polygon"
    }
}

function polygonsHasPoint(coordinate){
    let polygons = dbUtils.getPolygons();
    let positives = {polygons:[]}
    for (const key in polygons) {
        if (turf.booleanPointInPolygon(turf.point(coordinate),polygons[key])) {
            positives.polygons.push(key)
        }
    }
    return positives;
}

module.exports = {
    addPolygon,
    polygonsHasPoint,
}
