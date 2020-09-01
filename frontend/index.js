import App from './lib/App.js';

const app = new App('#root');

const httpRequest = new XMLHttpRequest();
let films;
let film_text;

if (!httpRequest) {
    console.log('Imposible de crear la instancia de HTTP');
}

httpRequest.onreadystatechange = requestHandler;
httpRequest.open('GET', 'http://localhost/films-project/backend/api/films/read.php', true);
httpRequest.send();

app.createComponent({
    name: 'films',
    model: films,
    view(model) {
        model.forEach(film => {
            film_text = film_text + `<div class="col-xs-2 col-md-3" id="${film.id}"><h1>${film.name}<small>${film.year_of_production}</small></h1></div>`
        });
        return film_text
    }
})

function requestHandler() {
    try {
        console.log(httpRequest.readyState);
        if ((httpRequest.readyState === 4) && (httpRequest.status === 200)) {
            films = JSON.parse(httpRequest.response);
        }
    } catch (e) {
        return 'Excepción encontrada: ' + e.description
    }
}