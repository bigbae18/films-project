class FilmsController {
    
    constructor(filmsService, filmsView) {
        this.filmsService = filmsService;
        this.filmsView = filmsView;

        this.filmsService.bindFilmsListChanged(this.onUserListChanged);
        this.filmsView.bindAddFilm(this.handleAddFilm);
        this.filmsView.bindDeleteFilm(this.handleDeleteFilm);
    }

    onUserListChanged = films => {
        this.filmsView.displayFilms(films);
    }

    handleAddFilm = film => {
        this.filmsService.addFilm(film);
    }
    handleDeleteFilm = id => {
        this.filmsService.deleteFilm(id);
    }
}