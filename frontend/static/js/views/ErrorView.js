import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("Error");
    }
    async getHtml(){
        return `
            <h1>Can't load page</h1>
            <p>
                Check page again.
            </p>
            <p>
                If you want to go back to home, click here<br>
                <button> <a href="/" data-link>View Main page</a> </button>
            </p>
        `;
    }
}