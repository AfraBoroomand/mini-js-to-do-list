const taskform = document.getElementById("taskform");
const taskinput = document.getElementById("taskinput");
const tasklist = document.getElementById("tasklist");
const taskcount = document.getElementById("taskcount");
const emptystate = document.getElementById("emptystate");
const formmsg = document.getElementById("formmsg");
let totalTasks = 0;
function updateUI() {
  taskcount.textContent = totalTasks;
  if (totalTasks === 0) {
    emptystate.style.display = "flex";
  } else {
    emptystate.style.display = "none";
  }
}
function createTask(tasktext) {
  let taskItem = document.createElement("li");
  taskItem.classList.add("task");
  let taskLabel = document.createElement("span");
  taskLabel.classList.add("task-text");
  taskLabel.textContent = tasktext;
  let actions = document.createElement("div");
  actions.classList.add("action");
  let donebtn = document.createElement("button");
  donebtn.classList.add("icon-btn");
  donebtn.textContent = "✅";
  donebtn.setAttribute("type", "button");
  donebtn.setAttribute("aria-label", "تغییر وضعیت انجام کار");
  donebtn.setAttribute("aria-pressed", "false");
  donebtn.addEventListener("click", function () {
    let isDone = taskItem.classList.toggle("done");
    donebtn.setAttribute("aria-pressed", String(isDone));
  });
  let deletebtn = document.createElement("button");
  deletebtn.classList.add("icon-btn");
  deletebtn.classList.add("delete-btn");
  deletebtn.textContent = "❌";
  deletebtn.setAttribute("type", "button");
  deletebtn.setAttribute("aria-label", "حذف کار");
  deletebtn.addEventListener("click", function () {
    taskItem.remove();
    totalTasks -= 1;
    updateUI();
  });
  actions.appendChild(donebtn);
  actions.appendChild(deletebtn);
  taskItem.appendChild(taskLabel);
  taskItem.appendChild(actions);
  tasklist.appendChild(taskItem);
  totalTasks += 1;
  updateUI();
}
taskform.addEventListener("submit", function (event) {
  event.preventDefault();
  let tasktext = taskinput.value.trim();
  if (tasktext === "") {
    formmsg.textContent = "لطفاً متن کار را وارد کنید.";
    formmsg.classList.add("visible");
    return;
  }
  formmsg.textContent = "";
  formmsg.classList.remove("visible");
  createTask(tasktext);
  taskinput.value = "";
});
updateUI();