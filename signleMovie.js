// document.getElementById("idSearchBtn").addEventListener("click", () => {
//   let tempId
//   if (
//     ((document.getElementById("idSearchInput").value / 1 != document.getElementById("idSearchInput").value / 1 ) && ((document.getElementById("idSearchInput").value)!= null))
//   ) {

//   } else {
//      tempId = document.getElementById("idSearchInput").value;
//   }
//   singleMovieFetcher(tempId);
//   console.log(23);
// });
window.onload(singleMovieFetcher(localStorage.getItem("wantedSingleMovie")));
function singleMovieFetcher(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04",
    },
  };

  fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById(
        "singleMovieImg"
      ).src = `https://image.tmdb.org/t/p/original//${data.poster_path}`;
      document.getElementById(
        "singleMovieImg"
      ).alt = `${data.original_title}'s movie cover`;
      document.querySelector("#movieName").innerText = `${data.original_title}`;
      document.querySelector(
        "#movieYear"
      ).innerText = `(${data.release_date.substring(0, 4)})`;
      document.getElementById("movieFacts").innerHTML = `
        <span class="movieFactsSpan" id="releaseDate"> ${data.release_date} </span> 
        <span class="movieFactsSpan" id="genres">•${genreMaker(data.genres)} </span> 
         <span class="movieFactsSpan" id="runTime"> ${runTimeCalc(data.runtime)} </span> 
        
        
        `;
      console.log();
    })
    .catch((err) => console.error(err));
}
function singleMovieRenderer() {}
function genreMaker(genreArray) {
  let text = "";
  genreArray.forEach((item) => {
    text += `<span>${item.name} </span>`;
  });
  return text;
}
function runTimeCalc(time) {
  if (time < 60) return `0h ${time}m`;
  let hour = (time - (time % 60)) / 60;
  let min = time % 60;

  return `${hour}h ${min}m`;
}
