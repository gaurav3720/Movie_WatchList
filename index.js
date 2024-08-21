const btnEl = document.getElementById('btn')
const sectionTwoEl = document.getElementById('section-two')
const sectionTwoBg = document.getElementById('section-two-bg')
const savedWatchlistEl = document.getElementById('savedWatchList')
const MoviesFromLocalStorage = JSON.parse( localStorage.getItem("movie") )
let array = []


function render(item){
    sectionTwoEl.innerHTML = item
}

function showMoviesInView(){
    showView(sectionTwoEl)
    hideView(sectionTwoBg)
}

function showMoviesOutView(){
    showView(sectionTwoBg)
    hideView(sectionTwoEl)
}

function showView(view){
    view.style.display = 'flex'
}

function hideView(view){
    view.style.display = 'none'
}

document.addEventListener('click', (e) => {
    if(e.target.id == 'btn'){
        const inputFieldEl = document.getElementById('input-field')
        let movies = ''
        
        showMoviesInView()
        if(inputFieldEl.value){
            arr = MoviesFromLocalStorage
            fetch(`https://www.omdbapi.com/?apikey=8e8d3e03&s=${inputFieldEl.value}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                for(let item of data.Search){
                    fetch(`https://www.omdbapi.com/?apikey=8e8d3e03&i=${item.imdbID}`)
                        .then(res => res.json())
                        .then(data => {
                            movies += `
                                        <div class="movie">
                                            <img src="${data.Poster}" alt="poster">
                                            <div class="sub-section">
                                                <span>
                                                    <h1>${data.Title}</h1>
                                                    <p>⭐ ${data.imdbRating}</p>
                                                </span>
                                                <div class="sub-two">
                                                    <p>${data.Runtime}</p>
                                                    <p>${data.Genre}</p>
                                                    <button class="Watchlist" id="Watchlist">
                                                        <i class="fa fa-plus-circle fa-lg"></i>
                                                            Watchlist
                                                    </button>
                                                </div>
                                                <span>
                                                    <p class='summary'>${data.Plot}</p>
                                                </span>
                                            </div>
                                        </div>
                                 `
                                 render(movies)
                        })
                }
                
            })
        }
    } else if(e.target.id == 'Watchlist'){
        let parent = e.target.parentNode.parentNode.parentNode
        let subparent = e.target.parentNode.parentNode
        let subMoreParent = e.target.parentNode
        
        console.log(parent.children[0].src)

        const movieDetails = {
                                'Poster':`${parent.children[0].src}`,
                                'Title':`${subparent.children[0].children[0].textContent}`,
                                'imdbRating':`${subparent.children[0].children[1].textContent}`,
                                'Runtime':`${subMoreParent.children[0].textContent}`,
                                'Genre':`${subMoreParent.children[1].textContent}`,
                                'Plot':`${subparent.children[2].children[0].textContent}`,
                            }

                            console.log(movieDetails)

        
        
        array.push(movieDetails)

        console.log(array)
        localStorage.setItem('movie', JSON.stringify(array))
    }else if(e.target.id == 'Remove'){
        const movieIndex = Array.from(savedWatchlistEl.children).findIndex(movie => movie.contains(e.target.closest('.movie')));
        if (movieIndex !== -1) {
            array.splice(movieIndex, 1); // Remove the movie from the array
            localStorage.setItem('movie', JSON.stringify(array)); // Update localStorage
            renderLists(array); // Re-render the watchlist
        }
    }
})

function renderLists(movies){
    let listItems = ''
    for(let item of movies){
        listItems += `
                        <div class="movie">
                            <img src="${item.Poster}" alt="poster">
                            <div class="sub-section">
                                <span>
                                    <h1>${item.Title}</h1>
                                    <p>⭐ ${item.imdbRating}</p>
                                </span>
                                <div class="sub-two">
                                    <p>${item.Runtime}</p>
                                    <p>${item.Genre}</p>
                                    <button class="Watchlist" id="Remove">
                                        <i class="fa fa-minus-circle fa-lg"></i>
                                            Remove
                                    </button>
                                </div>
                                <span>
                                    <p class='summary'>${item.Plot}</p>
                                </span>
                            </div>
                        </div>
                     ` 
    }
    savedWatchlistEl.innerHTML = listItems
}

function renderSavedMovies(){
    array = MoviesFromLocalStorage
    renderLists(array)
    console.log(MoviesFromLocalStorage)

}