var recipeLink = $("#recipe-img-link");

console.log(recipeLink);
var cardClickHandler = function (e) {
  var recipeIdAttr = e.target.attr('data-id');
  console.log(recipeIdAttr);
  localStorage.setItem("recipe-id", recipeIdAttr);
  if (recipeIdAttr) {
    getRecipe(recipeIdAttr);
  }
  var redirectUrl = './recipe.html';
  document.location = redirectUrl;
}

var cookInstructionsEl = $('#cooking-intructions');
var recipeImageCardEl = $('.img-recipe-card');
var ingredientsListEl = $('.ingredients-list')

function getRecipe() {
  var recipeId = localStorage.getItem("recipe-id");
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '38e4e688e1msh156d88e5c5adfc2p101e84jsn7d1ccb27e81d',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  // fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, options)
  fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${recipeId}`, options)
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
    <div class="title is-6 ">${info.sections[i].name}
    </div>`
        ingredientsListEl.append(ingredientsSection);
        for (var j = 0; j < info.sections[i].components.length; j++) {
          var ingredientsItems = `
        <li>${info.sections[i].components[j].raw_text}</li>`
          ingredientsListEl.append(ingredientsItems);
        }
      }

      var recipeImage = `
      <div class="card-image is-6-desktop">
        <img class="recipe-image" src="${info.thumbnail_url}" alt="image of ${info.name}">
      </div > `
      recipeImageCardEl.append(recipeImage);
    })

    .catch(err => console.error(err));
}

getRecipe()

recipeLink.click(cardClickHandler);
