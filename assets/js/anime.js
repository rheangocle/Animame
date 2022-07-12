// global variable declaration
var englishTitleField = document.getElementById('title-english');
var japaneseTitleField = document.getElementById('title-jp');
var ageRatingField = document.getElementById('age-rating');
var userRatingField = document.getElementById('user-rating');
var descriptionField = document.getElementById('description');
var posterImageField = document.getElementById('poster');
var idField = document.getElementById("anime-id");
var pageTitleField = document.getElementById("anime-title");
var recipeCardEl = $('.recipe-card');
var recipeLink;

//Display anime information onto page
var populatePage = function () {
    // fetching data from the api
    var id = localStorage.getItem("id");
    getFoodList(id);
    fetch(
        'https://kitsu.io/api/edge/anime/' + id
    )
        .then(function (response) {
            return response.json();
        })
        // putting anime info onto the page
        .then(function (data) {
            // setting anime attributes to the page

            // setting the english title
            var titleEnglish = data.data.attributes.titles.en;

            // setting the japanese title
            var titleJP = data.data.attributes.titles.en_jp;

            // checking if either title is not listed and putting info on the page based on which titles exist
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

            // setting the age rating and checking if certain fields are empty before putting info on the page
            var ageRating = data.data.attributes.ageRating;
            var ageRatingGuide = data.data.attributes.ageRatingGuide;
            if (ageRatingGuide == null) {
                ageRatingField.textContent = "Age Rating: " + ageRating;
            } else {
                ageRatingField.textContent = "Age Rating: " + ageRating + " - " + ageRatingGuide;
            }

            // setting the average user rating and putting it on the page
            var userRating = data.data.attributes.averageRating;
            userRatingField.textContent = "Average User Rating: " + userRating;

            // setting the description and poster image and putting them on the page
            var description = data.data.attributes.description;
            descriptionField.textContent = description;
            var posterImage = data.data.attributes.posterImage.original;
            var coverImage = data.data.attributes.coverImage.original;
            if (posterImage == null) {
                posterImageField.src = coverImage;
            } else {
                posterImageField.src = posterImage;
            }
        });
}

// Food in different anime
var foodObj = {
    11: ['ramen', 'dango', 'yakiniku', 'curry', 'fish on a stick', 'onigiri', 'bento', 'fried rice'],
    12: ['boiled chicken', 'seafood pasta', 'lobster', 'sashimi', 'seafood risotto', 'takoyaki', 'fried rice', 'seafood fried rice', 'roz bel laban', 'bread', 'lasagna', 'cotton candy', 'chocolate', 'ice cream', 'donuts', 'manju', 'tarts', 'croquembouche', 'biscuits', 'chiffon cake', 'spongecake', 'mochi', 'shiruko', 'semla', 'dango'],
    99: ['natto', 'soumen', 'soba', 'onigiri', 'sukiyaki', 'food spread'],
    176: ['cookie', 'buscuit', 'red bean bun', 'rice ball', 'shrimp tempura', 'rice',],
    199: ['beans', 'fruit', 'egg', 'pudding', 'takoyaki'],
    1376: ['cake', 'cookies', 'dessert', 'food', 'pie', 'pies', 'sweet', 'treat', 'ice cream', 'apple'],
    4676: ['gyoza', 'tiny sausage', 'tempura', 'maki', 'stir fried veggies', 'fish', 'fish pizza', 'bento'],
    6448: ['hot dog', 'pizza', 'fried chicken', 'donuts', 'fries', 'pie', 'burgers', 'cream stew'],
    6452: ['boiled egg', 'coconut milk', 'curry', 'instant noodles', 'lava cookie', 'rice balls', 'stew', 'poffins', 'muffins', 'mini cake', 'masaladas', 'ketchup'],
    7158: ['caprese salad', 'lamb chops', 'pudding', 'katsu', 'squid ink spaghetti', 'vento aureo'],
    7442: ['omelette', 'hamburger steak', 'baked potato', 'chicken okonomiyaki', 'strawberry bread', 'stew'],
    8699: ['meat pie', 'mushroom', 'pudding', 'grilled cheese', 'bison', 'apple pie', 'cider'],
    9967: ['roast pork', 'risotto', 'gyoza', 'ramen', 'tempura don', 'steak don', 'gohan', 'kaarage', 'eggs benedict', 'fried rice', 'omelette', 'katsu curry', 'katsudon', 'okiakage', 'frittata', 'bento', 'pork curry', 'bourguignon', 'omurice', 'pineapple rice', 'shoyu ramen'],
    10740: ['egg over rice', 'omurice', 'hot pot', 'soup'],
    11469: ['tart', 'truffles', 'fried ice cream', 'fries', 'katsudon', 'macarons', 'spicy kaarage', 'mapo tofu'],
    11614: ['pancakes', 'waffles', 'cake', 'katsu', 'bento', 'pizza', 'ramen', 'strawberry shortcake', 'sandwhich'],
    12268: ['tart', 'truffles', 'fried ice cream', 'fries', 'katsudon', 'macarons', 'spicy kaarage', 'mapo tofu'],
    13209: ['potatoes', 'meatloaf', 'sandwich'],
    13881: ['tart', 'truffles', 'fried ice cream', 'fries', 'katsudon', 'macarons', 'spicy kaarage', 'mapo tofu'],
    41370: ['tempura', 'bento box', 'onigiri', 'udon', 'gyunabe', 'miso', 'kabayaki', 'sake', 'daikon', 'konpeito'],
    42765: ['crepe', 'nabe', 'rice ball', 'soy beans', 'sandwich', 'chicken meatballs'],
    45398: ['butter cookies', 'strawberry shortcake', 'omurice', 'marinade', 'nut pancake', 'parfait', 'bloody orange juice', 'ice cocoa', 'stew'],
}

// Fetching from Tasty API
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '38e4e688e1msh156d88e5c5adfc2p101e84jsn7d1ccb27e81d',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

// Getting recipe card images for anime
function getFoodList(anime) {
    // checking if there are recipes in the food object for this anime
    if (!foodObj.hasOwnProperty(anime)) {
        $('.recipe-header').text('🍙 Sorry, no recipes for this anime. 🍙');
        return;
    } else {
        $('.recipe-header').text('Recipes: ');
    }
    // looping through all recipes for that anime in the food object
    for (var i = 0; i < foodObj[anime].length; i++) {
        fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&q=${foodObj[anime][i]}`, options)

            .then(response => response.json())
            .then(data => {
                // Displaying recipe cards on page
                for (var i = 0; i < data.results.length; i++) {
                    var recipeCard = `
                  <div class="card column is-2-widescreen is-2-desktop is-8-mobile is-3-tablet recipe-card-cont" data-id="${data.results[i].id}">
                      <div class="card-image">
                          <figure class="image">
                          <a><img id="recipe-img-link" src="${data.results[i].thumbnail_url}" alt="Placeholder image">
                          </a>
                          </figure>
                          <div class="card-header-title">
                          <div class="card-title">
                              <a><p class="title is-6">${data.results[i].name}</p>
                              </a>
                          </div>
                          </div>
                      </div>
                  </div>`
                    // appending all cards to the anime page
                    recipeCardEl.append(recipeCard);
                }
                // Calling function to open recipe information page
                recipeLink = recipeCardEl.children();
                recipeLink.on('click', cardClickHandler);
            })
            .catch(err => console.error(err));
    }
}

// Saving id of recipe to local storage when user clicks recipe card
var cardClickHandler = function () {
    var btnClicked = $(this);
    // setting the recipe id from the button the user clicked on
    var recipeIdAttr = btnClicked.attr('data-id');
    // putting the recipe id in local storage for future fetching
    localStorage.setItem("recipe-id", recipeIdAttr);
    document.location = './recipe.html';
}

// Generating food recipe cards
getFoodList();
// generating anime info and putting it on the page
populatePage();
