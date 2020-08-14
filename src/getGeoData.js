const request = require('postman-request');

function getGeoData(city, cb) {
    const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiamRvbTkzIiwiYSI6ImNrZG0xN2VrMzE0MTQycXEzZXJqbmF2bnkifQ.MZ7GiqfUie6zHKHjl4XFcA&limit=1`;
    request(
        {
            url: urlGeo,
            json: true,
        },
        function (err, res) {
            if (err) {
                cb('Unable to connect to GeoLocation API.', undefined);
            } else if (res.body.message || res.body.features.length === 0) {
                cb('Geo-Location not found.', undefined);
            } else {
                let [longitude, latitude] = res.body.features[0].center;

                cb(undefined, {
                    longitude,
                    latitude,
                });
            }
        }
    );
}

module.exports = getGeoData;
