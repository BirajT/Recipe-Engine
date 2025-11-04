let btn = document.getElementById("getValueBtn");
let textArea = document.getElementById("getValue");
let resultDiv = document.getElementById("recipeContainer");

btn.addEventListener("click", () => {
  let recipe = textArea.value.trim();

  if (recipe === "") {
    resultDiv.innerHTML = "<p>Please type a food name.</p>";
    return;
  }

  fetch(`https://dummyjson.com/recipes/search?q=${recipe}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.recipes && data.recipes.length > 0) {
        // map each recipe into a card
        let recipesHTML = data.recipes.map((r) => `
          <div class="recipe-card">
            <h3>🍴 ${r.name}</h3>
            <img src="${r.image}" alt="${r.name}" width="200"/>
            <p><strong>Ingredients:</strong> ${r.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> ${r.instructions.join(" ")}</p>
            <p><strong>⏱ Prep:</strong> ${r.prepTimeMinutes} min | <strong>Cook:</strong> ${r.cookTimeMinutes} min</p>
            <p><strong>Servings:</strong> ${r.servings} | <strong>Difficulty:</strong> ${r.difficulty}</p>
            <p><strong>Rating:</strong> ${r.rating} (${r.reviewCount} reviews)</p>
          </div>
        `).join("");

        resultDiv.innerHTML = recipesHTML;
      } else {
        resultDiv.innerHTML = "<p>No recipes found.</p>";
      }
    })
    .catch((error) => {
      resultDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
      console.error(error);
    });
});
