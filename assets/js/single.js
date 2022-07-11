var recipeLink = $("#recipe-img-link");


var cardClickHandler = function (e) {
  var recipeIdAttr = e.target.attr('data-id');

  if (recipeIdAttr) {
    getRecipe(recipeIdAttr);
    document.location.replace('recipe.html');
  }
}