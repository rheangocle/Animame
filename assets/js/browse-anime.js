// global variable declaration
var browseAnimeCards = $('#browse-anime-cards');
var cardsReal;
var pageNumber = 0;
var showMore = $('#moreBtn');

//Displaying more anime onto page
var incrementPage = function () {
    pageNumber = pageNumber + 12;
    browseAnime();
    cardsReal = browseAnimeCards.children();
}

//event listener for the anime cards to swap to that anime's details page
showMore.on('click', incrementPage);

// setting up the initial call function
var browseAnime = function () {
    fetch(
        // fetching data from kitsu based on anime popularity, max 12 items per page, first page
        // maybe sort by alphabetical order? My hero academia seasons 1-3 show up as different anime
        'https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=12&page[offset]=' + pageNumber
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
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
                browseAnimeImage.attr('src', data.data[i].attributes.coverImage.original);

                // grabbing the anime id from the api and adding it to the existing anchor
                var browseID = data.data[i].id;
                anchor.attr('id', browseID);

                // appending the cover image and title to the anchors
                browseAnimeTitle.appendTo(anchor);
                browseAnimeImage.appendTo(anchor);
            }
            cardsReal = browseAnimeCards.children();
            cardsReal.on('click', swapPage);
        });
}

// setting up the page swap
var id;
function swapPage(event) {
    event.preventDefault();
    // targeting whichever button the user clicks on
    var btnClicked = $(this);
    console.log(this);
    // pulling the id for that button, which is also the anime id in the kitsu api
    id = btnClicked.attr('id');
    console.log(id);
    // setting that id in the local storage
    localStorage.setItem("id", id);
    document.location = './anime.html';
}

//Calling function to fetch information and append to page
browseAnime();
