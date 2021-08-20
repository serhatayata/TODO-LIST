//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event listeners
todoButton.addEventListener('click', addToDo)
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo)
//Functions
function addToDo(event){
    event.preventDefault(); // Form için Submit islemini durdurur...
    // Todo DIV 
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")
    // Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    // YAZMA ISLEMI
    var c = $.post( "https://www.fehmivelioglu.com/todo.php", {auth : "*****" , action : "*****", duty : todoInput.value })
    .done(function( data ) {
    trashButton.setAttribute("id",data)
    });
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); // Listi div içerisine ekledik.
    // Check Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    // APPEND TO LIST - LISTEYE EKLERIZ...
    todoList.appendChild(todoDiv)
    //CLEAR TODO VALUE
    todoInput.value = "";
}
function deleteCheck(e){
   // console.log(e.target);
   const item = e.target;
   //DELETE TODO
   if(item.classList[0] === 'trash-btn'){
       const todo = item.parentElement;
       todo.classList.add("fall");
       todo.addEventListener("transitionend",function(){
           //SILME ISLEMI
        var c = $.post( "https://www.fehmivelioglu.com/todo.php", {auth : "favel" , action : "DEL_DUTY" ,id : item.id })
        .done(function( data ) {
        });
        todo.remove();
       })
   }
   //CHECKMARK
   if(item.classList[0] === "complete-btn"){
       const todo = item.parentElement;
       todo.classList.toggle('completed');
   }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all" : 
            todo.style.display="flex"
              break;
            case "completed":
               if (todo.classList.contains('completed')){
                    todo.style.display = "flex";
               }
               else {   
                   todo.style.display="none";
               } break;
            case "uncompleted" :
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";

                }
                else {
                    todo.style.display="none";
                } break;    
        } 
    }
  )
}
/* ---------------------------- */
// OKUMA ISLEMI
var c = $.post( "https://www.fehmivelioglu.com/todo.php", {auth : "favel" , action : "GET_DUTIES"})
.done(function( data ) {
  var x= JSON.stringify(data)
  console.log(x);
  //ekleme
  try {
  data.forEach(element => {
      add1(element)
      console.log(element)
  });
  function add1(i){
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")
    // Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = i.duty;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); // Listi div içerisine ekledik.
    // Check Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    trashButton.setAttribute("id",i.id)
    console.log(trashButton)
    todoDiv.appendChild(trashButton)
    // APPEND TO LIST - LISTEYE EKLERIZ...
    todoList.appendChild(todoDiv)
  }
}
catch {
    console.log("HATA, Index degeri 0")
    alert ("Index 0")
}
});




  
