// global variable declaration
var englishTitleField = document.getElementById('title-english');
var japaneseTitleField = document.getElementById('title-jp');
var ageRatingField = document.getElementById('age-rating');
var userRatingField = document.getElementById('user-rating');
var descriptionField = document.getElementById('description');
var posterImageField = document.getElementById('poster');
var idField = document.getElementById("anime-id");
var pageTitleField = document.getElementById("anime-title");

// anime search feature
// searchField is a dummy variable. assign the real one later
// searchField.addEventListener("keydown", searchAnime);
var searchAnime = function () {
    // user input from a search field
    var search = "jujutsu kaisen";
    // replacing spaces with %20 for the api call
    var title = search.replace(/ /g, "%20");
    // fetching data from the api, limiting to top 3 options during the search
    fetch(
        'https://kitsu.io/api/edge/anime?filter[text]=' + title + '&page[limit]=3&page[offset]=0'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // for (i = 0; i < 3; i++) {
            //     var searchTitleEnglish = document.createElement('h3');
            //     searchTitleEnglish.textContent = data.data[i].attributes.titles.en;
            //     console.log(searchTitleEnglish);
            //     searchContainer.append(searchTitleEnglish);
            //     var searchUserRating = document.createElement('p');
            //     searchUserRating.textContent = data.data[i].attributes.averageRating;
            //     console.log(searchUserRating);
            //     searchContainer.append(searchUserRating);
            //     var searchPosterImage = document.createElement('a');
            //     searchPosterImage.textContent = data.data[i].attributes.posterImage.original;
            //     console.log(searchPosterImage);
            // }
            idField.textContent = data.data[0].id;
            populatePage();
        });
}
searchAnime();

// animeButton is a dummy variable. assign the real one later
// animeButton.addEventListener("click", changePages);

var populatePage = function () {
    // fetching data from the api
    id = localStorage.getItem("id");
    console.log(id);
    fetch(
        'https://kitsu.io/api/edge/anime/' + id
    )
        .then(function (response) {
            return response.json();
        })
        // putting anime info onto the page
        .then(function (data) {
            console.log(data);
            var titleEnglish = data.data.attributes.titles.en;
            // placeholder variables used, make sure to define them based on anime.html
            // console.log(titleEnglish);
            var titleJP = data.data.attributes.titles.en_jp;
            if (titleEnglish == undefined) {
                japaneseTitleField.textContent = "Japanese Title: " + titleJP;
                englishTitleField.textContent = "English Title: " + titleJP;
                pageTitleField.textContent = "Animame | " + titleJP;
            } else if (titleJP == undefined) {
                japaneseTitleField.textContent = "Japanese Title: " + titleEnglish;
                englishTitleField.textContent = "English Title: " + titleEnglish;
                pageTitleField.textContent = "Animame | " + titleEnglish;
            } else {
                japaneseTitleField.textContent = "Japanese Title: " + titleJP;
                englishTitleField.textContent = "English Title: " + titleEnglish;
                pageTitleField.textContent = "Animame | " + titleEnglish;
            }
            // console.log(titleJP);
            var ageRating = data.data.attributes.ageRating;
            var ageRatingGuide = data.data.attributes.ageRatingGuide;
            if (ageRatingGuide == null) {
                ageRatingField.textContent = "Age Rating: " + ageRating;
            } else {
                ageRatingField.textContent = "Age Rating: " + ageRating + " - " + ageRatingGuide;
            }
            // console.log(ageRating);
            var userRating = data.data.attributes.averageRating;
            userRatingField.textContent = "Average User Rating: " + userRating;
            // console.log(userRating);
            var description = data.data.attributes.description;
            descriptionField.textContent = description;
            // console.log(description);
            var posterImage = data.data.attributes.posterImage.original;
            posterImageField.src = posterImage;
            // console.log(posterImage);
            var coverImage = data.data.attributes.coverImage.original;
            // console.log(coverImage);
        });
}

