const form = document.querySelector('form');
const locationText = document.getElementById('location');
const forecastText = document.getElementById('forecast');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    getWeatherJSON(e.target[0].value);
    e.target[0].value = '';
});

function getWeatherJSON(address) {
    locationText.innerText = 'Loading...';
    forecastText.innerText = '';
    fetch('http://localhost:3000/weather?address=' + address).then(function (
        response
    ) {
        return response.json().then(function (data) {
            if (data.error) {
                locationText.innerText = data.error;
            } else {
                locationText.innerText = data.location;
                forecastText.innerText = data.forecast;
            }
        });
    });
}
