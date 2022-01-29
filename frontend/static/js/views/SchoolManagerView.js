import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("School");
    }
    async getHtml(){
        return `
            <h1>This is School.</h1>
            <p>
                Nothing to be scared. Don't Panic.
            </p>
            <p>
                <a href="/" data-link>View Dashboard</a>
            </p>
        `;
    }
}