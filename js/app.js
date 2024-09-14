// network request to GET stories
async function retrieveHeadlines() {
    fetch("https://api.thenewsapi.com/v1/news/top?api_token=s9yWxtRi1Kd6djURAF9WudoleoEnw4gtget2NeeB&locale=us&limit=3")
// catch error if network request fails        
    .then(resp => resp.ok? resp.json() : console.warn("error loading"))
// on successful request set response data to headlines array, these are the stories
    .then(resp => mapHeadlinesToDOM(resp.data))
}

//grab news section
const headlineSection = document.getElementById("headline-showcase")

function mapHeadlinesToDOM(headlines){
    // after response from newsAPI take data and map to individual dom elements for display
    headlines.map(story => {
        const storyDiv = document.createElement('div')
        //set story details
        storyDiv.innerHTML = `<img class='story-img' src=${story.image_url}>
        <h3>${story.title}</h3>
        <p>${story.description}</p>
        <hr>`
        storyDiv.classList.add('headline')
        // append story to DOM
        headlineSection.appendChild(storyDiv)
        
    })
}

async function retrieveWeather() {
    // network request to weather API
    fetch("http://api.weatherapi.com/v1/current.json?key=aff767064e2c48e4b8f212433241109&q=cleveland&aqi=no")
    .then(resp => resp.ok ? resp.json() : console.warn('error loading'))
    //catch error if request fails
    .then(mapWeatherToDOM)
    //parsed weather data injected to mapweather function 
}

// grab each weather section
const weatherMain = document.getElementById('weather-main')
const weatherSection = document.getElementById('weather-section')

function mapWeatherToDOM(weather){
// recieve weather object from request
// construct weather icon based on data
    const icon = document.createElement('img')
    icon.src = weather.current.condition.icon
    icon.style.width = '150px'
    icon.id = 'icon'
    weatherMain.append(icon)
    //append to DOM
//construct weather temperature based on data
    const temperature = document.createElement('h2')
    temperature.innerText = weather.current.temp_f + 'ºF'
    temperature.style.fontSize = '3rem'
    temperature.id = 'temp'
    weatherMain.append(temperature)
    //append to DOM

// select a few details from weather data to display more info
//at least 3 wind with direction / humidity / real feel 
//add details to DOM
//dtails div to house all details
    const details = document.createElement('div')
    details.id = 'details'
    weatherSection.append(details)

    const location = document.createElement('h2')
    location.innerText = `The city of ${weather.location.name}, ${weather.location.region}`
    location.id = 'local'
    details.append(location)

    const windDetails = document.createElement('h2')
    windDetails.innerText = `${weather.current.wind_dir} ward winds at ${weather.current.wind_mph}mph`
    location.id = 'wind'
    details.append(windDetails)

    const realFeel = document.createElement('h2')
    realFeel.innerText = `real feel ${weather.current.feelslike_f}ºF`
    realFeel.id = 'real'
    details.append(realFeel)

    const humidityDetail = document.createElement('h2')
    humidityDetail.innerText = `${weather.current.humidity}% humidity with precipitation at ${weather.current.precip_in} inches`
    humidityDetail.id = 'humid'
    details.append(humidityDetail)
}

//load page
retrieveHeadlines()
retrieveWeather()