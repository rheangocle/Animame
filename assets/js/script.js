var formEl = document.querySelector('#form');
var searchBtn = document.querySelector('.anime-search-btn');
var searchInput = document.querySelector('#query');

var formSubmitHandler = function (event) {

  event.preventDefault();
  var animeTitle = searchInput.value.trim();
  //need to add anime search to function in anime js for fetch url
  searchAnime(animeTitle);
  document.location.href = "./anime.html";
}


searchBtn.addEventListener('click', formSubmitHandler);