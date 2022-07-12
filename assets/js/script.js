//Declaring variables
var formEl = document.querySelector('#form');
var searchBtn = document.querySelector('#search-btn');
var searchInput = document.querySelector('#query');

//Event listener function for search input
var formSubmitHandler = function (event) {
  event.preventDefault();
  var animeTitle = searchInput.value.trim();

  //converting anime search input to function in anime js for fetch url
  animeTitle = animeTitle.replace(/ /g, "%20");
  localStorage.setItem("animeSearch", animeTitle);
  //Redirecting to anime html
  document.location = "./search-anime.html";
}

//Event listener when user clicks search
searchBtn.addEventListener('click', formSubmitHandler);
