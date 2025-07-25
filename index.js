const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskTime = document.getElementById("taskTime");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if (taskText === "" || date === "" || time === "") {
      alert("Please enter task, date, and time.");
      return;
    }

    const li = document.createElement("li");
    
    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `<strong>${taskText}</strong><br><small>${date} at ${time}</small>`;

    const delBtn = document.createElement("button");
    delBtn.className = "deleteBtn";
    delBtn.textContent = "Delete";
    delBtn.onclick = () => taskList.removeChild(li);

    li.appendChild(taskInfo);
    li.appendChild(delBtn);
    taskList.appendChild(li);

    // Clear inputs
    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
  });