import Film from './models/films.model';

export default class FilmService {
    constructor() {
        const films = JSON.parse(localStorage.getItem('films')) || [];
        this.films = films.map(film => new Film(film));
    }

    bindFilmListChanged(callback) {
        this.filmListChanged = callback
    }

    addFilm(film) {
        this.films.push(new Film(film));
        this.storeFilms(this.films)
    }

    deleteFilm(targetId) {
        this.films.filter(({ id }) => id !== targetId);
        this.storeFilms(this.films);
    }

    storeFilms(films) {
        this.filmListChanged(films);
        localStorage.setItem('films', JSON.stringify(films));
    }

    toggleComplete(targetId) {
        this.films = this.films.map(film => film.id == targetId ? new Film({ ...film, complete: !film.complete }) : film);
        this.storeFilms(this.films);
    }
}