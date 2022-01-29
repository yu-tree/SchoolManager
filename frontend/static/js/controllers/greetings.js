const USER_NICK = "currentuser";

export function loadName(pannelbox, leftbox, rightbox, inputbox,inputelement,greetingbox){
    const username = localStorage.getItem(USER_NICK);
    if(username===null)
    {
        pannelbox.style.display="none";
        leftbox.style.display="none";
        rightbox.style.display="none";
        inputbox.addEventListener('submit',(event)=>{
            handleSubmit(event,inputelement)}
        );
    }else
    {
        //inputelement.addEventListener('submit',handleSubmit);
        paintGreeting(username,namebox,pannelbox,leftbox,rightbox,greetingbox);
    }
}

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
function paintGreeting(username,namebox, pannelbox,leftbox,rightbox,greetingbox)
{
    const daytime = calDayTime();
    greetingbox.innerText = `Good ${daytime}! ${username}`;
    //hide input box
    namebox.style.display = "none";
    pannelbox.style.display="block";
    leftbox.style.display="flex";
    rightbox.style.display="block";
}
function handleSubmit(event,inputelement)
{
    //event.preventDefault();
    const currentValue = inputelement.value;
    console.log(currentValue);
    saveName(currentValue);
    paintGreeting(currentValue);  
}
