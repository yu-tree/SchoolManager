'use strict'
// const mainPannel = document.getElementById("main-pannel");
// console.log(mainPannel);
const clock = document.getElementById("clock");
const datepicker = document.getElementById("dateboard");

function dayConverter(day){
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return (days[day]);
}

function getTime(){
    const now = new Date();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const month = now.getMonth();
    const day = dayConverter(now.getDay());
    const year = now.getFullYear();
    const date = now.getDate();
    //now : Sun Nov 14 2021 22:05:41 GMT+0900 (대한민국 표준시)
    //minutes : 5
    //hours : 22
    //month : 11
    clock.innerText = `${hours <10 ? `0{hours}`: hours} : ${minutes<10 ? `0{minutes}` : minutes}`;
    datepicker.innerText = `${year}, ${month}, ${date}, ${day}`;
};

function restart(){
    getTime();
    setInterval(getTime, 1000);
};

restart();