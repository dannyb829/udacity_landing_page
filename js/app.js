// these variables are used to store news articles for use thoughout site
// headlines to store articles / showArticle to set index in headlines to display on news.html page
let headlines = []
let showArticle = 0

//lorem ipsum placeholder text 
const lorem = `Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent imperdiet rhoncus himenaeos praesent penatibus. Elementum nascetur efficitur auctor ex lacinia mollis. Ornare arcu purus tortor neque nullam inceptos neque ultricies. Habitant semper aenean condimentum quisque molestie finibus ad. Tortor tempus nulla quisque ad ut elit. Auctor conubia mus accumsan platea, finibus nascetur. Integer neque platea litora class penatibus nullam mauri Vestibulum dui fermentum sed nec quisque nec. Odio penatibus enim maximus integer sed fringilla quam senectus. Magna massa dictumst fames, maecenas mollis purus gravida. Feugiat ultricies lacus nibh eu sollicitudin a lacus. Risus ac purus quis praesent at cursus integer. Arcu varius montes integer, etiam vulputate ac. Condimentum sed maecenas nibh morbi arcu. Ipsum odio adipiscing elit facilisis ornare amet. Aliquet natoque mus platea interdum integer venenatis. Integer nam torquent libero sed nec ridiculus lacus risus. Integer eu condimentum in senectus neque porttitor potenti. Ut facilisis lacinia nascetur fringilla aenean rutrum. Nullam curae tempus tincidunt morbi faucibus aptent ante venenatis. Mollis fringilla adipiscing magnis ipsum enim cursus sem sagittis. Condimentum sodales ornare curae consectetur neque aliquet? Porta bibendum eros lacinia justo rutrum. Ridiculus nam quam odio gravida penatibus egestas tellus. Eget auctor cursus porta elementum habitant. Feugiat blandit sociosqu pellentesque vestibulum maximus mus proin natoque. Ultricies sociosqu est penatibus posuere dictumst facilisis mi? Porta penatibus sem convallis commodo fermentum. Aenean duis class ultrices vitae penatibus semper arcu himenaeos. Dignissim vestibulum hac vivamus; posuere dictumst luctus. Venenatis ante aliquam tristique quisque phasellus vitae pretium nostra. Justo enim amet facilisis rutrum magnis orci sed eleifend. Penatibus ipsum massa non mollis dapibus nisi hac urna. At eleifend eros tincidunt at praesent. Per habitant est maximus adipiscing ante habitant. Curabitur ut magna efficitur sem faucibus ad. Cras sem sociosqu habitasse cursus parturient vulputate velit tristique? Aliquam sodales eros diam massa, felis imperdiet parturient. Justo dolor porta augue proin metusAccumsan justo vivamus adipiscing purus orci, porttitor purus erat. Sapien lacus dis pulvinar magna facilisis facilisis nulla. Varius pellentesque velit maecenas inceptos faucibus proin lectus consequat. Mus vitae facilisis posuere vitae eleifend nam himenaeos. Massa faucibus dictum phasellus metus maximus eros at fringilla. Tempor suspendisse himenaeos sapien, mattis aliquam pretium quam platea. Sociosqu et cras morbi habitasse non non augue netus vehicula. Habitasse in facilisi vehicula turpis non est. Maximus sociosqu duis iaculis sodales orci. Nascetur etiam non sit platea posuere elementum. Himenaeos consequat magnis auctor iaculis tellus laoreet platea dapibus. Eleifend dolor lacus; convallis interdum ultrices felis. Eu porta penatibus habitant lacinia hac felis platea ridiculus. Fringilla mauris enim natoque primis, facilisi aliquet phasellus. Cras efficitur diam elit conubia vivamus sociosqu aptent nascetur. Habitant vulputate taciti iaculis augue litora. Parturient praesent lacus condimentum praesent blandit metus. Posuere pellentesque vivamus finibus at etiam ridiculus interdum euismod. Molestie gravida proin bibendum gravida magna lobortis, fusce cras. Sapien vehicula facilisis ut est convallis. Facilisis sit lacus molestie nunc adipiscing cubilia; habitant curae mauris. Nunc ex class aliquet torquent porta hac urna dolor. Fames risus diam adipiscing luctus semper placerat ante ligula. Dictumst auctor quam efficitur commodo vitae leo eu euismod integer. Congue sed justo consectetur pulvinar neque dignissim. Gravida habitasse nostra venenatis ante, bibendum dui sociosqu. Eget rhoncus mauris vivamus quis mollis nullam nullam? Ex rutrum magna taciti, condimentum sit erat massa. Curabitur cursus duis massa, maximus fusce egestas. Tincidunt maecenas lobortis aliquet eu nullam. Nibh senectus dictum phasellus rutrum aptent massa. Ullamcorper nullam primis inceptos vitae interdum. Vivamus odio laoreet vestibulum rutrum elit in dui. Magna porttitor non dis erat sem. Aliquam curae luctus torquent magnis adipiscing platea ipsum sem. Himenaeos imperdiet lobortis dictum fames sociosqu facilisis ut vehicula est. Lacinia pellentesque efficitur neque; porttitor ante laoreet. Dignissim cras ornare pharetra diam in sed tempus a risus. Lacus montes ridiculus porta eu sapien at erat auctor nisi. Amet quis accumsan morbi, facilisis varius nunc.`;
// event listeners for nav-buttons
function navButtonEvents() {
    const buttons = document.getElementsByClassName('nav-button')

    for (const button of buttons) {
        button.addEventListener('click', () => {
            switchPage(button.name)
        })
    }
}

navButtonEvents()

// network request to GET stories
function retrieveHeadlines() {
    //articles retrieved from TheNewsAPI. if limit is reached swap the api_token in url
    // to s9yWxtRi1Kd6djURAF9WudoleoEnw4gtget2NeeB
    fetch("https://api.thenewsapi.com/v1/news/top?api_token=tE4mlKSRWbOOIT3rULjcUBOuFLOaQEzlUdHsTjm4&locale=us&limit=3")
        // catch error if network request fails        
        .then(resp => resp.ok ? resp.json() : console.warn("error loading"))
        // on successful request set response data to headlines array, these are the stories
        .then(resp => mapHeadlinesToDOM(resp.data))
}

//grab news section
const headlineSection = document.getElementById("headline-showcase")
const newsSection = document.getElementById('news-section')

function mapHeadlinesToDOM(headlinesParam) {
    headlines = headlinesParam
    // after response from newsAPI take data and map to individual dom elements for display
    // conditional only append headlines to DOM if on main page
    if (headlineSection) {
        for (let i = 0; i < headlinesParam.length; i++) {
            const storyDiv = document.createElement('div')
            //set story details
            const story = headlinesParam[i]
            storyDiv.innerHTML = `<img class='story-img' src=${story.image_url}>
            <h3>${story.title}</h3>
            <p>${story.description}</p>
            <hr>`
            storyDiv.id = i
            storyDiv.classList.add('headline', 'clickable')

            headlineSection.appendChild(storyDiv)

            // make articles clickable
            // add eventlistener , on click change the showArticle to the articles id 
            // so that when navigated to news page the right article is displayed
            // append story to DOM

            storyDiv.addEventListener('click', () => {
                showArticle = parseInt(storyDiv.id)
                switchPage('news')
            })
        }

    }

}

// grab each weather section
const weatherMain = document.getElementById('weather-main')
const weatherSection = document.getElementById('weather-section')

function retrieveWeather() {
    // network request to weather API
    fetch("http://api.weatherapi.com/v1/current.json?key=aff767064e2c48e4b8f212433241109&q=cleveland&aqi=no")
        .then(resp => resp.ok ? resp.json() : console.warn('error loading'))
        //catch error if request fails
        .then(data => { if (weatherMain) mapWeatherToDOM(data) })
    //parsed weather data injected to mapweather function 
    // conditionally display depending on page selected
}


function mapWeatherToDOM(weather) {
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
    // append each to DOM
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
    // inject details of selected article into news page
    const image = document.getElementById('news-image')
    image.style.backgroundImage = `url(${article.image_url})`
    const title = document.getElementById('news-headline')
    title.innerText = article.title
    const author = document.getElementById('news-author')
    author.innerText = article.source
    const content = document.getElementById('news-article')
    content.innerText = article.snippet + lorem
    // const link = document.getElementById('article-link')
    // link.href = article.url

}


// direct to next page logic

function switchPage(page) {
    // remove active class from nav place on actual active
    const current = document.getElementsByClassName('active')[0]
    current.classList.remove('active')
    const next = document.querySelector(`[name = ${page}]`)
    next.classList.add('active')
// grab name from nav button and use to navigate how to maniplulate DOM
    switch (page) {
        case 'home':
            window.location = './index.html'
            break;
        case 'news':
            slapNewsOnToDom(page)
            break;
        case 'contact':
            slapContactOnToDOM(page)
            break;
        case 'about':
            slapAboutOnToDOM(page)
            break;
    }
}
// build out news page

function slapNewsOnToDom() {
    const article = headlines[showArticle]
    const newsMain = document.getElementsByTagName('main')[0]
    newsMain.id = 'news-section'
    newsMain.innerHTML = `<div id="news-image"></div>
    <div id="news-inf">
    <h1 id="news-headline"></h1>
    <h2 id="news-author"></h1>
    <p id="news-article"> 
    </p>
    </div>`;
    // inject article details
    showNewsArticle(article)
    //set sidebar
    const articleSide = document.getElementsByTagName('aside')[0]
    articleSide.id = 'article-sidebar'
    articleSide.innerHTML = `<div id="article-actions">
                <a id="article-change" class ='button'>next article</a>
                <a id="article-link" href=${article.url} class='button'>source</a>
            </div>`

    const nextArticle = document.getElementById('article-change')
    // toggle next article on news page using showArticle Variable
    nextArticle.addEventListener('click', () => {
        //cycles through 3 articles starting at 0 index
        if (showArticle === 2) showArticle = 0
        else showArticle += 1
        showNewsArticle(headlines[showArticle])
    })


}
// build out about page 
//display about page
function slapAboutOnToDOM() {
    const aboutMain = document.getElementsByTagName('main')[0]
    aboutMain.id = 'contact-section'
    aboutMain.innerHTML = `<h1>We are here to share!</h1>
                            <p>${lorem}</p>`
    const aboutSide = document.getElementsByTagName('aside')[0]
    aboutSide.id = 'about-sidebar'
    const globeImg = document.createElement('img')
    globeImg.src = './images/global.png'
    globeImg.id = 'globe-img'
    aboutSide.replaceChildren(globeImg)
}
// build out contact page 
//display contact page
function slapContactOnToDOM() {
    const contactMain = document.getElementsByTagName('main')[0]
    contactMain.id = 'contact-section'
    contactMain.innerHTML = `<h1>Suggestions?</h1>
            <h2>Feel free to contacts us</h2>
            <p>We are here to make sure you have everything you need to start your day. If you are a writer we encourage you to send us your articles, we are always looking for the latest!</p>
            <a href="mailto:contact@dbreifing.com" class="button">contact@dbreifing.com</a>`
    const contactSide = document.getElementsByTagName('aside')[0]
    contactSide.id = 'contact-sidebar'
    contactSide.innerHTML = ''
}