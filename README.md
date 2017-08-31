<!-- [![Build status](https://img.shields.io/travis/mapbox/togeojson.svg "Build status")](http://travis-ci.org/mapbox/togeojson) -->
<!-- [![Coverage status](https://img.shields.io/coveralls/mapbox/togeojson.svg "Coverage status")](https://coveralls.io/r/mapbox/togeojson) -->
[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

# Import document in GeoJSON format to MongoDB .

This converts [KML](https://developers.google.com/kml/documentation/) & [GPX](http://www.topografix.com/gpx.asp)
to [GeoJSON](http://www.geojson.org/), in a browser or with [Node.js](http://nodejs.org/).
Then this convert document is imported into MongoDB [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/)

* [x] Dependency-free
* [x] Tiny
* [x] Tested
* [x] Node.js

Want to use this with [Leaflet](http://leafletjs.com/)? Try [leaflet-omnivore](https://github.com/mapbox/leaflet-omnivore)!

## API

### `cleanGeoJson2Mongo.parse2savemongo(path, collection, host, port, db, user, pass, authdb)`

Convert a KML or GPX 'file | path' to GeoJSON and insert into MongoDB.
DB parameters is necessary include them. 

The output is a log with operations and MongoDB results.


## CLI

Install it into your path with `npm install -i cleangeojson2mongo`.

```
~> node test/test.js PATH COLL ...
```

## Node.js

Install it into your project with `npm install --save cleangeojson2mongo`.

```javascript
// using cleangeojson2mongo in nodejs

var cj2m = require('cleangeojson2mongo');

console.log('Resultado:: ' + cj2m.parse2savemongo(path, collection, host, port, db, user, pass, authdb));
```


### KML Feature Support

* [x] Point
* [x] Polygon
* [x] LineString
* [x] name & description
* [x] ExtendedData
* [x] SimpleData
* [x] MultiGeometry -> GeometryCollection
* [x] Styles with hashing
* [x] Tracks & MultiTracks with `gx:coords`, including altitude
* [x] [TimeSpan](https://developers.google.com/kml/documentation/kmlreference#timespan)
* [x] [TimeStamp](https://developers.google.com/kml/documentation/kmlreference#timestamp)
* [ ] NetworkLinks
* [ ] GroundOverlays

### GPX Feature Support

* [x] Line Paths
* [x] Line styles
* [ ] Properties
  * [x] 'name', 'cmt', 'desc', 'link', 'time', 'keywords', 'sym', 'type' tags
  * [ ] 'author', 'copyright' tags
