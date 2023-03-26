let user = JSON.parse(localStorage.getItem("user"));
const managerurl = `https://tasky-app-production.up.railway.app/tasky/manager/${user.email}`;

managerData(managerurl);

async function managerData(managerurl) {
  let res = await fetch(managerurl);
  let data = await res.json();
  showData(data);

  showtask(data.sprints[0].tasks);
  localStorage.setItem("currsprint", JSON.stringify(data.sprints[0].id));
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
      localStorage.setItem("currsprint",JSON.stringify(el.id))
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
    taskcard.draggable = "true";

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
    if (el.employee != null) {
      c5.innerText = el.employee.email.slice(0, 1).toUpperCase();
    }

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

// Add task ***************************************************

document.querySelector(".closediv").addEventListener("click", closeempform);
function closeempform() {
  document.querySelector(".empdiv").style.display = "none";
}
document.querySelector("#addtask").addEventListener("click", addemployee);
function addemployee() {
  document.querySelector(".empdiv").style.display = "flex";
  
}

document.querySelector("#submittask").addEventListener("click", submitsprintdata);
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

    let currsprint = JSON.parse(localStorage.getItem("currsprint"));
    console.log(currsprint)

    fetch(
      `https://tasky-app-production.up.railway.app/tasky/tasks/${currsprint}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
  } else {
    alert("form cannot be empty");
  }
}
