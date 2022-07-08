
// var recipeLink = $("#recipe-img-link");
// var cardClickHandler = function (e) {
//   var recipeIdAttr = e.target.attr('data-id');

//   if (recipeIdAttr) {
//     getRecipe(recipeIdAttr);
//   }
// }

var cookInstructionsEl = $('.cooking-instructions');
var recipeImageCardEl = $('.img-recipe-card');

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
          `<p> ${info.instructions[i].position}. ${info.instructions[i].display_text} </p>`;
        console.log(prepStep)
        // var ingredientsList =
        //   `<p> ${info.sections[0]}. ${info.instructions[i].display_text} </p>`;
        cookInstructionsEl.append(prepStep);
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
