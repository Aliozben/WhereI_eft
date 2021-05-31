var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var labeledTasksHolder = document.getElementById("labeled-tasks");
var urls = localStorage.getItem("WILurls")
  ? JSON.parse(localStorage.getItem("WILurls"))
  : [];

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

var addTask = function () {
  var listItem = createNewTaskElement(taskInput.value);
  urls.push(taskInput.value);
  localStorage.setItem("WILurls", JSON.stringify(urls));
  labeledTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem);
  taskInput.value = "";
};

var localSave = function (text) {
  urls.push(text);
  localStorage.setItem("WILurls", JSON.stringify(urls));
};

var localDelete = function (text) {
  urls.splice(urls.indexOf(text), 1);
  localStorage.setItem("WILurls", JSON.stringify(urls));
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
    localSave(editInput.value);
    label.innerText = editInput.value;
  } else {
    editBut.innerText = "Save";
    localDelete(label.innerText);
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  var text = listItem.getElementsByTagName("label")[0].innerText;
  localDelete(text);
};

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem) {
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};

urls.forEach(value => {
  var listItem = createNewTaskElement(value);
  labeledTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem);
});
