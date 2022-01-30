const TODO_KEY="toDos"; // localStorage에 저장할 키


export function onToDoSubmit(event,toDoList,input,schedule) {
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
        showToDoList(newToDoObj,schedule,toDoList);
        saveToDos(toDoList);
    }
}

function saveToDos(toDoList){
    // 입력된 ToDoList들을 localStorage에 저장시킨다.
    localStorage.setItem(TODO_KEY,JSON.stringify(toDoList));
}

function deleteToDo(event,toDoList){
    //html li에서 노출 삭제
    const li = event.target.parentElement;
    li.remove();
    //localstorage에서도 삭제하기
    toDoList=toDoList.filter(toDo => toDo.id!==parseInt(li.id));
    saveToDos(toDoList);
}

function changeDeleteIconBlack(event)
{
    const deletebtn = event.target;
    deletebtn.src="static/css/img/delete_black.png";
    deletebtn.style.width="20px";
    deletebtn.style.height="20px";
}
function changeDeleteIcon(event)
{
    const deletebtn = event.target;
    deletebtn.src="static/css/img/delete.png";
    deletebtn.style.width="20px";
    deletebtn.style.height="20px";
}
export function showToDoList(newToDoObj,schedule,toDoList){
    // const delete_btn = document.createElement("button");
    const delete_btn = document.createElement("img");
    const li = document.createElement("li");
    const span = document.createElement("span");
    
    li.id=newToDoObj.id;
    //추가
    delete_btn.src="static/css/img/delete.png";
    delete_btn.style.width="20px";
    delete_btn.style.height="20px";
    delete_btn.addEventListener("mouseover",changeDeleteIconBlack)
    delete_btn.addEventListener("mouseout",changeDeleteIcon);
    span.innerText=""+newToDoObj.text;
    //삭제
    delete_btn.addEventListener("click",(event)=>{deleteToDo(event,toDoList)});
    li.style.display="flex";
    li.style.justifyContent="space-between";
    li.style.width = "210px";
    

    li.appendChild(span);
    li.appendChild(delete_btn);
    schedule.appendChild(li);
}

// const savedToDoList = localStorage.getItem(TODO_KEY);
// if(savedToDoList!==null){
    // const parsedToDos=JSON.parse(savedToDoList);
    // toDoList=parsedToDos;
    // toDoList.forEach(todo=>showToDoList(todo, li,span,schedule));
// }