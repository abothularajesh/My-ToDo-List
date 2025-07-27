 const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskTime = document.getElementById("taskTime");
  const taskPriority = document.getElementById("taskPriority");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const taskInfo = document.createElement("div");
      taskInfo.className = "task-info";
      taskInfo.innerHTML = `
        <strong>${task.text}</strong><br>
        <small>${task.date} at ${task.time}</small><br>
        <span class="priority-${task.priority.toLowerCase()}"><small>Priority: ${task.priority}</small></span>
      `;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "editBtn";
      editBtn.onclick = () => editTask(index);

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "deleteBtn";
      delBtn.onclick = () => deleteTask(index);

      const btnGroup = document.createElement("div");
      btnGroup.className = "btn-group";
      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(delBtn);

      li.appendChild(taskInfo);
      li.appendChild(btnGroup);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const text = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;
    const priority = taskPriority.value;

    if (!text || !date || !time) {
      alert("Please enter task, date, and time.");
      return;
    }

    tasks.push({ text, date, time, priority });
    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
    taskPriority.value = "Low";
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function editTask(index) {
    const task = tasks[index];
    const newText = prompt("Edit Task", task.text);
    const newDate = prompt("Edit Date (yyyy-mm-dd)", task.date);
    const newTime = prompt("Edit Time (hh:mm)", task.time);
    const newPriority = prompt("Edit Priority (Low, Medium, High)", task.priority);

    if (newText && newDate && newTime && newPriority) {
      tasks[index] = {
        text: newText,
        date: newDate,
        time: newTime,
        priority: newPriority
      };
      saveTasks();
      renderTasks();
    }
  }

  addBtn.addEventListener("click", addTask);
  renderTasks();
