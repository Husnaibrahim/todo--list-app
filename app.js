const todoForm = document.getElementById('todo-form');
const todoinput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos =getTodos();
updateTodoList();

// When form is submitted:
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    addTodo();
});

// ADD TODO
function addTodo() {
    const todoText = todoinput.value.trim();

    if (todoText.length > 0) {
        const todoObject ={
            text:todoText,
            completed:false,
        }
        allTodos.push(todoObject); 
        updateTodoList();
        SaveTodos();
        todoinput.value = ""; 
    }
}

// UPDATE LIST (clear and rebuild)
function updateTodoList() {
    todoListUL.innerHTML = "";

    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItems(todo, todoIndex);
        todoListUL.appendChild(todoItem);
    });
}

// CREATE TODO ITEM (<li>)
function createTodoItems(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoText = todo.text;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";


    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox">
            <img src="tick.jpg" style="width: 15px; height: 15px;">
        </label>

        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>

        <button class="delete-button" data-index="${todoIndex}">
            <img src="wastbin.jpg" style="height: 15px; width: 15px;">
        </button>
    `;
    const deletebutton = todoLI.querySelector(".delete-button");
    deletebutton.addEventListener("click",()=>{
        deleteTodoitem(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        SaveTodos();
    })
    checkbox.checked = todo.completed;


    return todoLI;
}
function deleteTodoitem(todoIndex){
    allTodos = allTodos.filter((_, i) => i !==todoIndex);
    SaveTodos();
    updateTodoList();
}

function SaveTodos(){



    const todojson = JSON.stringify(allTodos);
    localStorage.setItem("todos",todojson);//it is use to save data and it has 2 parameters a key ans a value NOTE: only string values can be stored in the local storage so we nee to convert our string to json value.
}
//LOADING TODOES FROM THE LOCAL STORAGE SO THAT IS WILL APPEAR EVEN IF WE RELOADED THE PAGE.
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
     return JSON.parse(todos);//json.parse COVERT STRINGS BACK INTO AN ARRAY


}