function validatePolygon(coordinates,properties){
    return true
}

function addPolygon(body){
    let properties = body.properties
    let coordinates = body.geometry.coordinates
    let getP = require(process.env.ROOT + 'db/dbUtils').getPolygon
    let addP = require(process.env.ROOT + 'db/dbUtils').addPolygon

    if(!getP(properties.name) && validatePolygon(coordinates,properties)){
        addP(coordinates,properties)
        return true
    }
    return false
}

function polygonsHasPoint(coordinate){
    let turf = require('@turf/turf');
    let polygons = require(process.env.ROOT + 'db/dbUtils').getPolygons();
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
