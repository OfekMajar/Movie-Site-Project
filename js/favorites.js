const favoritesArray = JSON.parse(localStorage.getItem("favMovies")) || [];
let maxCards;
let currentFavPage=1;
function favMoviesFetcher(page = 1) {
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
  if (favoritesArray.length > 0) {
    let maxCards=page*20
    if (parseInt(favoritesArray.length/20)+1 ==page){
      maxCards=favoritesArray.length
    }

   
    if(favoritesArray.length<=20){
      document.getElementById("nextPage").disabled=true
      document.getElementById("nextPage").style.visibility="hidden"
    }

    for (let index = (page - 1) * 20; index < maxCards; index++) {
      fetch(
        `https://api.themoviedb.org/3/movie/${favoritesArray[index]}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          document.getElementById("cardBox").innerHTML += cardMaker(
            data.id,
            data.poster_path
          );

          document.querySelectorAll(".likesBoxBorder").forEach(item=>{
            item.addEventListener("click",()=>{
              console.log(item.id);
              let trueItemId = item.id.substring(item.id.indexOf("Id-") + 3);
              favoritesArray.splice(favoritesArray.indexOf(trueItemId), 1);
              localStorage.setItem("favMovies", JSON.stringify(favoritesArray));
            favMoviesFetcher(currentFavPage);
            })
          })
          document.querySelectorAll(".favCardImgs").forEach((item) => {
            item.addEventListener("click", () => {
              let singleMovieId = data.id;
              localStorage.setItem("wantedSingleMovie", singleMovieId);
              window.location.href = "./SingleMovie.html";
            });
          });
        })
        .catch((err) => console.error(err));
    }
  }
}
favMoviesFetcher();
document.getElementById("nextPage").addEventListener("click",()=>{
if((currentFavPage )>=parseInt(favoritesArray.length/20)){
  document.getElementById("nextPage").disabled=true
  document.getElementById("nextPage").style.visibility="hidden"
}
  currentFavPage++;
  document.getElementById("prevPage").disabled=false
  document.getElementById("prevPage").style.visibility="visible"
  favMoviesFetcher(currentFavPage);
})
document.getElementById("prevPage").addEventListener("click",()=>{
  document.getElementById("nextPage").disabled=false
  document.getElementById("nextPage").style.visibility="visible"
  if(currentFavPage-1<=1){
    document.getElementById("prevPage").disabled=true
  document.getElementById("prevPage").style.visibility="hidden"
  }
  currentFavPage--;
  favMoviesFetcher(currentFavPage);
})
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
               
                  <i class="fa-solid fa-thumbs-up"></i>
                  
                </button>
              </div>
            </div>
  `;
};

document.querySelectorAll(".likesBoxBorder").forEach(item=>{
  item.addEventListener("click",()=>{
let trueItemId=item.id
    favoritesArray.splice(favoritesArray.indexOf(trueItemId), 1);
    localStorage.setItem("favMovies", JSON.stringify(favoritesArray));
  favMoviesFetcher(currentFavPage);
  })
})