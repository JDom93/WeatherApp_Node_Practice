const weatherDisplay = (error, weather) => {
    if (error) console.log(error);
    else {
        const { name, country, region } = weather.location;
        const { temperature, feelslike, precip } = weather.current;
        return {
            location: name + ', ' + country + ', ' + region,
            forecast: `It is currently ${temperature} degrees Celsius outside. However, it rather feels like ${feelslike} degrees. There's a ${
                parseInt(precip) * 10
            }% chance of rain.`,
        };
    }
};

module.exports = weatherDisplay;
