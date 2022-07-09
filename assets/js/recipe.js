//Tasty API
//this is for the search input to be plugged into the url
var qValue

//object of arrays ==> should this be converted into individual arrays for each show?
var foodArr = {
  spyFamily: ['butter cookies', 'strawberry shortcake', 'omurice', 'marinade', 'nut pancake', 'parfait', 'bloody orange juice', 'ice cocoa', 'stew'],
  demonSlayer: ['tempura', 'bento box', 'onigiri', 'udon', 'gyunabe', 'miso', 'kabayaki', 'sake', 'daikon', 'konpeito'],
  naruto: ['ramen', 'dango', 'yakiniku', 'curry', 'fish on a stick', 'onigiri', 'bento', 'fried rice'],
  dragonBall: ['beans', 'fruit', 'egg', 'pudding', 'takoyaki'],
  pokemon: ['boiled egg', 'coconut milk', 'curry', 'instant noodles', 'lava cookie', 'rice balls', 'stew', 'poffins', 'muffins', 'mini cake', 'masaladas', 'ketchup'],
  onePiece: ['boiled chicken', 'seafood pasta', 'lobster', 'sashimi', 'seafood risotto', 'takoyaki', 'fried rice', 'seafood fried rice', 'roz bel laban', 'bread', 'lasagna', 'cotton candy', 'chocolate', 'ice cream', 'donuts', 'manju', 'tarts', 'croquembouche', 'biscuits', 'chiffon cake', 'spongecake', 'mochi', 'shiruko', 'semla', 'dango'],
  attackOnTitan: ['omelette', 'hamburger steak', 'baked potato', 'chicken okonomiyaki', 'strawberry bread', 'stew'],
  jujutsuKaisen: ['crepe', 'nabe', 'rice ball', 'soy beans', 'sandwich', 'chicken meatballs'],
  myHero: ['tart', 'truffles', 'fried ice cream', 'fries', 'katsudon', 'macarons', 'spicy kaarage', 'mapo tofu'],
  fairyTail: ['gyoza', 'tiny sausage', 'tempura', 'maki', 'stir fried veggies', 'fish', 'fish pizza', 'bento'],
  jojo: ['caprese salad', 'lamb chops', 'pudding', 'katsu', 'squid ink spaghetti', 'vento aureo'],
  onePunchMan: ['egg over rice', 'omurice', 'hot pot', 'soup'],
  fruitsBasket: ['natto', 'soumen', 'soba', 'onigiri', 'sukiyaki', 'food spread'],
  blackClover: ['potatoes', 'meatloaf', 'sandwich'],
  hunterXHunter: ['hot dog', 'pizza', 'fried chicken', 'donuts', 'fries', 'pie', 'burgers', 'cream stew'],
  foodWars: ['roast pork', 'risotto', 'gyoza', 'ramen', 'tempura don', 'steak don', 'gohan', 'kaarage', 'eggs benedict', 'fried rice', 'omelette', 'katsu curry', 'katsudon', 'okiakage', 'frittata', 'bento', 'pork curry', 'bourguignon', 'omurice', 'pineapple rice', 'shoyu ramen'],
}

/*
AOT: 7442 attack-on-titan
onepunchman: 10740
*/

var recipeCardEl = $('.recipe-card');
//jojo: 7158

//Fetching from Tasty
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '38e4e688e1msh156d88e5c5adfc2p101e84jsn7d1ccb27e81d',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }
};

//q=food name
for (var i = 0; i < foodArr.spyFamily.length; i++) {
  fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=2&q=${foodArr.jujutsuKaisen[i]}`, options)

    // fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${foodArr.spyFamily[1]}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //console.log(data.results[0].name);
      // console.log(data.results[2].instructions);
      // console.log(data.results[2].nutrition);
      //console.log(data.results[0].thumbnail_url);
      // console.log(data.results[2].original_video_url);

      for (var i = 0; i < data.results.length; i++) {
        var recipeCard = `
                <div class="card column is-2-widescreen is-2-desktop is-8-mobile is-3-tablet recipe-card">
                    <div class="card-image">
                        <figure class="image">
                        <a id='recipe-img-link'><img data-id="${data.results[i].id}" src="${data.results[i].thumbnail_url}" alt="Placeholder image">
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
        recipeCardEl.append(recipeCard);
      }
    })
    .catch(err => console.error(err));
}

// var recipeLink = $("#recipe-img-link");
// var cardClickHandler = function (e) {
//   var recipeIdAttr = e.target.attr('data-id');

//   if (recipeIdAttr) {
//     getRecipe(recipeIdAttr);
//   }
// }

var cookInstructionsEl = $('#cooking-intructions');
var recipeImageCardEl = $('.img-recipe-card');
var ingredientsListEl = $('.ingredients-list')

function getRecipe() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '38e4e688e1msh156d88e5c5adfc2p101e84jsn7d1ccb27e81d',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  // fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, options)
  fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=8190`, options)
    .then(response => response.json())
    .then(info => {
      console.log(info);

      for (var i = 0; i < info.instructions.length; i++) {

        var prepStep =
          `<li class='recipe-list-items'> ${info.instructions[i].position}. ${info.instructions[i].display_text} </li>`;
        cookInstructionsEl.append(prepStep);
      }

      for (var i = 0; i < info.sections.length; i++) {
        var ingredientsSection = `
    <div class="title is-6">${info.sections[i].name}
    </div>`
        ingredientsListEl.append(ingredientsSection);
        for (var j = 0; j < info.sections[i].components.length; j++) {
          var ingredientsItems = `
        <li>${info.sections[i].components[j].raw_text}</li>`
          ingredientsListEl.append(ingredientsItems);
        }
      }

      var recipeImage = `
      <div class="card-image">
        <img class="recipe-image" src="${info.thumbnail_url}" alt="image of ${info.name}">
      </div > `
      recipeImageCardEl.append(recipeImage);
    })

    .catch(err => console.error(err));
}

getRecipe()
// recipeLink.click(cardClickHandler)
