class FilmsService {

    constructor() {
        this.APIurl = "http://localhost/films-project/backend/api/films/";
        this.films = $.get(this.APIurl + 'read.php', (data, status) => { 
            if (status === 404) {
                return `No se ha encontrado la página solicitada`
            }
            this.films = data.films
        }).done(() => {
            this.films.map(film => new Films(film))
        });
    }
    postFilm(film) {
        $.post(this.APIurl + 'create.php', film, (data, status) => {
            if (status === 200) {
                return data
            } else {
                return false
            }
        });
    }
    bindFilmsListChanged(callback) {
        this.filmListChanged = callback
    }

    addFilm(film) {
        if (this.postFilm(film)) {
            this.films.push(new Films(film));
            this.storeFilms(this.films)
        } else {
            return ``
        }
    }

    deleteFilm(targetId) {
        $.ajax({
            url: this.APIurl + 'delete.php',
            method: 'DELETE',
            data: {
                id: targetId
            },
            error: function (e) {
                return `Algo ha salido mal en la petición HTTP: ` + e
            }
        }).done(() => {
            this.films.filter(({ id }) => id !== targetId);
            this.storeFilms(this.films);
        })
    }

    storeFilms(films) {
        this.filmListChanged(films);
    }
}