class FilmsView {
    constructor() {
        this.app = this.selectElement('#root');
        this.header = this.selectElement('#header');
        this.formDiv = this.selectElement('#form-div')
        this.filterParagraph = this.selectElement('.filter-p');

        this.addFilmForm = this.createElement('form', 'mb-3 card p-3 add-film');
        this.addFilmForm.hidden = true;

        this.errorFormParagraph = this.createElement('p', 'errors');
        
        this.formTitle = this.createElement('h4', 'card-title mb-3');
        this.formTitle.textContent = 'Añadir película';

        this.inputsDiv = this.createElement('div', 'card-text mb-2');
        this.buttonDiv = this.createElement('div', 'buttons');

        this.createInput({
            key: 'name',
            type: 'text',
            placeholder: 'Nombre de la película',
            name: 'name',
            required: true
        });
        this.createInput({
            key: 'yearOfProduction',
            type: 'text',
            placeholder: 'Año de producción',
            name: 'yearOfProduction',
            required: true
        });
        this.inputsDiv.append(this.name, this.yearOfProduction);

        this.hideButton = this.createElement('button', 'btn btn-secondary');
        this.hideButton.textContent = 'Cerrar';

        this.addButton = this.createElement('button', 'btn btn-success');
        this.addButton.textContent = 'Añadir película';
        this.addButton.type = "submit";  
        
        this.buttonDiv.append(this.hideButton, this.addButton);
        this.addFilmForm.append(this.formTitle, this.inputsDiv, this.buttonDiv);

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

        this.filmList = this.createElement('div', 'row');

        this.app.append(this.filmList);

        this.hideButton
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
        this.addFilmForm.addEventListener('submit', event => {
            event.preventDefault();
            this.errorFormParagraph.remove();
            let nameValid = this.nameInputText.match(/^\b[A-Z]\w[A-Za-z]*$/g);
            let yearValid = this.yearOfProductionInputText.match(/^\b(19|20)\d{2}$/g);
            console.log(yearValid);
            if (nameValid === null || yearValid === null) {
                this.errorFormParagraph.textContent = 'Los datos introducidos no son válidos'
                this.addFilmForm.prepend(this.errorFormParagraph);
                return
            }
            handler({
                name: this.nameInputText,
                yearOfProduction: this.yearOfProductionInputText
            });
        })
    }

    bindDeleteFilm(handler) {
        this.filmList.addEventListener('click', event => {
            if (event.target.id === 'delete') {
                if (!confirm('¿Está seguro que desea eliminar la película?')) {
                    return
                }
                handler(event.target.parentElement.id);
            }
        })
    }
    bindHideAddFilmForm(handler) {
        this.hideButton.addEventListener('click', event => {
            event.preventDefault();
            handler();
        })
    }
    bindShowAddFilmForm(handler) {
        this.showAddFilmFormButton.addEventListener('click', event => {
            event.preventDefault();
            handler();
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
                const filmDiv = this.createElement('div', 'col-xs-12 col-s-6 col-md-3 mb-2 card text-center filmBox');
                filmDiv.id = film.id;
                const filmTitle = this.createElement('h4', 'mt-3 card-title');
                filmTitle.textContent = film.name;
                const filmYear = this.createElement('p', 'mt-4 card-text');
                filmYear.textContent = `Año de producción: ${film.yearOfProduction}`;
                const deleteButton = this.createElement('button', 'btn btn-danger');
                deleteButton.textContent = 'Borrar';
                deleteButton.id = 'delete';
                filmDiv.append(filmTitle, filmYear, deleteButton);
                this.filmList.append(filmDiv);
            });
        }
    }
    displayAddFilmForm() {
        if (this.addFilmForm.hidden == false) {
            this.addFilmForm.remove();
            this.addFilmForm.hidden = true
            return
        }
        this.formDiv.append(this.addFilmForm);
        this.addFilmForm.hidden = false;
    }
}