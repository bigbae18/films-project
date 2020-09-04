class FilmsView {
    constructor() {

        this.app = this.selectElement('#root');
        this.header = this.selectElement('#header');
        this.filterParagraph = this.selectElement('.filter-p');

        this.form = this.createElement('form');

        this.createInput({
            key: 'name',
            type: 'text',
            placeholder: 'Nombre de la película',
            name: 'name',
            required: true
        });
        this.createInput({
            key: 'yearOfProduction',
            type: 'number',
            placeholder: 'Año de producción',
            name: 'yearOfProduction',
            required: true
        })

        
        this.buttonFormDiv = this.createElement('div');
        this.hideButton = this.createElement('button', 'btn btn-secondary');
        this.hideButton.textContent = 'hide';
        this.submitButton = this.createElement('button', 'btn btn-success');
        this.submitButton.textContent = 'Añadir película';

        this.buttonFormDiv.append(this.hideButton, this.submitButton);

        this.yearOfProduction.pattern = "^[1-9]\d*$"

        this.form.className = 'row';
        
        this.form.append(this.name, this.yearOfProduction, this.buttonFormDiv);

        this.createInput({
            key: 'searchBar',
            type: 'text',
            placeholder: 'Busca tu película',
            name: 'searchBar'
        });

        this.showAddFilmFormButton = this.createElement('button', 'btn btn-outline-success add');
        this.AddFilmFormIcon = this.createElement('i', 'fa fa-plus-circle');
        this.showAddFilmFormButton.append(this.AddFilmFormIcon);

        this.header.append(this.searchBar, this.showAddFilmFormButton);

        this.ascendentFilmsFilterButton = this.createElement('button', 'filter');
        this.ascendentFilterIcon = this.createElement('i', 'fas fa-sort-numeric-up-alt');
        this.ascendentFilmsFilterButton.append(this.ascendentFilterIcon);

        this.descendentFilmsFilterButton = this.createElement('button', 'filter');
        this.descendentFilterIcon = this.createElement('i', 'fas fa-sort-numeric-down-alt')
        this.descendentFilmsFilterButton.append(this.descendentFilterIcon);

        this.filterParagraph.append(this.ascendentFilmsFilterButton, ' - ', this.descendentFilmsFilterButton);

        this.filmList = this.createElement('div');
        this.filmList.className = 'row';

        this.app.append(this.filmList);
    }

    get nameInputText() {
        return this.name.value
    }
    get yearOfProductionInputText() {
        return this.yearOfProduction.value
    }
    get searchBarText() {
        return this.searchBar.value
    }
    resetInputs() {
        this.name.value = '';
        this.yearOfProduction.value = '';
    }
    resetSearchBar() {
        this.searchBar.value = '';
    }

    createElement(selector, className) {
        const element = document.createElement(selector);
        if (className) {
            element.className = className;
        }
        return element
    }
    selectElement(selector) {
        const element = document.querySelector(selector);
        return element
    }

    createInput({ key, type, placeholder, name, required } = { key: 'default', type: 'text', placeholder: 'default', name: 'default', required: false }) {
        this[key] = document.createElement('input');
        this[key].type = type;
        this[key].placeholder = placeholder;
        this[key].name = name;
        this[key].required = required;
    }

    bindAddFilm(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            if ((this.nameInputText) && (this.yearOfProductionInputText)) {
                handler({
                    name: this.nameInputText,
                    yearOfProduction: this.yearOfProductionInputText
                });
            }
        })
    }
    bindDeleteFilm(handler) {
        this.filmList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                if (!confirm('¿Está seguro que desea eliminar la película?')) {
                    return
                }
                handler(event.target.parentElement.id);
            }
        })
    }
    bindShowAddFilmForm(handler) {
        this.showAddFilmFormButton.addEventListener('click', event => {
            if (event.target.firstChild.className === 'fas fa-plus-circle') {

            }
        })
    }
    bindFilterFilmAscendent(handler) {
        this.ascendentFilmsFilterButton.addEventListener('click', event => {
            event.preventDefault();
            handler();
        })
    }
    bindFilterFilmDescendent(handler) {
        this.descendentFilmsFilterButton.addEventListener('click', event => {
            event.preventDefault();
            handler()
        });
    }
    bindSearchBar(handler) {
        this.header.addEventListener('keyup', event => {
            if (event.target.name == 'searchBar') {
                if (event.isComposing || event.keyCode === 229) {
                    return
                }
                handler(this.searchBarText);
            }
        })
    }

    displayFilms(films) {
        while (this.filmList.firstChild) {
            this.filmList.removeChild(this.filmList.firstChild);
        }

        if (films.length === 0) {
            const h2 = this.createElement('h2');
            h2.textContent = 'No se ha encontrado ninguna película...';
            this.filmList.append(h2);
        } else {
            films.forEach(film => {
                const filmDiv = this.createElement('div');
                filmDiv.id = film.id;
                filmDiv.className = 'col-xs-6 col-s-4 col-md-3 filmBox';
                const filmTitle = this.createElement('h3');
                filmTitle.textContent = film.name;
                const filmYear = this.createElement('p');
                filmYear.textContent = `Año de producción: ${film.yearOfProduction}`;
                const deleteButton = this.createElement('button', 'btn btn-danger delete');
                deleteButton.textContent = 'Borrar';
                filmDiv.append(filmTitle, filmYear, deleteButton);
                this.filmList.append(filmDiv);
            });
        }
        
    }
}