// global variable declaration
var browseAnimeCards = $('#browse-anime-cards');
var cardsReal;
var pageNumber = 0;
var showMore = $('#moreBtn');

// Displaying more anime onto page
var incrementPage = function () {
    // forcing the api to search for the next 12 anime
    pageNumber = pageNumber + 12;
    // calling the search function
    browseAnime();
    // refreshing the cards variable again
    cardsReal = browseAnimeCards.children();
}

//event listener to display more info
showMore.on('click', incrementPage);

// setting up the initial call function
var browseAnime = function () {
    fetch(
        // fetching data from kitsu based on anime popularity, max 12 items per page, first page
        'https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=12&page[offset]=' + pageNumber
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // looping through all 12 results
            for (i = 0; i < 12; i++) {
                // creating the anchor element to contain all anime info on the page
                var anchor = $('<a class="column anime-browse-container"></a>')
                anchor.appendTo(browseAnimeCards);

                // creating the title element and putting text in it
                var browseAnimeTitle = $('<h2 class="title is-6"></h2>');
                var englishTitle = data.data[i].attributes.titles.en;
                var japaneseTitle = data.data[i].attributes.titles.en_jp;

                if (englishTitle == undefined) {
                    browseAnimeTitle.text(japaneseTitle);
                } else {
                    browseAnimeTitle.text(englishTitle);
                }

                // creating the image element and putting a src in it
                var browseAnimeImage = $('<img class="anime-browse-img is-12-mobile is-3-desktop"></img>');
                if (data.data[i].attributes.coverImage == null) {
                    browseAnimeImage.attr('src', data.data[i].attributes.posterImage.original);
                }
                else {
                    browseAnimeImage.attr('src', data.data[i].attributes.coverImage.original);
                }

                // grabbing the anime id from the api and adding it to the existing anchor
                var browseID = data.data[i].id;
                anchor.attr('id', browseID);

                // appending the cover image and title to the anchors
                browseAnimeTitle.appendTo(anchor);
                browseAnimeImage.appendTo(anchor);
            }
            // refreshing the cards variable with the newly created anchor children
            cardsReal = browseAnimeCards.children();
            // adding event listener to change pages to each anime's details page
            cardsReal.on('click', swapPage);
        });
}

// setting up the page swap
var id;
function swapPage(event) {
    event.preventDefault();
    // targeting whichever button the user clicks on
    var btnClicked = $(this);
    // pulling the id for that button, which is also the anime id in the kitsu api
    id = btnClicked.attr('id');
    // setting that id in the local storage
    localStorage.setItem("id", id);
    document.location = './anime.html';
}

// calling function to fetch information and append to page
browseAnime();
