const key = "6abd419c";
const btnSearch = document.getElementById("btn-search");
const overlay = document.getElementById("modal-overlay");
const inputMovieName = document.getElementById("movie-name");
const inputMovieYear = document.getElementById("movie-year");
const movieListContainer = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

let movieName;
let movieYear;

async function searchButtonClickHandler() {
    try {
        movieName = inputMovieName.value.split(" ").join("+");
        movieYear = inputMovieYear.value;
        
        let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
        
        console.log(url);
        
        const response = await fetch(url);
        const data = await response.json();

        console.log("data: ", data);

        if(data.Error) {
            throw new Error("Filme não encontrado");
        }

        createModal(data);        
        overlay.classList.add("open");

        document.getElementById("movie-name").value = "";
        document.getElementById("movie-year").value = "";
    } catch (error) {
        notie.alert({type: 'error', 
            text: error.message});
    }


    function movieNameParameterGenerator() {
        if(inputMovieName.value === "") {
            throw new Error("O nome do filme deve ser informado");
        }
        return inputMovieName.value.split(" ").join("+");
    }


    function movieYearParameterGenerator() {
        const year = parseInt(inputMovieYear.value);
        const date = new Date();
        const currentYear = date.getFullYear(); 

        if(inputMovieYear.value === "") {
            return "";
        } else if( (year >= 1900) && (year <= currentYear) ) {
                return `&y=${inputMovieYear.value}`;
        } else {
            throw new Error(`O ano informado deve ser entre 1900 e ${currentYear}`);
        }
    }
}


function addToList(movieObject) {
    movieList.push(movieObject);
}


function isMovieAlreadyOnList(id) {
    return movieList.find(function(movieObject) {
        return Boolean(movieObject.imdbID === id);
    })
}


function updateUI(movieObject) {
    movieListContainer.innerHTML += `
    <article id="movie-card-${movieObject.imdbID}">
        <img
            src="${movieObject.Poster}"
            alt="${movieObject.Title}"
        />
        <button id="btn-remove" onclick='{removeFilmFromList("${movieObject.imdbID}")}'> <i class="bi bi-trash"></i> Remover</button>
    </article>
    `;
}


function removeFilmFromList(id) {
    notie.confirm({
        text:"Deseja remover o filme da sua lista?",
        submitText: "Sim", // optional, default = 'Yes'
        cancelText: "Não", // optional, default = 'Cancel'
        position: "top", // optional, default = 'top', enum: ['top', 'bottom']
        submitCallback: function remove() {
            movieList = movieList.filter(movie => movie.imdbID !== id);
            document.getElementById(`movie-card-${id}`).remove();
            updateLocalStorage();
        },
       }, )
    
}


function updateLocalStorage() {
    localStorage.setItem("movieList", JSON.stringify(movieList));
}


for(movieInfo of movieList) {
    updateUI(movieInfo);
}


btnSearch.addEventListener("click", searchButtonClickHandler);
