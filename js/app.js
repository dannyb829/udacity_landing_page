// create array for top 3 news stories

let headlines = []

// network request to GET stories
function retrieveHeadlines() {
    fetch("https://api.thenewsapi.com/v1/news/top?api_token=s9yWxtRi1Kd6djURAF9WudoleoEnw4gtget2NeeB&locale=us&limit=3")
// catch error if network request fails        
    .then(resp => resp.ok? resp.json() : console.warn("error loading"))
// on successful request set response data to headlines array, these are the stories
    .then(resp => headlines = resp.data)
}

retrieveHeadlines()