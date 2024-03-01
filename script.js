document.addEventListener('DOMContentLoaded', () => {
    // Fetch recipes from server
    fetch('/recipes')
        .then(response => response.json())
        .then(recipes => {
            const recipeList = document.getElementById('recipeList');
            recipes.forEach(recipe => {
                const recipeElement = createRecipeElement(recipe);
                recipeList.appendChild(recipeElement);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
});

function createRecipeElement(recipe) {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');
    recipeElement.innerHTML = `
        <h3>${recipe.title}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <p><strong>Cooking Time:</strong> ${recipe.cookingTime}</p>
        <p><strong>Difficulty Level:</strong> ${recipe.difficultyLevel}</p>
        <p><strong>Famous At:</strong> ${recipe.famousAt.join(', ')}</p>
        <p><strong>Likes:</strong> ${recipe.likes}</p>
        <p><strong>Comments:</strong></p>
        <ul>
            ${recipe.comments.map(comment => `<li>${comment.text}</li>`).join('')}
        </ul>
    `;
    return recipeElement;
}
