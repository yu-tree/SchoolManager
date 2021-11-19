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

const USER_NICK = "currentuser";

function calDayTime()
{
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    if ((hour >= 0 && hour <= 4) || (hour >= 22 && hour <= 23))
        return ("Night");
    else if (hour >= 17 && hour < 22)
        return ("Evening");
    else if (hour >= 12 && hour <17)
        return ("Afternoon");
    else
        return ("Morning");
}
function saveName(username){
    localStorage.setItem(USER_NICK,username);
}
function paintGreeting(username)
{
    const daytime = calDayTime();
    greetingbox.innerText = `Good ${daytime}! ${username}`;
    //hide input box
    namebox.style.display = "none";
    pannelbox.style.display="block";
    leftbox.style.display="flex";
    rightbox.style.display="block";
}
function handleSubmit()
{
    inputelement.addEventListener("keypress",function(event){
        event.preventDefault();
        if(event.keyCode===13)
        {
            const currentValue = inputelement.value;
            console.log(currentValue);
            saveName(currentValue);
            paintGreeting(currentValue);            
        }
    }); 
}
function loadName(){
    const username = localStorage.getItem(USER_NICK);
    if(username===null)
    {
        pannelbox.style.display="none";
        leftbox.style.display="none";
        rightbox.style.display="none";
        handleSubmit();
    }else
    {
        paintGreeting(username);
    }
}

loadName();