// Defining The UI Components Of The UI
const taskForm = document.querySelector("#taskForm");
const taskInputField = document.querySelector("#taskInput");
const taskFilter = document.querySelector("#taskFilter");
const taskCollection = document.querySelector("#taskListCollection");
const btnClear = document.querySelector("#clearBtn");
const actionform = document.querySelector(".card-action");

loadingEvntListners();

//Loading All Event Listers
function loadingEvntListners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event
  taskForm.addEventListener("submit", addnewTask);

  //   Remove The Tasks From The List
  taskCollection.addEventListener("click", removeTask);

  //   Clear All the Tasks At Once
  btnClear.addEventListener("click", clearatonce);

  //   Filter The Task List
  taskFilter.addEventListener("keyup", filtertasks);
}

// Get Tasks Form Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    //   < ===== Creating the Li (Task List Items) ===== >
    const li = document.createElement("li");
    //   Add the Class to the Element
    li.className = "collection-item";
    //   Creating the text node to appedn to li
    li.appendChild(document.createTextNode(task));
    //   Create new Link Element
    const link = document.createElement("a");
    //   Add class to the link
    link.className = "delete-item secondary-content";
    //   Add icon to html
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    //   Append the link to the li
    li.appendChild(link);
    //   Append the li to the ul
    taskCollection.appendChild(li);
  });
}

// Add New Task Function
function addnewTask(e) {
  e.preventDefault();
  if (taskInputField.value === "") {
    taskinputmzg("Please Add a Task", "red");
  } else {
    //   < ===== Creating the Li (Task List Items) ===== >
    const li = document.createElement("li");
    //   Add the Class to the Element
    li.className = "collection-item";
    //   Creating the text node to appedn to li
    li.appendChild(document.createTextNode(taskInputField.value));
    //   Create new Link Element
    const link = document.createElement("a");
    //   Add class to the link
    link.className = "delete-item secondary-content";
    //   Add icon to html
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    //   Append the link to the li
    li.appendChild(link);
    //   Append the li to the ul
    taskCollection.appendChild(li);

    // Store The Tasks In The Local Storage
    storeLocalStoage(taskInputField.value);

    // Clear The Input Filede
    taskInputField.value = "";

    taskinputmzg(`New Task is added to the list`, "green");
  }
}

// Task Input Filed Messages
function taskinputmzg(message, colorclass) {
  const mzgfield = document.createElement("div");
  mzgfield.classList = `card-panel ${colorclass} white-text`;
  mzgfield.appendChild(document.createTextNode(message));
  const btn = document.querySelector("#submitbtn");
  taskForm.appendChild(mzgfield);

  setTimeout(() => {
    document.querySelector(".card-panel").remove();
  }, 2000);
}

//Remove Tasks From The List
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure ?")) {
      e.target.parentElement.parentElement.remove();
      taskremovemzg("Task Have Been Removed", "orange");

      // Remove From Local Storage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    } else {
      taskremovemzg("You didn't Remove Any Tasks", "red");
    }
  }
}

// Clear All The Tasks At Once
function clearatonce(e) {
  if (confirm("Are you sure you need to clear all the tasks ?")) {
    while (taskCollection.firstChild) {
      taskCollection.removeChild(taskCollection.firstChild);
    }
    taskremovemzg("Your Task List Have Been Cleard", "orange");

    // Clearing The Tasks From Local Storage
    clearAllFromLS();
  } else {
    taskremovemzg("You didn't Remove Any Tasks", "red");
  }
}

// Clearing The Tasks From Local Storage
function clearAllFromLS() {
  localStorage.clear();
}

// Task Removing Message
function taskremovemzg(removemessage, reomvecolorclass) {
  const message = document.createElement("div");
  message.classList = `card-panel ${reomvecolorclass} white-text`;
  message.appendChild(document.createTextNode(removemessage));
  actionform.appendChild(message);

  setTimeout(() => {
    document.querySelector(".card-panel").remove();
  }, 2000);
}

// Filter Through The Tasks
function filtertasks(e) {
  const filtertext = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(filtertext) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Store The Tasks In The Local Storage
function storeLocalStoage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Removing Tasks From Local Storage
function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
