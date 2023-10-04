const likesArray = [];
const favoritesArray = [];
let singleMovieId;
let weekOrDayVar;
//! Not nessecery
//TODO REMOVE LATER
function pageLoader(added = 0) {
  document.getElementById("paginationBox").innerHTML = `  <div id="pagination">
  <span id="backToStart" style="display:none">...</span>
  <span class="pageSelector" id="page1">${1 + added}</span>
  <span class="pageSelector" id="page2">${2 + added}</span>
  <span class="pageSelector" id="page3">${3 + added}</span>
  <span class="pageSelector" id="page4"> ${4 + added}</span>
  <span class="pageSelector" id="page5"> ${5 + added}</span
  ><span id="morePages">...</span>
</div>`;
}
pageLoader();
function popularMovieFetcher(weekOrDay, page = 1) {
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

  fetch(
    `https://api.themoviedb.org/3/trending/movie/${weekOrDay}?language=en-US&&page=${page}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cardBox = document.getElementById("cardBox");
      data.results.forEach((item) => {
        document.getElementById("cardBox").innerHTML += cardMaker(
          item.id,
          item.poster_path
        );
      });
      document.querySelectorAll(".favCardImgs").forEach((item) => {
        item.addEventListener("click", () => {
          singleMovieId = item.id;
          localStorage.setItem("wantedSingleMovie", singleMovieId);
          window.location.href = "./pages/SingleMovie.html";
        });
      });
    })
    .catch((err) => console.error(err));
}

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
             
                <i = class="fa-regular fa-thumbs-up"></i>
                
              </button>
            </div>
          </div>
`;
};
function updateDisplayMovies() {
  switch (true) {
    case document.getElementById("weeklyPopularMovies").checked: {
      weekOrDayVar = "week";
      popularMovieFetcher(weekOrDayVar);
      likesChecker();
      break;
    }

    case document.getElementById("dailyPopularMovies").checked:
      {
        weekOrDayVar = "day";
        popularMovieFetcher(weekOrDayVar);
        likesChecker();
      }

      break;
  }
}
document
  .getElementById("dailyPopularMovies")
  .addEventListener("change", updateDisplayMovies);
document
  .getElementById("weeklyPopularMovies")
  .addEventListener("change", updateDisplayMovies);
updateDisplayMovies();
//time out so site will load first
function likesChecker() {
  setTimeout(() => {
    const likeButtons = document.querySelectorAll(".likesBoxBorder");
    likeButtons.forEach((item, index) => {
      likesArray[index] = 1;
      item.addEventListener("click", () => {
        likesArray[index]++;
        let trueItemId = item.id.substring(item.id.indexOf("Id-") + 3);
        if (checkIfLiked(likesArray[index])) {
          item.lastElementChild.className = "fa-solid fa-thumbs-up";

          if (favoritesArray.includes(trueItemId)) {
          } else {
            favoritesArray.push(trueItemId);
          }
        } else {
          item.lastElementChild.className = "fa-regular fa-thumbs-up";
          if (favoritesArray.includes(trueItemId)) {
            favoritesArray.splice(favoritesArray.indexOf(trueItemId), 1);
          }
        }
        localStorage.setItem("favMovies", JSON.stringify(favoritesArray));
        console.log(favoritesArray);
      });
    });
  }, 700);
}
function pagination() {
  document.querySelectorAll(".pageSelector").forEach((item, index) => {
    item.addEventListener("click", () => {
      let selectedPage = item.innerText;
      let selectedPageIndex = index;
      if (selectedPage <= 2) {
        document.getElementById("backToStart").style.display = "none";
      } else {
        document.getElementById("backToStart").style.display = "inline";
      }
      if (selectedPage != 1 && selectedPageIndex > 0) {
        document.querySelectorAll(".pageSelector").forEach((item2) => {
          item2.innerText = +selectedPageIndex + +item2.innerText;
        });
      }
      if (selectedPageIndex == 0 && selectedPage > 1) {
        document.querySelectorAll(".pageSelector").forEach((item2) => {
          item2.innerText = +item2.innerText - selectedPageIndex - 1;
        });
      }
      popularMovieFetcher(weekOrDayVar, selectedPage);
    });
  });
  document.getElementById("backToStart").addEventListener("click", () => {
    document.querySelectorAll(".pageSelector").forEach((item, index) => {
      item.innerText = index + 1;
      document.getElementById("backToStart").style.display = "none";
    });
  });
  //TODO get back fixing the 3 dots maxing out at 1k problem
  document.getElementById("morePages").addEventListener("click", () => {
    document.querySelectorAll(".pageSelector").forEach((item, index) => {
      item.innerText = parseInt(item.innerText) + 10;
    });
  });
  // let maxPages = 46;
  // document.getElementById("morePages").addEventListener("click", () => {
  //   document.querySelectorAll(".pageSelector").forEach((item, index) => {
  //     if ( parseInt(document.querySelectorAll(".pageSelector")[4].innerText) + 10 ==maxPages ){
  //      for(let i=document.querySelectorAll(".pageSelector").length;i<0;i--){
  //       document.querySelectorAll(".pageSelector")[i].innerText=maxPages-i
  //      }
  //     }
  //     if (parseInt(document.querySelectorAll(".pageSelector")[4].innerText) + 10 <maxPages) {
  //       console.log(1);
  //       item.innerText = parseInt(item.innerText) + 10;
  //     }
  //   });
  // });
}
console.log(parseInt(document.querySelectorAll(".pageSelector")[3].innerText));
pagination();
document.getElementById("morePages").addEventListener("click", () => {});
const checkIfLiked = (i) => {
  if (i % 2 == 0) return true;
  return false;
};
