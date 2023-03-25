const managerurl = `https://tasky-app-production.up.railway.app/tasky/manager/aman%40gmail.com`;
const alltask = `https://tasky-app-production.up.railway.app/tasky/tasks/`;
managerData(managerurl);
let data;
async function managerData(managerurl) {
  let res = await fetch(managerurl);
  let data = await res.json();
  showData(data);
}
tasktable(alltask)
document.querySelector("#reset").addEventListener("click", () => {
 tasktable(alltask);
});

async function tasktable(alltask) {
  let res = await fetch(alltask);
  let data = await res.json();
  showtask(data);
}



function showData(data) {
  document.querySelector(".welcome").innerText = "Welcome, " + data.name;
  document.querySelector(".namecurcle").innerText = data.email
    .slice(0, 1)
    .toUpperCase();

  let sprint = data.sprints;

  sprint.forEach((el) => {
    
    let cont = document.querySelector("#totalsprints");

    let sprintcard = document.createElement("div");
    sprintcard.className = "sprintcard";
    sprintcard.addEventListener("click", () => {
      showtask(el.tasks);
    });

    let c1 = document.createElement("div");
    c1.innerHTML =
      '<span class="material-icons md-18"> bookmark </span> ' +
      "Sprint " +
      el.id;

    sprintcard.append(c1);
    cont.append(sprintcard);
  });
}

function showtask(el) {
  
  let col1 = document.querySelector("#col1");
  col1.innerHTML = null;
  let col2 = document.querySelector("#col2");
  col2.innerHTML = null;
  let col3 = document.querySelector("#col3");
  col3.innerHTML = null;
  el.forEach((el) => {
    let taskcard = document.createElement("div");
    taskcard.className = "taskcard";

    let c2 = document.createElement("div");
    c2.innerText = el.description;

    let lower = document.createElement("div");
    lower.className = "tasklower";

    let c1 = document.createElement("div");
    c1.innerHTML =
      '<span class="material-icons md-18"> bookmark </span> ' +
      "Task  " +
      el.id;

    let c5 = document.createElement("div");
    c5.className = "namecurcle";
    c5.innerText = el.employee.email.slice(0, 1).toUpperCase();
    lower.append(c1, c5);
    taskcard.append(c2, lower);

    if (el.status == "TODO") {
      col1.append(taskcard);
    } else if (el.status == "DONE") {
      col3.append(taskcard);
    } else {
      col2.append(taskcard);
    }
    //   cont.append(taskcard);
  });
}
