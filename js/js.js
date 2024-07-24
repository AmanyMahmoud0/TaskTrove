let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = "";
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function editTask(id, newText) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, text: newText };
    }
    return task;
  });
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

function renderTasks() {
  const todoList = document.getElementById("todoList");
  const finishedList = document.getElementById("finishedList");

  todoList.innerHTML = "";
  finishedList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("checked");
    }

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");

    const editButton = document.createElement("button");
    editButton.innerHTML = '<img src="pics/edit.png" alt="Edit">';
    editButton.addEventListener("click", () => {
      const newText = prompt("Enter new text:", task.text);
      if (newText !== null) {
        editTask(task.id, newText.trim());
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<img src="pics/delete.png" alt="Delete">';
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });
    const toggleButton = document.createElement("button");
    toggleButton.innerHTML = task.completed
      ? '<img src="pics/undo.png" alt="Undo">'
      : '<img src="pics/done.png" alt="Done">';
    toggleButton.addEventListener("click", () => {
      toggleTask(task.id);
    });

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);
    actionsDiv.appendChild(toggleButton);

    li.appendChild(actionsDiv);

    if (task.completed) {
      finishedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}
