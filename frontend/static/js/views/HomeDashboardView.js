import AbstractView from "./AbstractView.js";
import { loadName} from "../controllers/greetings.js";
import { getClock, getDay} from "../controllers/timeboard.js";
import { onToDoSubmit, showToDoList} from "../controllers/todo.js";
import { loadWeather,refreshWeather } from "../controllers/weather.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("Dashboard");
    }
    async getHtml(){
        return `
        <div class="inneritem" id="namebox">
            <h1>what is your name?</h1>
            <form id="nameitem">
                <input style="-ms-ime-mode:active" name="username" required type="text" minlength="2" maxlength="10"
                    size="30" placeholder="Write name and press enter">
            </form>
        </div>
        <div class="inneritem" id="pannelbox">
            <div class="pannelitem" id="Timeboard">
                <h1 id="clock">Clock</h1>
                <h2 id="dateboard">Date</h2>
            </div>
            <div class="pannelitem" id="Greeting"></div>
            <div class="pannelitem" id="Weather">
                <div id="weather-item">
                    <span class="weather-init" id="weather-region">region</span>
                    <span class="weather-init" id="weather-temperature">temperature</span>
                    <div>
                        <img class="weather-init" id="weather-state-icon" width="35px" height="35px">
                        <img class="weather-init" id="weather-update-icon" width="35px" height="35px"
                        src="static/css/img/redo_black.png" title="날씨정보다시가져오기">
                    </div>
                    
                </div>
                <div id="weather-error">
                    <span class="weather-init" id="weather-error-message">Can't get location! Retry</span>
                    <img class="weather-init" id="weather-retry-icon" width="25px" height="25px" src="static/css/img/redo_maincolor.png" title="날씨정보다시가져오기">
                </div>
            </div>
            <div class="pannelitem" id="todo">
                <form id="todo-input-box">
                    <input style="-ms-ime-mode:active" name="todoinput" type="text" 
                        size="30" style="-ms-ime-mode:auto"
                        maxlength="13"
                        required placeholder="Write something to do in here!">
                    <img id="plus-icon" width="15px" height="15px" src="static/css/img/plus.png">
                </form>
                <div id="todo-scroller">
                    <div id="todo-item-box"></div>
                </div>
            </div>
        </div>
        `;
    }
    attachEvent(){
        //Greetings
        // check if name is here
        const greetingbox = document.getElementById("Greeting");
        //Outer : namebox, item : inputbox(form)
        const namebox = document.getElementById('namebox');
        const inputbox = namebox.querySelector('#nameitem');
        const inputelement = inputbox[0];
        //If username is already set, make these displayed
        const pannelbox = document.getElementById('pannelbox');
        const leftbox = document.getElementById('menu-bar');
        const rightbox = document.getElementById('notification');
        loadName(pannelbox, leftbox, rightbox, inputbox,inputelement,greetingbox);

        //Clock
        const clock = document.getElementById("clock");
        const datepicker = document.getElementById("dateboard");
        getClock(clock);
        getDay(datepicker);
        setInterval(getClock(clock), 1000);
        setInterval(getDay(datepicker),1000);

        //Todo
        const input = document.querySelector('#todo-input-box'); // to-do 입력 폼
        const add = input.querySelector('img');
        const schedule = document.querySelector('#todo-item-box');
        const TODO_KEY="toDos";
        //0. loadToDoList
        const savedToDoList = localStorage.getItem(TODO_KEY);
        let toDoList = [];
        if(savedToDoList!==null)
        {
            const parsedToDos=JSON.parse(savedToDoList);
            toDoList=parsedToDos;
            toDoList.forEach(todo=>showToDoList(todo,schedule,toDoList));
        }    
        //1. if press submit/click
        input.addEventListener('submit', (event)=>{
            onToDoSubmit(event,toDoList, input,schedule);
        });
        add.addEventListener('click', (event)=>{
            onToDoSubmit(event, toDoList,input,schedule);
        });

        //Weather
        const weatherpannel = document.getElementById("Weather");
        const weatherstatepannel = weatherpannel.querySelector("#weather-item");
        const weatherstateicon = weatherstatepannel.querySelector("#weather-state-icon");
        const weathererrorpannel = weatherpannel.querySelector("#weather-error");
        const weatherrefreshicon = weatherstatepannel.querySelector('#weather-update-icon');
        const weathererroricon = weathererrorpannel.querySelector('#weather-retry-icon');
        loadWeather(weatherstatepannel,weatherstateicon,weathererrorpannel)
        weatherrefreshicon.addEventListener('click',()=>{
            console.log('clicked update button');
            refreshWeather(weatherstatepannel,weatherstateicon,weathererrorpannel);
        });
        weathererroricon.addEventListener('click',()=>{
            console.log('clicked retry weather button');
            refreshWeather(weatherstatepannel,weatherstateicon,weathererrorpannel);
        });
    }
}