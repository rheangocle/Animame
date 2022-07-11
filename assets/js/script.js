var formEl = document.querySelector('#form');
var searchBtn = document.querySelector('#search-btn');
var searchInput = document.querySelector('#query');

var formSubmitHandler = function (event) {
  event.preventDefault();
  var animeTitle = searchInput.value.trim();
  console.log(animeTitle);
  //need to add anime search to function in anime js for fetch url
  animeTitle = animeTitle.replace(/ /g, "%20");
  // fetching data from the api, limiting to top 3 options during the search
  fetch(
    'https://kitsu.io/api/edge/anime?filter[text]=' + animeTitle + '&page[limit]=1&page[offset]=0'
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // var searchTitleEnglish = document.createElement('h3');
      // searchTitleEnglish.textContent = data.data[0].attributes.titles.en;
      // console.log(searchTitleEnglish);
      // formEl.append(searchTitleEnglish);
      // var searchUserRating = document.createElement('p');
      // searchUserRating.textContent = data.data[0].attributes.averageRating;
      // console.log(searchUserRating);
      // formEl.append(searchUserRating);
      // var searchPosterImage = document.createElement('a');
      // searchPosterImage.textContent = data.data[0].attributes.posterImage.original;
      // console.log(searchPosterImage);
      // formEl.append(searchPosterImage);
      id = data.data[0].id;
      console.log(id);
      localStorage.setItem("id", id);
      document.location = "./anime.html";
    });
}

searchBtn.addEventListener('click', formSubmitHandler);