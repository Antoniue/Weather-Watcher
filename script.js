let currentDeg= 'C';
let currentCity= 'London';

const regionName = new Intl.DisplayNames(
    ['en'], {type: 'region'}
);

function getLink(city){return 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=6840f05c28c3e64b4fc5f9e8349a21bf'}

function capitalizeFirst(string){
    let temp = string[0].toUpperCase();
    return temp + string.slice(1);
}

function printTempera(string)
{
    if(currentDeg === 'C')
    {
        return Math.round(((string - 273.15) + Number.EPSILON) * 10) / 10 + "°C";
    }
    else if(currentDeg === 'F')
    {
        return Math.round((((string - 273.15) * 1.8 + 32) + Number.EPSILON) * 10) / 10 + "°F";
    }
}

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
         data.weather[0].description
        ]
        drawArray(weatherArray);
    }
    catch{
        alert('Error, please make sure you have entered a valid city name');
    }
}

function drawArray(array){
    let cityName = document.querySelector('.cityName');
    let countryName = document.querySelector('.countryName');
    let humidity = document.querySelector('.humidity');
    let tempera = document.querySelector('.tempera');
    let temp_max = document.querySelector('.temp_max');
    let temp_min = document.querySelector('.temp_min');
    let icon = document.querySelector('.icon');
    let weatherDesc = document.querySelector('.weatherDesc');
    cityName.textContent = array[4];
    countryName.textContent = ', '+regionName.of(array[5]);
    humidity.textContent = "Humidity: " + array[0] + "%";
    tempera.textContent = printTempera(array[1]);
    temp_max.textContent = printTempera(array[2]);
    temp_min.textContent = printTempera(array[3]);
    icon.innerHTML = '<img src="./pictures/'+array[6]+'@2x.png" alt="placeholder"></img>';
    weatherDesc.textContent = capitalizeFirst(array[7]);

}

let form = document.querySelector('.form');
let enterCity = document.querySelector('#enterCity');
form.addEventListener('submit', (e) => {
    currentCity = enterCity.value;
    if(enterCity.value == '')
    {
        e.preventDefault();
    }
    else
    {
        getWeatherArray(currentCity);
    }
}
);



function changeDegree()
{
    if(currentDeg == 'C')
    {
        currentDeg = 'F';
        changeMeasure.textContent = 'C';
    }
    else
    {
        currentDeg = 'C';
        changeMeasure.textContent = 'F';
    }
    getWeatherArray(currentCity);
}

let changeMeasure = document.querySelector('.changeMeasure');
changeMeasure.addEventListener('click', () => {
    changeDegree();
});
getWeatherArray('london');