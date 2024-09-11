// network request to GET stories
async function retrieveHeadlines() {
    fetch("https://api.thenewsapi.com/v1/news/top?api_token=s9yWxtRi1Kd6djURAF9WudoleoEnw4gtget2NeeB&locale=us&limit=3")
// catch error if network request fails        
    .then(resp => resp.ok? resp.json() : console.warn("error loading"))
// on successful request set response data to headlines array, these are the stories
    .then(resp => mapHeadlinesToDOM(resp.data))
}

retrieveHeadlines()

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