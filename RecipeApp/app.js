// Constants
const IMAGE_URL = "./Images/imageTwo.jpg";
const API_KEY = process.env.API_KEY;
const MAX_RANDOM_RECIPES = 6;

// Select Elements
const main = document.querySelector("main");
const form = document.querySelector("form");
const input = document.querySelector("form input");
const randomRecipes = document.querySelector(".random-recipes");
const favoriteRecipes = document.querySelector(".favorites");

// Utility Functions
const createElementWithClass = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);
  return element;
};

const isFavoriteRecipesAvailable = () => {
  favoriteRecipes.style.display = favoriteRecipes.hasChildNodes()
    ? "flex"
    : "none";
};

const getRandomRecipe = async () => {
  const url =
    "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const recipeData = await response.json();
    return recipeData?.results || [];
  } catch (error) {
    console.error(error);
  }
};

const displayRecipeDescription = (
  thumbnail_url,
  thumbnail_alt_text,
  description
) => {
  const descriptionSection = createElementWithClass(
    "section",
    "recipe-description"
  );

  descriptionSection.innerHTML = `
    <div class="image">
      <span><i class="fa-solid fa-xmark"></i></span>
      <img src=${thumbnail_url || IMAGE_URL} alt=${
    thumbnail_alt_text || "food"
  } />
    </div>
    <div class="description">${description}</div>
  `;

  descriptionSection.style.display = "flex";
  randomRecipes.style.display = "none";
  favoriteRecipes.style.display = "none";

  // Event Listeners
  const backToRecipes = descriptionSection.querySelector(
    ".recipe-description .image span"
  );
  backToRecipes.addEventListener("click", () => {
    main.removeChild(descriptionSection);
    randomRecipes.style.display = "flex";
    favoriteRecipes.style.display = "flex";
    isFavoriteRecipesAvailable();
  });

  main.appendChild(descriptionSection);
};

const isRecipeInFavoriteSection = (name) => {
  const allFavoriteRecipes = favoriteRecipes.querySelectorAll("span");

  return Array.from(allFavoriteRecipes).some(
    (recipe) => recipe.innerText.trim().slice(0, 8) === name.slice(0, 8)
  );
};

const addToFavoriteSection = (
  thumbnail_url,
  thumbnail_alt_text,
  name,
  singleRandomRecipeLikeButton
) => {
  if (isRecipeInFavoriteSection(name)) return;
  const favoriteRecipe = createElementWithClass(
    "div",
    "single-favorite-recipe"
  );
  favoriteRecipe.dataset.id = new Date().getTime().toString();
  favoriteRecipe.innerHTML = `
  <div class="image">
  <img src=${thumbnail_url ? thumbnail_url : IMAGE_URL} alt=${
    thumbnail_alt_text ? thumbnail_alt_text : "food"
  } /><span><i class="fa-solid fa-xmark"></i></span>
  </div>
  <span>${name ? name.slice(0, 8) : "Low-Carb"}...</span>`;

  const removeFavoriteRecipeButton =
    favoriteRecipe.querySelector(".image span");

  //------------Event Listeners-------------
  removeFavoriteRecipeButton.addEventListener("click", () => {
    singleRandomRecipeLikeButton.style.color = "white";
    favoriteRecipes.removeChild(favoriteRecipe);
    isFavoriteRecipesAvailable();
  });

  favoriteRecipes.appendChild(favoriteRecipe);
};

const createRandomRecipe = async (matchRecipes) => {
  let recipes = [];
  if (matchRecipes) {
    randomRecipes.innerHTML = ``;
    recipes = matchRecipes;
  } else {
    recipes = await getRandomRecipe();
  }

  recipes.slice(0, 6).forEach((recipe, i) => {
    const { thumbnail_url, description, thumbnail_alt_text, name } = recipe;
    const element = createElementWithClass("div", "single-random-recipe");

    element.dataset.id = i;
    element.innerHTML = `
      <img src=${thumbnail_url ? thumbnail_url : IMAGE_URL} alt=${
      thumbnail_alt_text ? thumbnail_alt_text : "food"
    } />
      <div class="highlights">
        <p class="title">${name ? name : "Low-Carb Avocado Chicken Salad"}</p>
        <span class="like-button">
          <i class="fa-solid fa-heart"></i>
        </span>
      </div>`;

    const singleRandomRecipe = element.querySelector(
      ".single-random-recipe img"
    );
    const singleRandomRecipeLikeButton = element.querySelector(
      ".single-random-recipe .highlights .like-button"
    );

    //-------------------Event Listeners------------------
    singleRandomRecipe.addEventListener("click", () => {
      displayRecipeDescription(thumbnail_url, thumbnail_alt_text, description);
    });
    singleRandomRecipeLikeButton.addEventListener("click", () => {
      singleRandomRecipeLikeButton.style.color = "#d41d6d";
      favoriteRecipes.style.display = "flex";
      addToFavoriteSection(
        thumbnail_url,
        thumbnail_alt_text,
        name,
        singleRandomRecipeLikeButton
      );
    });

    randomRecipes.appendChild(element);
  });
};

const findRecipe = async (e) => {
  e.preventDefault();
  const value = input.value.toLowerCase();
  const recipes = await getRandomRecipe();
  const matchingRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(value)
  );
  if (matchingRecipes) {
    createRandomRecipe(matchingRecipes);
  }
  input.value = "";
};

//---------------Event Listeners-------------
form.addEventListener("submit", findRecipe);

createRandomRecipe();

isFavoriteRecipesAvailable();
