import EventDispatcher from './EventDispatcher';

export default class Films {
    
    id;
    name;
    yearOfProduction;

    constructor(id, name, yearOfProduction) {
        this.id = id;
        this.name = name;
        this.yearOfProduction = yearOfProduction;

        this.addFilmEvent = new EventDispatcher();
    }
}