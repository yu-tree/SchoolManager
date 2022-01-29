'use strict'
// const mainPannel = document.getElementById("main-pannel");
// console.log(mainPannel);

function dayConverter(day){
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return (days[day]);
}
export function getClock(clock)
{
    const now = new Date();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const init_hours = hours < 10 ? "0"+hours : ""+hours;
    const init_minutes = minutes < 10 ? "0"+minutes : ""+minutes;
    clock.innerText =  init_hours + " : " + init_minutes;    
}
export function getDay(datepicker)
{
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = dayConverter(now.getDay());
    const date = now.getDate();
    datepicker.innerText = `${month}. ${date}. ${day}`;
};