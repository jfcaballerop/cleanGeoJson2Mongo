var tj = require('togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom 
    DOMParser = require('xmldom').DOMParser;

var _error_noexist = 'No existe el fichero';
var _error_unexp = 'Unexpected return of path';

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

exports.printfile = function(path) {

    if (fs.existsSync(path)) {

        var path_stat = fs.statSync(path);

        if (path_stat.isFile()) {
            return path;
        } else if (path_stat.isDirectory()) {
            fs.readdirSync(path).forEach(function(file) {
                // Por cada archivo del directorio
                // Comprobar que es un fichero, para no bajar recursivamente
                if (fs.statSync(path + '/' + file).isFile()) {

                    console.log(file);
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