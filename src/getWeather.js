const request = require('postman-request');

function getWeather(geoLocation, cb) {
    const { latitude, longitude } = geoLocation;

    const urlWeather = `http://api.weatherstack.com/current?access_key=b5fe75e0fa6ec7b8fd95451354cb5d70&query=${latitude},${longitude}&units=m`;

    request(
        {
            url: urlWeather,
            json: true,
        },
        function (error, response) {
            if (error) {
                cb('Unable to connect to Weather API.', undefined);
            } else if (response.body.error) {
                cb('Location not found.', undefined);
            } else {
                cb(undefined, response.body);
            }
        }
    );
}
module.exports = getWeather;
