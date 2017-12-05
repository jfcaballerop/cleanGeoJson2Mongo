/**
 * Probe with:
 * node test/gpx2geojson.js /DATA/PROYECTOS/DOMINICA/Requisitos/NUEVOS\ GPX/ roads localhost 27017 mkfwcoredb mkfwcore admin mkfwcoredb
 */
var cleangjson = require('../lib/cleanGeoJson2Mongo');


if (process.argv.length <= 9) {
    console.log(process.argv);
    console.log("\n## ERROR ##\n\nUsage: node " + __filename + " path collection host port db user pass authdb");
    process.exit(-1);
}
var path = process.argv[2];
var collection = process.argv[3];
var host = process.argv[4];
var port = process.argv[5];
var db = process.argv[6];
var user = process.argv[7];
var pass = process.argv[8];
var authdb = process.argv[9];
console.log('Resultado:: ' + cleangjson.parse2savemongo(path, collection, host, port, db, user, pass, authdb));