const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterOption = document.querySelector(".filter-todo");
const progressBar = document.getElementById("progress");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTaskElement(taskText);
    taskInput.value = "";
    updateProgress();
  }
});

function createTaskElement(text) {
  const li = document.createElement("li");
  li.classList.add("task");

  const taskContent = document.createElement("span");
  taskContent.innerText = text;
  taskContent.classList.add("task-text");

  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = "✔️";
  completeBtn.classList.add("complete-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🔥";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(taskContent);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

taskList.addEventListener("click", (e) => {
  const item = e.target;

  if (item.classList.contains("delete-btn")) {
    const task = item.parentElement;
    task.remove();
    updateProgress();
  }

  if (item.classList.contains("complete-btn")) {
    const task = item.parentElement;
    task.classList.toggle("completed");
    updateProgress();
  }
});

filterOption.addEventListener("change", (e) => {
  const tasks = taskList.childNodes;
  tasks.forEach((task) => {
    if (task.nodeType === 1) {
      switch (e.target.value) {
        case "all":
          task.style.display = "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("completed") ? "flex" : "none";
          break;
        case "Not completed":
          task.style.display = !task.classList.contains("completed") ? "flex" : "none";
          break;
      }
    }
  });
});

function updateProgress() {
  const tasks = document.querySelectorAll(".task");
  const completed = document.querySelectorAll(".task.completed");
  const percent = tasks.length > 0 ? (completed.length / tasks.length) * 100 : 0;
  progressBar.value = percent;
}
