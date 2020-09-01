export default class Film {
    constructor({ id, name, yearOfProduction, complete } = { complete: false}) {
        this.id = id;
        this.name = name;
        this.yearOfProduction = yearOfProduction;
        this.complete = complete;
    }
}