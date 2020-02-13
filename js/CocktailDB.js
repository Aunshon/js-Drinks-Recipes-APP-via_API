class CocktailDB {
    getDrinks() {
        let drinks;
        if (localStorage.getItem('drinks') === null) {
            drinks = [];
        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }

    setDrinks(drink) {
        let savedDrinks = this.getDrinks();
        savedDrinks.push(drink);
        localStorage.setItem('drinks', JSON.stringify(savedDrinks));
    }

    removeDrink(id) {
        let savedDrinks = this.getDrinks();
        savedDrinks.forEach((data, index) => {
            if (data.id === id) {
                savedDrinks.splice(index, 1);
            }
        });
        localStorage.setItem('drinks', JSON.stringify(savedDrinks));
    }

}