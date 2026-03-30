let draggedTask = null

window.onload = () => {
loadTasks()
}


function addTask(){

let input = document.getElementById("taskInput")

if(input.value === "") return

let task = createTask(input.value)

document.getElementById("todo").appendChild(task)

saveTasks()

input.value = ""
}


function createTask(text){

let div = document.createElement("div")

div.className = "task"
div.draggable = true
div.innerHTML = `
<span>${text}</span>
<button onclick="deleteTask(this)">✖</button>
`


div.addEventListener("dragstart", () => {
draggedTask = div
})

return div
}


function deleteTask(btn){
btn.parentElement.remove()
saveTasks()
}


document.querySelectorAll(".column").forEach(col=>{

col.addEventListener("dragover",(e)=>{
e.preventDefault()
})

col.addEventListener("drop",()=>{
if(draggedTask){
col.appendChild(draggedTask)
saveTasks()
}
})

})


function saveTasks(){

let data = {}

document.querySelectorAll(".column").forEach(col=>{

let tasks = []

col.querySelectorAll(".task span").forEach(t=>{
tasks.push(t.innerText)
})

data[col.id] = tasks

})

localStorage.setItem("tasks", JSON.stringify(data))

}


function loadTasks(){

let data = JSON.parse(localStorage.getItem("tasks"))

if(!data) return

for(let col in data){

data[col].forEach(text=>{

let task = createTask(text)
document.getElementById(col).appendChild(task)

})

}

}


document.querySelectorAll(".column").forEach(col=>{

col.addEventListener("dragover",(e)=>{
e.preventDefault()
col.style.background="rgba(29,185,84,0.2)"
})

col.addEventListener("dragleave",()=>{
col.style.background="rgba(255,255,255,0.08)"
})

col.addEventListener("drop",()=>{
col.style.background="rgba(255,255,255,0.08)"
})

})