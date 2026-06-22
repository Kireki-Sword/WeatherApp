const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "8e02ad862a0f50264dfe99de9fc21f3c";

weatherForm.addEventListner('sumbit', async event => {

    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
            const getWeatherData = await getWeatherData(city);
            displayWeatherinfo(getWeatherData)

        }
        catch(error){
            console.error(error);
            displayError(error);

        }

    }
    else{
        displayError('Please Enter a City');
    }

});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey} `
    
    const response = await fetch(apiUrl)

    if (!response.ok){
        throw new Error("City not found");
    }

    return await response.json();
}

function displayWeatherinfo(data){
    data = const {name:city, main: {temp;humidity}, weather: [{description,id}]};
    card.textContent = ''
    card.style.display = 'flex';

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city
    cityDisplay.classList.add("cityDisplay")
    card.appendChild(cityDisplay);


    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${(temp -273.15).tofixed(1)}°c`;
    tempDisplay.classList.add("tempDisplay")
    card.appendChild(tempDisplay);

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `humidity: ${humidity}  `;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    const descDisplay = document.createElement("p");
    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherid < 300):
            return '⛈️';

        case(weatherId >= 300 && weatherid < 400):
            return '🌧️';
    

        case(weatherId >= 500 && weatherid < 600):
            return '🌧️';

        case(weatherId >= 600 && weatherid < 700):
            return '❄️';
 
        case(weatherId >= 700 && weatherid < 800):
            return '🌫️';
   
        case(weatherId === 800):
            return '☀️';

        case(weatherId >= 801 && weatherid < 810):
            return '☁️';
        default:
            return '?';
    }
    

}

function displayError(massage){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message
    errorDisplay.classList.add("errorDisplay")

    card.textContent = ''
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}