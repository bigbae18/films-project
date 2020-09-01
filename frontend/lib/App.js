export default class App {
    constructor(selector) {
        this.rootElement = document.querySelector(selector);
        this.components = {};
        this.currentComponent;
    }

    createComponent(component) {
        this.components[component.name] = component;
    }

    showComponent(name) {
        this.currentComponent = this.components[name];
        this.updateView();
    }

    updateView() {
        if (this.currentComponent) {
            this.rootElement.innerHTML = this.currentComponent.view(this.currentComponent.model)
        }
    }
}