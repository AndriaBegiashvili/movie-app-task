const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const main = document.getElementById("main");

const movie = JSON.parse(localStorage.getItem("movie"));
let backdrop_path = movie.backdrop_path;

let poster_path = movie.poster_path;

const selectedSeats = localStorage.getItem("selectedSeats");
const seats = JSON.parse(selectedSeats);
console.log(seats);
const price = seats.length * 10;

const movieDesc = document.createElement("div");
movieDesc.classList.add("container");

movieDesc.innerHTML =  `
<div class="row mt-5">
<div class="col-4">
<img src="${IMG_PATH + poster_path}" >
</div>
<div class="col-8">
    <h3 class="text-white">total price: ${price}$</h3> 
    ${seats.map(seat => `<p class="text-white">seats: ${seat.id}</p>`).join('')}
    <a href="index.html"><button style="width: auto" class="btn btn-primary">Checkout</button>  </a>
    </div>
</div>
  `;

main.appendChild(movieDesc)

