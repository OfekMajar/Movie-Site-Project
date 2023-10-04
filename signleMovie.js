window.onload = singleMovieFetcher(localStorage.getItem("wantedSingleMovie"));
function singleMovieFetcher(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04",
    },
  };
  //^Movie credits for actor exc section
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let directors = data.crew.filter(({ job }) => job === "Director");
      console.log(directors);
      let = directorsText = "";
      directors.forEach((item) => {
        directorsText += `<li class="director"><span class="directorName">${item.name}</span> <span>${item.job}</span></li>`;
      });
      document.getElementById("directorList").innerHTML = directorsText;
      let currentActor = 0;
      actorMaker(data.cast, currentActor);

      document
        .getElementById("moveActorsRight")
        .addEventListener("click", () => {
          if (currentActor + 4 > data.cast.length) {
            currentActor = data.cast.length - 4;
            document.getElementById("moveActorsRight").disabled = true;
            document.getElementById("moveActorsRight").style.visibility =
              "hidden";
          } else {
            currentActor += 4;
          }
          actorMaker(data.cast, currentActor);
        });
      document
        .getElementById("moveActorsLeft")
        .addEventListener("click", () => {
          document.getElementById("moveActorsRight").style.visibility =
            "visible";
          document.getElementById("moveActorsRight").disabled = false;

          if (currentActor - 4 < 0) {
            currentActor = 0;
          } else {
            currentActor -= 4;
          }
          actorMaker(data.cast, currentActor);
        });
    })
    .catch((err) => console.error(err));
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
        <span class="movieFactsSpan" id="releaseDate"> ${
          data.release_date
        } </span> 
        <span class="movieFactsSpan" id="genres">•${genreMaker(
          data.genres
        )} </span> 
         <span class="movieFactsSpan" id="runTime"> ${runTimeCalc(
           data.runtime
         )} </span> `;
      document.getElementById("tagLine").innerText = `${data.tagline}`;
      document.getElementById("overViewTextBox").innerText = `${data.overview}`;
      document.getElementById(
        "banner"
      ).style.backgroundImage = `url(https://image.tmdb.org/t/p/original//${data.backdrop_path})`;
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
function actorMaker(actor, fromWhatActor = 0) {
  let actorCard = "";
  let btnLeftDisplayed = "hidden";
  // if(fromWhatActor>0)btnLeftDisplayed="inline-block"
  // document.getElementById("moveActorsLeft").style.display=btnLeftDisplayed
  if (fromWhatActor > 0) btnLeftDisplayed = "visible";
  document.getElementById("moveActorsLeft").style.visibility = btnLeftDisplayed;
  for (let i = fromWhatActor; i < fromWhatActor + 4; i++) {
    //https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg
    let profilePicExists = actor[i].profile_path == null;
    //
    actorCard += ` <li class="actorCard">
  <img class="actorImg" src="${
    profilePicExists
      ? "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
      : `https://image.tmdb.org/t/p/original//${actor[i].profile_path}`
  }" alt="no image" />
  <p class="actorName">
    <span class="actorRealName"> ${actor[i].original_name}</span>
    <span class="actorCharName">${actor[i].character}</span>
  </p>
</li>`;
  }

  document.getElementById("actorsList").innerHTML = actorCard;
}
