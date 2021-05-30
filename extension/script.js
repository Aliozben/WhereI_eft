var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var labeledTasksHolder = document.getElementById("labeled-tasks"); //labeled-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};
var urls =
  localStorage.getItem("exURLS") !== null
    ? JSON.parse(localStorage.getItem("exURLS"))
    : [];
console.log(urls);
// urls.forEach(value => {
//   console.log(value);
//   var listItem = createNewTaskElement(value);
//   labeledTasksHolder.appendChild(listItem);
//   console.log("!");
//   bindTaskEvents(listItem);
// });
var addTask = function () {
  console.log("22");
  var listItem = createNewTaskElement(taskInput.value);
  urls.push(taskInput.value);
  localStorage.setItem("exURLS", JSON.stringify(urls));
  labeledTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem);
  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBut = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    //Switch from .editMode
    editBut.innerText = "Edit";
    label.innerText = editInput.value;
  } else {
    editBut.innerText = "Save";
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem) {
  console.log("Bind List item events");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};
