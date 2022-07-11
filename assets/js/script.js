var formEl = document.querySelector('#form');
var searchBtn = document.querySelector('.anime-search-btn');
var searchInput = document.querySelector('#query');

var formSubmitHandler = function (e) {
  e.preventDefault();

  var animeTitle = searchInput.value.trim();

  if (animeTitle !== null) {
    // localStorage.setItem(searchInput);
    document.location.replace('./anime.html');
  }
}


searchBtn.on('submit', formSubmitHandler);