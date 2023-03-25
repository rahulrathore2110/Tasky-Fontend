const managerurl = `https://tasky-app-production.up.railway.app/tasky/manager/aman%40gmail.com`;
const sprintget = `https://tasky-app-production.up.railway.app/tasky/sprint/8`;
managerData(managerurl);
let data;
async function managerData(managerurl) {
  let res = await fetch(managerurl);
  let data = await res.json();
  showData(data);
  document.querySelector(".emp").addEventListener("click", () => {
    employeeData(data);
  });
}

function showData(data) {
  document.querySelector(".welcome").innerText = "Welcome, " + data.name;
  document.querySelector(".namecurcle").innerText = data.email
    .slice(0, 1)
    .toUpperCase();

  let sprint = data.sprints;

  sprint.forEach((el) => {
    let cont = document.querySelector("#totalsprints");

    let sprintdata = document.createElement("div");
      sprintdata.id = el.id;
      sprintdata.style.display = "none"
    let sprintcard = document.createElement("div");
    sprintcard.className = "sprintraws";
    sprintcard.addEventListener("click", () => {
      gettask(el);
      console.log(el);
    });

    let c1 = document.createElement("div");
    c1.innerHTML =
      '<span class="material-icons"> grid_on </span> ' + "Sprint " + el.id;

    let c2 = document.createElement("div");
    c2.innerText = el.startDate;

    let c3 = document.createElement("div");
    c3.innerText = el.description;

    let c4 = document.createElement("div");
    c4.innerText = el.tasks.length + " Tasks";

    let c5 = document.createElement("div");
    c5.innerText = el.dueDate;

    sprintcard.append(c1, c2, c3, c5, c4);

    cont.append(sprintcard, sprintdata);
  });
}

function gettask(data) {
  let taskdata = data.tasks;
    let sprintcont = document.getElementById(`${data.id}`);
    sprintcont.style.display = "block";
    sprintcont.innerHTML = null
  taskdata.forEach((el) => {
    console.log(el);
    let cont = document.getElementById(`${data.id}`);

    let sprintcard = document.createElement("div");
    sprintcard.className = "sprintcard";

    let c1 = document.createElement("div");
    c1.innerHTML =
      '<span class="material-icons"> bookmark </span> ' + "Task  " + el.id;

    let c2 = document.createElement("div");
    c2.innerText = el.description;

    let c3 = document.createElement("div");
    c3.innerText = el.startDate;

    let c4 = document.createElement("div");
    c4.innerText = el.endDate;

    let c5 = document.createElement("div");
    c5.className = "namecurcle";
    c5.innerText = el.employee.email.slice(0, 1).toUpperCase();

    sprintcard.append(c1, c2, c3, c4, c5);
    cont.append(sprintcard);
  });
}
