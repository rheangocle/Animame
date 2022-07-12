//Declaring variables
var cookInstructionsEl = $('#cooking-intructions');
var recipeImageCardEl = $('.img-recipe-card');
var ingredientsListEl = $('.ingredients-list')
var pageTitle = $("#recipe-page-title");

//Function to get recipe information from tasty api
function getRecipe() {

  //getting recipe ID from local storage
  var recipeId = localStorage.getItem("recipe-id");
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '38e4e688e1msh156d88e5c5adfc2p101e84jsn7d1ccb27e81d',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${recipeId}`, options)
    .then(response => response.json())
    .then(info => {
      //Displaying anime name on tab
      pageTitle.text("Animame | " + info.name);

      //Adding cooking instructions onto page
      for (var i = 0; i < info.instructions.length; i++) {
        var prepStep =
          `<li class='recipe-list-items'> ${info.instructions[i].position}. ${info.instructions[i].display_text} </li>`;
        cookInstructionsEl.append(prepStep);
      }

      //Adding ingredient information onto page
      for (var i = 0; i < info.sections.length; i++) {
        var ingredientsSection = `
    <div class="title is-6 ">${info.sections[i].name}
    </div>`
        //Checking for null section names where a recipe only has one prep section
        if (info.sections[i].name != null) {
          ingredientsListEl.append(ingredientsSection);
        }
        //Adding prep ingredient components to the page
        for (var j = 0; j < info.sections[i].components.length; j++) {
          var ingredientsItems = `
        <li>${info.sections[i].components[j].raw_text}</li>`
          ingredientsListEl.append(ingredientsItems);
        }
      }

      //Adding recipe image to page
      var recipeImage = `
      <div class="card-image is-6-desktop">
        <img class="recipe-image box-shadow" src="${info.thumbnail_url}" alt="image of ${info.name}">
      </div > `
      recipeImageCardEl.append(recipeImage);
    })

    .catch(err => console.error(err));
}

//Calling function to get recipe info
getRecipe()
