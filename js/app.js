const ui = new UI(),
    cocktail = new Cocktail(),
    cocktailDB = new CocktailDB();

function eventListener() {
    document.addEventListener('DOMContentLoaded', drinkCategoryFunction);
    let searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', getDriks)
    }
    let ingViewBtn = document.querySelector('#results');
    if (ingViewBtn) {
        ingViewBtn.addEventListener('click', showDetailsInModal);
    }
    document.addEventListener('click', checkOrAddToFavorite);
}
eventListener();

function getDriks(e) {
    e.preventDefault();
    let searchinput = document.getElementById('search').value;
    if (searchinput === '') {
        ui.printMessage("What is the drink ?", "danger");
    } else {
        ui.showSpinner();


        let searchType = document.getElementById('type').value;
        let serverResponce;
        switch (searchType) {
            case 'name':
                serverResponce = cocktail.getDrinksByName(searchinput);
                break;
            case 'ingredient':
                serverResponce = cocktail.getDrinksByIngredient(searchinput);
                break;
            case 'category':
                serverResponce = cocktail.getDrinksByCategory(searchinput);
                break;
            case 'alcohol':
                serverResponce = cocktail.getDrinksByAlcohol(searchinput);
                break;
            default:
                break;
        }


        serverResponce.then(response => {
            ui.removeSpinner();
            // console.log(response.jsonData.drinks);
            if (response.jsonData.drinks) {
                if (searchType == 'name') {
                    ui.printDrinkResult(response.jsonData.drinks);
                    // } else if (searchType == 'ingredient') {
                } else {
                    ui.printDrinkResultByIngredient(response.jsonData.drinks);
                }
            } else {
                ui.printMessage("No drink found ! 😢", "warning");
            }
        });
    }
}

function showDetailsInModal(e) {
    e.preventDefault();
    if (e.target.classList.contains('ing_')) {
        let drinkId = e.target.dataset.id;
        cocktail.getDrinkDetailById(drinkId)
            .then(response => {
                ui.displayDetailsInModal(response.jsonData.drinks[0]);
            });
    }
}

function drinkCategoryFunction() {
    ui.isFavorite();
    let categorySelect = document.querySelector('.search-category');
    if (categorySelect) {
        ui.displaySearchCategory();
    }
    let favorites = document.querySelector('#favorites');
    if (favorites) {
        ui.displayFavorites();

    }
}

function checkOrAddFavorite(e) {
    console.log(e);

}

function checkOrAddToFavorite(e) {
    // e.preventDefault();
    if (e.target.classList.contains('favorite-btn')) {
        if (e.target.classList.contains('is-favorite')) {
            e.target.classList.remove('is-favorite');
            e.target.textContent = "+";
            cocktailDB.removeDrink(e.target.dataset.id);
        } else {
            e.target.classList.add('is-favorite');
            e.target.textContent = "-";
            let fullDrinkDiv = e.target.parentElement;
            let drinkInfo = {
                    'id': e.target.dataset.id,
                    'title': fullDrinkDiv.querySelector('.card-title').textContent,
                    'image': fullDrinkDiv.querySelector('.card-img-top').src
                }
                // console.log(drinkInfo);
            cocktailDB.setDrinks(drinkInfo);
        }
    }
    if (e.target.classList.contains('get-recipe')) {
        cocktail.getDrinkDetailById(e.target.dataset.id)
            .then(response => {
                ui.displayDetailsInModal(response.jsonData.drinks[0]);
            });
    }
    if (e.target.classList.contains('remove-recipe')) {
        e.preventDefault();
        e.target.parentElement.parentElement.remove();
        cocktailDB.removeDrink(e.target.dataset.id);
    }
}