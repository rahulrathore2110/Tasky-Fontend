let user = JSON.parse(localStorage.getItem("user"));
const managerurl = `https://tasky-app-production.up.railway.app/tasky/manager/${user.email}`;
const sprintget = `https://tasky-app-production.up.railway.app/tasky/sprint/8`;
managerData(managerurl);
let data;
async function managerData(managerurl) {
  let res = await fetch(managerurl);
  let data = await res.json();
  showData(data);
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
    sprintdata.style.display = "none";
    let sprintcard = document.createElement("div");
    sprintcard.className = "sprintraws";
    sprintcard.addEventListener("click", () => {
      gettask(el);
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

    let c6 = document.createElement("div");
    c6.innerHTML = `<span class="material-icons">unfold_more</span>`;
    sprintcard.append(c1, c2, c3, c5, c4, c6);

    cont.append(sprintcard, sprintdata);
  });
}

function gettask(data) {
  let taskdata = data.tasks;
  let sprintcont = document.getElementById(`${data.id}`);
  sprintcont.style.display = "block";
  sprintcont.innerHTML = null;
  taskdata.forEach((el) => {
   
    let cont = document.getElementById(`${data.id}`);

    let sprintcard = document.createElement("div");
    sprintcard.className = "sprintcard";

    let c1 = document.createElement("div");
    c1.innerHTML =
      '<span class="material-icons md-18"> bookmark </span> ' +
      "Task  " +
      el.id;

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

// Ad spring ***************************************************
document.querySelector(".closediv").addEventListener("click", closeempform);
function closeempform() {
  document.querySelector(".empdiv").style.display = "none";
}
document.querySelector("#addsprint").addEventListener("click", addemployee);
function addemployee() {
  document.querySelector(".empdiv").style.display = "flex";
}

document
  .querySelector("#submitsprint").addEventListener("click", submitsprintdata);
function submitsprintdata(event) {
  event.preventDefault();
  let description = document.getElementById("description").value;
  let startDate = document.getElementById("startdate").value;
  let dueDate = document.getElementById("enddate").value;

  if (description != "" && startDate != "" && dueDate != "") {
    let user = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      description: description,
      startDate: startDate,
      dueDate: dueDate,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://tasky-app-production.up.railway.app/tasky/sprint/${user.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload()
  } else {
    alert("form cannot be empty");
  }
}
