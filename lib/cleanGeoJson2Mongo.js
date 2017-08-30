var tj = require('togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom 
    DOMParser = require('xmldom').DOMParser;

var _error_noexist = 'No existe el fichero';
var _error_unexp = 'Unexpected return of path';
var pathutils = require('path');
var Regex = require("regex");
var exec = require('child_process').exec;

exports.replace = function(objetivo, reemplazos) {
    var param_encontrados = objetivo.match(/%(.*?)%/g);

    if (param_encontrados) {
        var nombre_param = null,
            valor_reemplazo = null;

        for (var i = 0; i < param_encontrados.length; i++) {
            nombre_param = param_encontrados[i].replace(/%/g, '');
            valor_reemplazo = reemplazos[nombre_param];

            objetivo = objetivo.replace(param_encontrados[i], valor_reemplazo);
        }
    }

    return objetivo;
};

exports.parse2savemongo = function(path, collection) {

    if (fs.existsSync(path)) {

        var path_stat = fs.statSync(path);

        if (path_stat.isFile()) {
            return path;
        } else if (path_stat.isDirectory()) {
            fs.readdirSync(path).forEach(function(file) {
                // Por cada archivo del directorio
                // Comprobar que es un fichero, para no bajar recursivamente
                var fileconv;
                var converted;
                if (fs.statSync(path + '/' + file).isFile()) {
                    if (pathutils.extname(file) === '.gpx') {
                        console.log('GPX Translate ' + file);
                        fileconv = new DOMParser().parseFromString(fs.readFileSync(path + '/' + file, 'utf8'));
                        converted = tj.gpx(fileconv, { styles: true });

                    } else if (pathutils.extname(file) === '.kml') {
                        console.log('KML Translate ' + file);
                        fileconv = new DOMParser().parseFromString(fs.readFileSync(path + '/' + file, 'utf8'));
                        converted = tj.kml(fileconv, { styles: true });
                    }
                    //console.log(JSON.stringify(converted));
                    // Parse file
                    // {"type":"FeatureCollection","features":[
                    // var regex = new Regex(/^.*\[/);
                    var patt_ini = /^.*\"features\"\:\[/ig;
                    var patt_fin = /\]\}$/ig;
                    var patt_geo = /\"geometry\"/ig;
                    // console.log('Resultado ' + patt_ini.test(JSON.stringify(converted)));
                    // console.log('Resultado Fin ' + patt_fin.test(JSON.stringify(converted)));
                    var converted_string = JSON.stringify(converted);
                    fs.writeFileSync('/tmp/' + pathutils.basename(file, pathutils.extname(file)) + '.geojson', converted_string.replace(patt_ini, '[').replace(patt_fin, ']').replace(patt_geo, 'location'), 'utf8');
                    var command = 'mongoimport /tmp/' + pathutils.basename(file, pathutils.extname(file)) + '.geojson' +
                        ' -c ' + collection + ' --host localhost --port 27017 --db mkfwcoredb -u "mkfwcore" -p "admin" --authenticationDatabase "mkfwcoredb" --jsonArray';

                    exec(command, function(error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
                }
            });
            return path;
        } else {
            return _error_unexp;
        }
    } else {
        return _error_noexist;
    }
};