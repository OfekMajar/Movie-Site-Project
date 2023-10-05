const favoritesArray = JSON.parse(localStorage.getItem("favMovies")) || [];
function favMoviesFetcher(weekOrDay="week", page = 1) {
  if (page < 1) {
    page = 1;
  }
  cardBox.innerHTML = "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04",
    },
  };
if(favoritesArray.length>0){
    favoritesArray.forEach(item=>{ 
  fetch(`https://api.themoviedb.org/3/movie/${item}?language=en-US`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
        document.getElementById("cardBox").innerHTML += cardMaker(
            data.id,
            data.poster_path
        );
      
      document.querySelectorAll(".favCardImgs").forEach((item) => {
        item.addEventListener("click", () => {
          let singleMovieId = data.id;
          localStorage.setItem("wantedSingleMovie", singleMovieId);
          window.location.href = "./SingleMovie.html";
        });
      });
    })
    .catch((err) => console.error(err));
})
}
}
favMoviesFetcher();
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
               
                  <i class="fa-regular fa-thumbs-up"></i>
                  
                </button>
              </div>
            </div>
  `;
};
