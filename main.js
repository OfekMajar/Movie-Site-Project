const likesArray = [];
const favoritesArray = [];
let singleMovieId;
function popularMovieFetcher() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.results[0].poster_path);
      cardBox = document.getElementById("cardBox");
      data.results.forEach((item, index) => {
        document.getElementById("cardBox").innerHTML += cardMaker(
          item.id,
          item.poster_path
        );
      });
      document.querySelectorAll(".favCardImgs").forEach((item) => {
        item.addEventListener("click", () => {
          singleMovieId = item.id;
          console.log(singleMovieId);
          localStorage.setItem("wantedSingleMovie", singleMovieId);
          window.location.href = "./pages/SingleMovie.html";
        });
      });
    })
    .catch((err) => console.error(err));
}
popularMovieFetcher();

const cardMaker = (id, posterUrl) => {
  return `
<div class="card">
            <div class="imgBox">
              <img class="favCardImgs" id="${id}"
                src="https://image.tmdb.org/t/p/original/${posterUrl}"
                alt="movie-poster" />
            </div>
            <div class="likesBox">
              <button id="likesBoxId-${id}" class="likesBoxBorder">
                <p>100</p>
                <span>|</span>
                <i = class="fa-regular fa-thumbs-up"></i>
                
              </button>
            </div>
          </div>
`;
};

//time out so site will load first
setTimeout(() => {
  const likeButtons = document.querySelectorAll(".likesBoxBorder");
  likeButtons.forEach((item, index) => {
    likesArray[index] = 1;
    item.addEventListener("click", () => {
      likesArray[index]++;
      let trueItemId = item.id.substring(item.id.indexOf("Id-") + 3);
      if (checkIfLiked(likesArray[index])) {
        item.lastElementChild.className = "fa-solid fa-thumbs-up";
        item.firstElementChild.textContent =
          parseInt(item.firstElementChild.textContent) + 1;
        if (favoritesArray.includes(trueItemId)) {
        } else {
          favoritesArray.push(trueItemId);
        }
      } else {
        item.lastElementChild.className = "fa-regular fa-thumbs-up";
        item.firstElementChild.textContent =
          parseInt(item.firstElementChild.textContent) - 1;
        if (favoritesArray.includes(trueItemId)) {
          favoritesArray.splice(favoritesArray.indexOf(trueItemId), 1);
        }
      }
      localStorage.setItem("favMovies", JSON.stringify(favoritesArray));
      console.log(favoritesArray);
    });
  });
}, 2000);
const checkIfLiked = (i) => {
  if (i % 2 == 0) return true;
  return false;
};
