// anime search feature

// user input from a search field
var search = "jojo's bizarre adventure";
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
        var titleEnglish = data.data[0].attributes.titles.en;
        console.log(titleEnglish);
        var userRating = data.data[0].attributes.averageRating;
        console.log(userRating);
        var posterImage = data.data[0].attributes.posterImage.original;
        console.log(posterImage);
    });



// putting anime info onto the page

// TODO grab the id based on what the user clicks on during the search
var id = 7158;
// fetching data from the api
fetch(
    'https://kitsu.io/api/edge/anime/' + id
)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var titleEnglish = data.data.attributes.titles.en;
        console.log(titleEnglish);
        var titleJP = data.data.attributes.titles.en_jp;
        console.log(titleJP);
        var ageRating = data.data.attributes.ageRating + ' - ' + data.data.attributes.ageRatingGuide;
        console.log(ageRating);
        var userRating = data.data.attributes.averageRating;
        console.log(userRating);
        var description = data.data.attributes.description;
        console.log(description);
        var posterImage = data.data.attributes.posterImage.original;
        console.log(posterImage);
        var coverImage = data.data.attributes.coverImage.original;
        console.log(coverImage);
    });