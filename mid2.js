document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addButton = document.getElementById("addButton");
    const clearButton = document.getElementById("clearButton");
  
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };
  
    const saveTasks = () => {
      const tasks = [...taskList.children].map(li => ({
        text: li.querySelector(".task-text").innerText,
        completed: li.classList.contains("completed"),
      }));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const addTaskToDOM = (text, completed = false) => {
      const li = document.createElement("li");
      li.className = completed ? "completed" : "";
      
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = completed;
      checkbox.addEventListener("change", () => {
        li.classList.toggle("completed");
        saveTasks();
      });
  
      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.innerText = text;
  
      taskText.addEventListener("dblclick", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = taskText.innerText;
        input.className = "edit-input";
  
        input.addEventListener("blur", () => finishEditing(input, taskText));
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") finishEditing(input, taskText);
        });
  
        li.replaceChild(input, taskText);
        input.focus();
      });
  
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.innerText = "x";
      deleteButton.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
  
      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    };
  
    const finishEditing = (input, taskText) => {
      if (input.value.trim() !== "") {
        taskText.innerText = input.value;
      }
      const li = input.parentElement;
      li.replaceChild(taskText, input);
      saveTasks();
    };
  
    addButton.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (text) {
        addTaskToDOM(text);
        saveTasks();
        taskInput.value = "";
      }
    });
  
    clearButton.addEventListener("click", () => {
      taskList.innerHTML = "";
      saveTasks();
    });
  
    loadTasks();
  });
  