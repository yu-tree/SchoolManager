const input = document.querySelector('#todo-input-box'); // to-do 입력 폼
const add = input.querySelector('img');
const schedule = document.querySelector('#todo-item-box');

const TODO_KEY="toDos"; // localStorage에 저장할 키

let toDoList=[];

input.addEventListener('submit', onToDoSubmit);
add.addEventListener('click', onToDoSubmit);

function onToDoSubmit(event) {
    event.preventDefault();
    const todo = input.querySelector('input');
    const newToDo = todo.value;
    console.log(newToDo);

    if (newToDo !== "") {
        todo.value = "";
        const newToDoObj = {
            text: newToDo,
            id: Date.now()
        };
        toDoList.push(newToDoObj);
        showToDoList(newToDoObj);
        saveToDos();
    }
}

function saveToDos(){
    // 입력된 ToDoList들을 localStorage에 저장시킨다.
    localStorage.setItem(TODO_KEY,JSON.stringify(toDoList));
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDoList=toDoList.filter(toDo => toDo.id!==parseInt(li.id));
    saveToDos();
}

function changeDeleteIconBlack(event)
{
    const deletebtn = event.target;
    deletebtn.src="./img/delete_black.png";
    delete_btn.style.width="20px";
    delete_btn.style.height="20px";
}
function changeDeleteIcon(event)
{
    const deletebtn = event.target;
    deletebtn.src="./img/delete.png";
    delete_btn.style.width="20px";
    delete_btn.style.height="20px";
}
function showToDoList(newToDoObj){
    const li = document.createElement("li");
    const span = document.createElement("span");
    // const delete_btn = document.createElement("button");
    const delete_btn = document.createElement("img");

    li.id=newToDoObj.id;
    //추가
    delete_btn.src="./img/delete.png";
    delete_btn.style.width="20px";
    delete_btn.style.height="20px";
    delete_btn.addEventListener("mouseover",changeDeleteIconBlack)
    delete_btn.addEventListener("mouseout",changeDeleteIcon);
    span.innerText="•   "+newToDoObj.text;
    //

    delete_btn.addEventListener("click",deleteToDo);
    //추가
    li.style.display="flex";
    li.style.justifyContent="space-between";
    li.style.width = "210px";
    //

    li.appendChild(span);
    li.appendChild(delete_btn);
    schedule.appendChild(li);
}

const savedToDoList = localStorage.getItem(TODO_KEY);

if(savedToDoList!==null){
    const parsedToDos=JSON.parse(savedToDoList);
    toDoList=parsedToDos;
    toDoList.forEach(showToDoList);
}