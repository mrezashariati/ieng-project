let dbUtils = require(process.env.ROOT + 'db/dbUtils');
let turf = require('@turf/turf');

function validatePolygon(coordinates,properties){
    return true
}

function addPolygon(coordinates,properties){
    let getPolygon = dbUtils.getPolygon
    let addPolygon = dbUtils.addPolygon

    if(!getPolygon(properties.name) && validatePolygon(coordinates,properties)){
        addPolygon(coordinates,properties)
        return true
    }
    return false
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
