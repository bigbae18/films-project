export default class FilmView {
    constructor() {
        this.app = document.querySelector('#root');

        this.form = this.createElement('form');

        this.createInput({
            key: 'name',
            type: 'text',
            placeholder: 'Nombre de la película',
            name: 'name'
        });
        this.createInput({
            key: 'yearOfProduction',
            type: 'number',
            placeholder: 'Año de producción',
            name: 'yearOfProduction'
        })

        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Añadir película';

        this.form.append(this.name, this.yearOfProduction, this.submitButton);

        this.filmList = this.createElement('div');
    }

    createElement(selector) {
        const element = document.createElement(selector);
        return element
    }

    createInput({ key, type, placeholder, name } = { key: 'default', type: 'text', placeholder: 'default', name: 'default'}) {
        this[key] = document.createElement('input');
        this[key].type = type;
        this[key].placeholder = placeholder;
        this[key].name = name;
    }

    displayFilms(films) {
        while (this.filmList.firstChild) {
            this.filmList.removeChild(this.filmList.firstChild);
        }

        if (films.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'No hay ninguna película agregada';
            this.filmList.append(p);
        } else {
            films.forEach(film => {
                const filmDiv = this.createElement('div');
                filmDiv.id = film.id;
                const filmTitle = this.createElement('h2');
                filmTitle.textContent = film.name;
                const filmYear = this.createElement('small');
                filmYear.textContent = film.yearOfProduction;
                filmTitle.append(filmYear);
                filmDiv.append(filmTitle);
            })
        }
    }
}