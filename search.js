const formTag = document.querySelector('form')
const inputTag = formTag.querySelector('input')
const access_key = "XW-fub6_RtilpiWe9iU8LGjxU8fXiuVCr75JrjsnznA"
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query="
const resultsTag = document.querySelector("section.results")
const searchUnsplash = function (term) {
    return fetch(apiUrl + term, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + access_key
        }
    })
        .then(response => response.json())
        .then(data => {
            //format results
            return data.results.map(result => {
                return {
                    imageSrc: result.urls.regular,
                    width: result.width,
                    height: result.height,
                    name: result.user.name,
                    title: (result.description || "Untitled"),
                    backgroundColor: (result.color || "#cccccc") + "33"
                }
            })
        })
}

//add results to page
const addResults = function (results) {
    resultsTag.innerHTML = ""
    //loop through results and add to resultsTag
    results.forEach(result => {
        resultsTag.innerHTML = resultsTag.innerHTML + `
				<div class="single-result">
				<div class="image" style="background-color: ${result.backgroundColor}">
				<img src="${result.imageSrc}"> 
				</div>
				<h2>${result.title}</h2>
				<p>By: ${result.name} ${result.width} x ${result.height}</p>
				</div>		
	`
    })
}

//when form submitted get input
formTag.addEventListener("submit", function (event) {
    const searchTerm = inputTag.value
    searchUnsplash(searchTerm)
        .then(results => {
            addResults(results)
        })

    //prevent search going to new page
    event.preventDefault()
})