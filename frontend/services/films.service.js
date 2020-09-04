const APIurl = "http://localhost/films-project/backend/api/films/";

class FilmsService {
    constructor() {
        this.getFilms();
        this.films = [];
        this.filteredFilms;
        this.filters = {
            ascendent: false,
            descendent: false
        };
        this.showingForm = false;
    }

    async getFilms() {
        try {
            let res = await fetch(APIurl + 'read.php');
            res = await res.json()
            
            this.films = res.films.map(film => new Film(film));

            this.refreshFilms(this.films);
        } catch (e) {
            console.error(e);
        }
    }
    async deleteFilm(targetId) {
        try {
            const data = { 
                id: targetId 
            };
            let res = await fetch(APIurl + 'delete.php', {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            res = await res.json();
            
            this.films = this.films.filter(({ id }) => id !== targetId);
            this.refreshFilms(this.films);
        } catch(e) { 
            console.error(e) 
        }
    }
    async addFilm(film) {
        try {} catch(e) {
            console.error(e)
        }
    }

    bindFilmsListChanged(handler) {
        this.filmListChanged = handler
    }

    refreshFilms(films) {
        this.filmListChanged(films);
    }

    filterBySearchBar(searchText) {
        if (searchText == '') {
            this.refreshFilms(this.films)
            return
        }
        this.filteredFilms = [];
        const text = searchText.toLowerCase()

        let filmsArray = this.films.map(film => ({
            id: film.id,
            name: film.name.toLowerCase()
        }));
        filmsArray.forEach(film => {
            if (film.name.indexOf(text) !== -1) {
                let filteredFilm = this.films.find(_film => _film.id == film.id)
                this.filteredFilms.push(filteredFilm);
            }
        })
        this.refreshFilms(this.filteredFilms);
    }
    filterByAscendent() {
        if (this.filters.ascendent === true) {
            this.filters.ascendent = false;
            this.refreshFilms((typeof(this.filteredFilms) !== undefined) ? this.filteredFilms : this.films);
            return
        }
        

        let currentFilms = (typeof(this.filteredFilms) !== undefined) 
            ? this.filteredFilms.map(film => ({
                id: film.id,
                name: film.name,
                yearOfProduction: film.yearOfProduction
            }))
            : this.films.map(film => ({
                id: film.id, 
                name: film.name,
                yearOfProduction: film.yearOfProduction
            }));

        this.filters.descendent = false;
        this.filters.ascendent = true;

        const orderedFilms = currentFilms.sort(this.sortAsc);

        this.refreshFilms(orderedFilms);
    }
    sortAsc(f1, f2) {
        return f2.yearOfProduction - f1.yearOfProduction
    }
    filterByDescendent() {
        if (this.filters.descendent === true) {
            this.filters.descendent = false;
            this.refreshFilms((typeof(this.filteredFilms) !== undefined) ? this.filteredFilms : this.films);
            return
        }
        let currentFilms = (typeof(this.filteredFilms) !== undefined) 
            ? this.filteredFilms.map(film => ({
                id: film.id,
                name: film.name,
                yearOfProduction: film.yearOfProduction
            }))
            : this.films.map(film => ({
                id: film.id, 
                name: film.name,
                yearOfProduction: film.yearOfProduction
            }));
        this.filters.descendent = true;
        this.filters.ascendent = false;

        const orderedFilms = currentFilms.sort(this.sortDesc);

        this.refreshFilms(orderedFilms)
    }
    sortDesc(f1, f2) {
        return f1.yearOfProduction - f2.yearOfProduction
    }
}