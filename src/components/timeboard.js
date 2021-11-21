'use strict'
// const mainPannel = document.getElementById("main-pannel");
// console.log(mainPannel);
const clock = document.getElementById("clock");
const datepicker = document.getElementById("dateboard");

function dayConverter(day){
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return (days[day]);
}
function getClock()
{
    const now = new Date();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const init_hours = hours < 10 ? "0"+hours : ""+hours;
    const init_minutes = minutes < 10 ? "0"+minutes : ""+minutes;
    clock.innerText =  init_hours + " : " + init_minutes;    
}
function getDay()
{
    const now = new Date();
    const month = now.getMonth();
    const day = dayConverter(now.getDay());
    const date = now.getDate();
    datepicker.innerText = `${month}. ${date}. ${day}`;
};
function restart(){
    getClock();
    getDay();
    setInterval(getClock, 1000);
    setInterval(getDay(),1000);
};
restart();