const background = document.getElementById("modal-background");
const modalContainer = document.getElementById("modal-container");

let currentMovie = {};

function backgroundClickHandler() {
    overlay.classList.remove("open");
}

function addCurrentMovie() {
    console.log(isMovieAlreadyOnList(currentMovie.imdbID));
    console.log(currentMovie.imdbID);
    if(isMovieAlreadyOnList(currentMovie.imdbID)) {
        notie.alert({type: 'error', text: 'O filme já pertence a lista'});
        backgroundClickHandler();
    } else {
        addToList(currentMovie);
        updateUI(currentMovie);
        updateLocalStorage();
        backgroundClickHandler();
    }
    console.log(movieList);
}

function createModal(data) {
    currentMovie = data;

    modalContainer.innerHTML = `
    <h2 id="movie-title">${data.Title} - ${data.Year}</h2>
    <section id="modal-body">
        <img
            id="movie-poster"
            src="${data.Poster}"
            alt="Poster do Filme"
        />
        <div id="movie-info">
            <div id="movie-plot">
                <h4>
                    ${data.Plot}
                </h4>
            </div>
            <div id="movie-cast">
                <h4>Elenco:</h4>
                <h5>${data.Actors}</h5>
            </div>
            <div id="movie-genre">
                <h4>Gênero:</h4>
                <h5>${data.Genre}</h5>
            </div>
        </div>
    </section>
    <section id="modal-footer">
        <button id="add-to-list" onclick='{addCurrentMovie()}'>Adicionar à lista</button>
    </section>
    `
}





// function updateUI(movieList) {
//     movieListContainer.innerHTML == "";
//     for(let i = 0; i < movieList.lenght; i++) {
//         movieListContainer.innerHTML += `
//             <article>
// 			    <img
// 					src="${movieList[i].Poster}"
// 					alt="${movieList[i].Title}"
// 				/>
// 				<button id="btn-remove"> <i class="bi bi-trash"></i> Remover</button>
// 			</article>
//         `;
//     }
// }


background.addEventListener("click", backgroundClickHandler);