var cleangjson = require('../lib/cleanGeoJson2Mongo');


if (process.argv.length <= 9) {
    console.log(process.argv);
    console.log("\n## ERROR ##\n\nUsage: node " + __filename + " path collection host port db user pass authdb");
    process.exit(-1);
}
var path = process.argv[2];
var collection = process.argv[3];
console.log('Resultado:: ' + cleangjson.parse2savemongo(path, collection, host, port, db, user, pass, authdb));