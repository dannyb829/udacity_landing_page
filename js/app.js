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
const weatherIcon = document.getElementById('weather-icon')
const weatherTemp = document.getElementById('weather-temp')

function mapWeatherToDOM(weather){
// recieve weather object from request
// construct weather icon based on data
    const icon = document.createElement('img')
    icon.src = weather.current.condition.icon
    icon.style.width = '70%'
    weatherIcon.append(icon)
    //append to DOM
//construct weather temperature based on data
    const temperature = document.createElement('h1')
    temperature.innerText = weather.current.temp_f
    temperature.style.fontSize = '3rem'
    weatherTemp.append(temperature)
    //append to DOM
}

//load page
retrieveHeadlines()
retrieveWeather()