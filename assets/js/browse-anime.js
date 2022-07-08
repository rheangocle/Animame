// global variable declaration
var browseAnimeCards = $('#browse-anime-cards');
console.log(browseAnimeCards.children()[0]);

// setting up the initial call function
var browseAnime = function () {
    fetch(
        // fetching data from kitsu based on anime popularity, max 12 items per page, first page
        'https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=12&page[offset]=0'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // looping through all 12 results
            for (i = 0; i < 12; i++) {
                // creating the title element and putting text in it
                var browseAnimeTitle = $('<h2></h2>');
                var englishTitle = data.data[i].attributes.titles.en;
                var japaneseTitle = data.data[i].attributes.titles.en_jp;
                if (englishTitle == undefined) {
                    browseAnimeTitle.text(japaneseTitle);
                } else {
                    browseAnimeTitle.text(englishTitle);
                }
                console.log(browseAnimeTitle);
                // creating the image element and putting a src in it
                var browseAnimeImage = $('<img></img>');
                browseAnimeImage.attr('src', data.data[i].attributes.coverImage.original);
                console.log(browseAnimeImage);
                // grabbing the anime id from the api and adding it to the existing anchor
                var browseID = data.data[i].id;
                var anchor = browseAnimeCards.children()[i];
                console.log(anchor);
                anchor.setAttribute('id', browseID);
                // appending the cover image and title to the anchors
                browseAnimeTitle.appendTo(anchor);
                browseAnimeImage.appendTo(anchor);
            }
        });
}

browseAnime();