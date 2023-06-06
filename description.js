const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const main = document.getElementById("main");

const similar = document.getElementById("similar");

const movie = localStorage.getItem("movie");
console.log(JSON.parse(movie));
const movieData = JSON.parse(movie);

const movieDesc = document.createElement("div");
movieDesc.classList.add("container");

let backdrop_path = movieData.backdrop_path;

let poster_path = movieData.poster_path;

movieDesc.innerHTML = `
    <img src="${IMG_PATH + backdrop_path}" >
    <div class="row mt-5"> 
    <div class="col-4">
    <img src="${IMG_PATH + poster_path}" >
    </div>
    <div class="col-8">
    <h3 class="text-white">${movieData.title}</h3> 
    <p class="text-white">${movieData.overview}</p>
    <p class="text-white">${movieData.original_language}</p>
    <p class="text-white">${movieData.vote_average}</p>
    <div class="serv" id="serv">

</div>
<div class="serv">
<button class="btn btn-success" id="buy">Buy</button>
</div>

    </div>
    </div>
`;
main.appendChild(movieDesc);

getMovies(API_URL);
async function getMovies(url) {
  console.log(url);
  const res = await fetch(url);
  console.log(res);
  const data = await res.json();
  console.log(data.results);

  showMovies(data.results);
}
function showMovies(movies) {
  similar.innerHTML = " ";

  const smallMovies = (movies = movies
    .sort(() => Math.random() - Math.random())
    .slice(0, 3));
  smallMovies.forEach((movie) => {
    const { title, overview, original_language, vote_average, poster_path } =
      movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("col-4");
    movieEl.innerHTML = `
                <div class="p-4">
                <div class="movies">
                  <img src="${IMG_PATH + poster_path}" >
                  
                  <div class="movie_content_box">
                    <h3>${title}</h3>
                    <p>${overview}</p>
                    <p>${original_language}</p>
                    
                    </div>
                    <span>
                      <p class="${getClassByVote(
                        vote_average
                      )}">${vote_average}</p>
                    </span>
                    </div>
                </div>
            `;
    similar.appendChild(movieEl);
    movieEl.addEventListener("click", () => {
      localStorage.setItem("movie", JSON.stringify(movie));
      window.location = "movie.html";
    });
  });
}

function getClassByVote(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

const seats = [
  {
    id: 1,
    price: 10,
  },
  {
    id: 2,
    price: 10,
  },
  {
    id: 3,
    price: 10,
  },
  {
    id: 4,
    price: 10,
  },
  {
    id: 5,
    price: 10,
  },
  {
    id: 6,
    price: 10,
  },
  {
    id: 7,
    price: 10,
  },
  {
    id: 8,
    price: 10,
  },
  {
    id: 9,
    price: 10,
  },
];
const selectedSeats = [];
const seatContainer = document.getElementById("serv");

seats.forEach((seat) => {
  const seatElement = document.createElement("div");
  seatElement.classList.add("flex-item");
  seatElement.innerHTML = `
      <p >Seat ${seat.id}</p>
      
    `;
  seatContainer.appendChild(seatElement);
  seatElement.addEventListener("click", (e) => {
    if (!selectedSeats.includes(seat)) {
      selectedSeats.push(seat);
      seatElement.classList.add("selected");
    } else {
      selectedSeats.splice(selectedSeats.indexOf(seat), 1);
      seatElement.classList.remove("selected");
    }
    console.log(selectedSeats);

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  });
});

document.getElementById("buy").addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    return 0
  } else {
    window.location = "checkout.html";
  }
});
