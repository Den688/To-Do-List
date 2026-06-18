const inputBox = document.getElementById("input-box");
const prioritySelect = document.getElementById("priority-select");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Вы должны что-то написать!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        
        // Получаем приоритет и сохраняем его в данных элемента
        const priority = prioritySelect.value;
        li.classList.add(`priority-${priority}`);
        li.dataset.priority = priority;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Символ крестика
        li.appendChild(span);
        
        listContainer.appendChild(li);
        
        sortTasks(); // Сортируем список
    }
    inputBox.value = "";
    storeToDoList();
}

// Автоматическая сортировка: от высокого (3) к низкому (1)
function sortTasks() {
    const tasks = Array.from(listContainer.children);
    tasks.sort((a, b) => b.dataset.priority - a.dataset.priority);
    tasks.forEach(task => listContainer.appendChild(task));
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        storeToDoList();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        storeToDoList();
    }
}, false);

function storeToDoList() {
    localStorage.setItem("to-do-list", listContainer.innerHTML);
}

function restoreToDoList() {
    const savedData = localStorage.getItem("to-do-list");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

restoreToDoList();