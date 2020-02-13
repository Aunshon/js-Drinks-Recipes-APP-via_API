class Cocktail {
    // Class Starts Here
    async getDrinksByName(drinkName) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
        let fetchQuery = await fetch(url);
        let jsonData = await fetchQuery.json();
        return {
            jsonData
        }
    }
    async getDrinksByIngredient(ingredient) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
        let fetchQuery = await fetch(url);
        let jsonData = await fetchQuery.json();
        return {
            jsonData
        }
    }
    async getDrinksByCategory(ingredient) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${ingredient}`;
        let fetchQuery = await fetch(url);
        let jsonData = await fetchQuery.json();
        return {
            jsonData
        }
    }
    async getDrinksByAlcohol(ingredient) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${ingredient}`;
        let fetchQuery = await fetch(url);
        let jsonData = await fetchQuery.json();
        return {
            jsonData
        }
    }
    async getDrinkDetailById(drinkId) {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
        let fetchQuery = await fetch(url);
        let jsonData = await fetchQuery.json();
        return {
            jsonData
        }
    }

    async getAllDdinkCategories() {
        let url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
        let fetchQuery = await fetch(url);
        let fetchData = await fetchQuery.json();
        return {
            fetchData
        }
    }

    // Class Ends Here
}