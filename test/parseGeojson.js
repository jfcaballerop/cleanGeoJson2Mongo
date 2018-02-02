/**
 * Probe with:
 * node test/gpx2geojson.js /DATA/PROYECTOS/DOMINICA/Requisitos/NUEVOS\ GPX/ roads localhost 27017 mkfwcoredb mkfwcore admin mkfwcoredb
 */
var cleangjson = require('../lib/cleanGeoJson2Mongo');


if (process.argv.length <= 0) {
    console.log(process.argv);
    console.log("\n## ERROR ##\n\nUsage: node " + __filename + "");
    process.exit(-1);
}

console.log('Resultado:: ' + cleangjson.parseGeoJson());