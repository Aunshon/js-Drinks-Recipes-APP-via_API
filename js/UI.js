class UI {
    printMessage = function(message, classList) {
        let alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', `alert-${classList}`, 'alert-dismissible');

        alertDiv.innerHTML = `
            <button type="button" class='close' data-dismiss="alert"> x </button>
            ${message}
        `;

        let refrence = document.querySelector('.jumbotron h1');
        let insertDiv = refrence.parentElement;
        insertDiv.insertBefore(alertDiv, refrence);

        let getAlertDiv = document.querySelector('.alert');
        if (getAlertDiv) {
            setTimeout(() => {
                getAlertDiv.remove();
            }, 2000);
        }
    }

    showSpinner() {
        let spinner = document.createElement('img');
        spinner.classList = 'aunSpinner';
        spinner.width = 100;
        spinner.src = 'aun3.gif';

        document.querySelector('.sp').appendChild(spinner);

    }
    removeSpinner() {
        // setTimeout(() => {
        document.querySelector('.aunSpinner').remove();
        // }, 1000);
    }
    printDrinkResult(drink) {
        let resultWraper = document.querySelector('.results-wrapper');
        resultWraper.style.display = 'block';

        let result = document.getElementById('results');
        result.innerHTML = "";
        drink.forEach(singlefItem => {
            result.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                        <button type="button" class="favorite-btn btn btn-outline-info" data-id="${singlefItem.idDrink}">+</button>
                        <img class = "card-img-top" src="${singlefItem.strDrinkThumb}" alt = "${singlefItem.strDrink}cap">

                        <div class="card-body">
                            <h2 class="card-title text-center">${singlefItem.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instruction : </p>
                            <p class="card-text">
                            ${singlefItem.strInstructions}
                            </p>

                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">
                                        Ingredients : 
                                    <li>
                                    ${this.printDrinkIngregients(singlefItem)}
                                </ul>
                            </p>

                            <p class = "card-text font-weight-bold" > Extra Inforamtion: </p>
                            <p class="card-text">
                                <span class="badge badge-success badge-pill">
                                    ${singlefItem.strAlcoholic}
                                </span>
                                <span class="badge badge-danger badge-pill">
                                    Category : ${singlefItem.strCategory}
                                </span>
                            </p>
                        </div>

                    </div>
                </div>

               
            `;
        });
        this.isFavorite();
    }
    printDrinkIngregients(singleDrink) {
        let totalData = [];
        for (let i = 1; i <= 15; i++) {
            let singleIng = {};
            if (singleDrink[`strIngredient${i}`] !== null) {
                singleIng.strIngredient = singleDrink[`strIngredient${i}`];
                singleIng.strMeasure = singleDrink[`strMeasure${i}`];
                totalData.push(singleIng);
            }
        }
        let ingHtml = '';
        totalData.forEach(singleData => {
            // console.log(singleData);
            ingHtml += `<li class="list-group-item">${singleData.strIngredient} - ${singleData.strMeasure}<li>`;
        });
        return ingHtml;
    }


    printDrinkResultByIngredient(Drinks) {

        let resultWraper = document.querySelector('.results-wrapper');
        resultWraper.style.display = 'block';

        let result = document.getElementById('results');
        result.innerHTML = "";
        Drinks.forEach(data => {
            result.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                    <button type="button" class="favorite-btn btn btn-outline-info" data-id="${data.idDrink}">+</button>
                        <img class = "card-img-top" src="${data.strDrinkThumb}" alt = "${data.strDrink}cap">

                        <div class="card-body">
                            <h2 class="card-title text-center">${data.strDrink}</h2>
                            <a href="#" data-target="#recipe" data-toggle="modal" data-id="${data.idDrink}" class="btn btn-success ing_">View</a>
                        </div>

                    </div>
                </div>

               
            `;
        });
        this.isFavorite();
    }

    displayDetailsInModal(resipe) {
        // console.log(resipe);
        let title = document.querySelector('.modal-title');
        let discription = document.querySelector('.modal-body .description-text');
        let list = document.querySelector('.list-group');

        title.innerHTML = resipe.strDrink;
        discription.innerHTML = resipe.strInstructions;
        list.innerHTML = this.printDrinkIngregients(resipe);
    }

    displaySearchCategory() {
        let searchSelect = document.getElementById("search");
        let defaultOption = document.createElement('option');
        defaultOption.textContent = "- Select One - ";
        searchSelect.appendChild(defaultOption);

        let allCategories = cocktail.getAllDdinkCategories();
        allCategories.then(categories => {
            let allResponceCategories = categories.fetchData.drinks;
            allResponceCategories.forEach(response => {
                let category = response.strCategory;

                let newOption = document.createElement('option');
                newOption.textContent = category;
                newOption.value = category.split(' ').join('_');
                searchSelect.appendChild(newOption);
            });
        });
    }

    displayFavorites() {
        let tbl = document.querySelector('#favorites tbody');

        let allFavorites = cocktailDB.getDrinks();
        allFavorites.forEach(data => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${data.image}" width="100"></td>
                <td>${data.title}</td>
                <td><a href="#" data-toggle="modal" data-target="#recipe" data-id="${data.id}" class="btn btn-success get-recipe">View</a></td>
                <td><a href="#" data-id="${data.id}" class="btn btn-danger remove-recipe">Remove</a></td>
            `;
            tbl.appendChild(tr);
        });
    }

    isFavorite() {
        let drinks = cocktailDB.getDrinks();
        drinks.forEach(drinks => {
            let { id } = drinks;
            let drinkId = document.querySelector(`[data-id="${id}"]`);
            if (drinkId) {
                drinkId.classList.add('is-favorite');
                drinkId.textContent = "-";
            }
        });
    }






    // Class ends here
}