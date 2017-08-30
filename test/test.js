var cleangjson = require('../lib/cleanGeoJson2Mongo');

var objetivo = "%hello% %world%! -- %world% %hello%!";
var idioma = "es";
var reemplazos = {
    "en": {
        "hello": "Hello",
        "world": "World"
    },
    "es": {
        "hello": "Hola",
        "world": "Mundo"
    }
};
// process.argv.forEach(function(val, index) {
//     console.log(`${index}: ${val}`);
// });
var filename = process.argv[2];
var collection = process.argv[3];
//var resultado = cleangjson.replace(objetivo, reemplazos[idioma]);
console.log('Resultado:: ' + cleangjson.parse2savemongo(filename, collection));