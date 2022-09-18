const regionName = new Intl.DisplayNames(
    ['en'], {type: 'region'}
);

function getLink(city){return 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=6840f05c28c3e64b4fc5f9e8349a21bf'}

async function getWeatherArray(city){
    try{
        const response = await fetch(getLink(city), {mode: "cors"});
        const data = await response.json();
        const weatherArray = [data.main.humidity,
         data.main.temp,
         data.main.temp_max,
         data.main.temp_min,
         data.name,
         data.sys.country,
         data.weather[0].icon,
         data.weather[0].id
        ]
        drawArray(weatherArray);
    }
    catch{
        alert('Error,');
    }
}

function drawArray(array){
    let content = document.querySelector('.content');
    let humidity = document.createElement('div'); humidity.classList.add('humidity');
    humidity.textContent = array[0];
    let tempera = document.createElement('div'); tempera.classList.add('tempera');
    tempera.textContent = array[1];
    let temp_max = document.createElement('div'); temp_max.classList.add('temp_max');
    temp_max.textContent = array[2];
    let temp_min = document.createElement('div'); temp_min.classList.add('temp_min');
    temp_min.textContent = array[3];
    let cityName = document.createElement('div'); cityName.classList.add('cityName');
    cityName.textContent = array[4];
    let countryName = document.createElement('div'); countryName.classList.add('countryName')
    countryName.textContent = regionName.of(array[5]);
    let icon = document.createElement('div'); icon.classList.add('icon');
    humidity.textContent = array[6];
    let weatherID = document.createElement('div'); weatherID.classList.add('weatherID');
    weatherID.textContent = array[7];
    content.append(cityName, countryName, humidity, tempera, temp_max, temp_min, icon, weatherID);
}

let choice = prompt('Enter a city');
getWeatherArray(choice);
