const taskInput =
document.getElementById("taskInput");

const addBtn =
document.getElementById("addBtn");

const taskList =
document.getElementById("taskList");

const filterButtons =
document.querySelectorAll(".filter-btn");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

/* SAVE TASKS */

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

/* DISPLAY TASKS */

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active"){
            return !task.completed;
        }

        if(currentFilter === "completed"){
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach((task, index) => {

        const li =
        document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `

            <span>${task.text}</span>

            <div class="task-buttons">

                <button onclick="toggleTask(${index})">
                    ✓
                </button>

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}

/* ADD TASK */

addBtn.addEventListener("click", () => {

    const text =
    taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text,
        completed:false
    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

});

/* DELETE */

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}

/* COMPLETE */

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    renderTasks();

}

/* EDIT */

function editTask(index){

    const updated =
    prompt(
        "Edit task",
        tasks[index].text
    );

    if(updated !== null){

        tasks[index].text = updated;

        saveTasks();

        renderTasks();

    }

}

/* FILTERS */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter =
        button.dataset.filter;

        renderTasks();

    });

});

/* INITIAL RENDER */

renderTasks();