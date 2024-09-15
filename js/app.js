let headlines = []
let showArticle = 0


// network request to GET stories
function retrieveHeadlines() {
    fetch("https://api.thenewsapi.com/v1/news/top?api_token=s9yWxtRi1Kd6djURAF9WudoleoEnw4gtget2NeeB&locale=us&limit=3")
// catch error if network request fails        
    .then(resp => resp.ok? resp.json() : console.warn("error loading"))
// on successful request set response data to headlines array, these are the stories
    .then(resp => mapHeadlinesToDOM(resp.data))
}

//grab news section
const headlineSection = document.getElementById("headline-showcase")
const newsSection = document.getElementById('news-section')

function mapHeadlinesToDOM(headlinesParam){
    headlines = headlinesParam
    // after response from newsAPI take data and map to individual dom elements for display
    if (headlineSection) headlinesParam.map(story => {
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

    if (newsSection) showNewsArticle(headlinesParam[showArticle])
}
// grab each weather section
const weatherMain = document.getElementById('weather-main')
const weatherSection = document.getElementById('weather-section')

function retrieveWeather() {
    // network request to weather API
    fetch("http://api.weatherapi.com/v1/current.json?key=aff767064e2c48e4b8f212433241109&q=cleveland&aqi=no")
    .then(resp => resp.ok ? resp.json() : console.warn('error loading'))
    //catch error if request fails
    .then(data => {if (weatherMain) mapWeatherToDOM(data)})
    //parsed weather data injected to mapweather function 
}


function mapWeatherToDOM(weather){
// recieve weather object from request
// construct weather icon based on data
    const icon = document.createElement('img')
    icon.src = weather.current.condition.icon
    icon.style.width = '150%'
    icon.id = 'icon'
    weatherMain.append(icon)
    //append to DOM
//construct weather temperature based on data
    const temperature = document.createElement('h2')
    temperature.innerText = weather.current.temp_f + 'ºF'
    temperature.style.fontSize = '2rem'
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
    humidityDetail.innerText = `${weather.current.humidity}% humidity with precipitation at ${weather.current.precip_in}"`
    humidityDetail.id = 'humid'
    details.append(humidityDetail)
}

//load page
retrieveHeadlines()
retrieveWeather()



function showNewsArticle(article) {
    console.log(article)
    const image = document.getElementById('news-image')
    image.style.backgroundImage = `url(${article.image_url})`
    const title = document.getElementById('news-headline')
    title.innerText = article.title
    const author = document.getElementById('news-author')
    author.innerText = article.source
    const content = document.getElementById('news-article')
    content.innerText = article.snippet + content.innerText
    const link = document.getElementById('article-link')
    link.href = article.url
    
}

const nextArticle = document.getElementById('article-change')

nextArticle.addEventListener('click', () => {
    if(showArticle === 2) showArticle = 0
    else showArticle += 1
    retrieveHeadlines()
})

