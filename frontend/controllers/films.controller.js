class FilmsController {
    
    constructor(filmsService, filmsView) {
        this.filmsService = filmsService;
        this.filmsView = filmsView;

        this.filmsService.bindFilmsListChanged(this.onFilmListChanged);
        this.filmsView.bindAddFilm(this.handleAddFilm);
        this.filmsView.bindDeleteFilm(this.handleDeleteFilm);
        this.filmsView.bindShowAddFilmForm(this.handleShowHideForm);
        this.filmsView.bindHideAddFilmForm(this.handleShowHideForm);
        this.filmsView.bindSearchBar(this.handleSearchBarText);
        this.filmsView.bindFilterFilmAscendent(this.handleAscendentFilter);
        this.filmsView.bindFilterFilmDescendent(this.handleDescendentFilter);
    }

    onFilmListChanged = films => {
        this.filmsView.displayFilms(films);
    }
    handleShowHideForm = () => {
        this.filmsView.displayAddFilmForm();
    }

    handleAddFilm = film => {
        this.filmsService.addFilm(film);
    }
    handleDeleteFilm = id => {
        this.filmsService.deleteFilm(id);
    }
    handleSearchBarText = text => {
        this.filmsService.filterBySearchBar(text);
    }
    handleAscendentFilter = () => {
        this.filmsService.filterByAscendent();
    }
    handleDescendentFilter = () => {
        this.filmsService.filterByDescendent();
    }
}