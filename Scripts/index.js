let user = JSON.parse(localStorage.getItem("user"));

const managerurl = `https://tasky-app-production.up.railway.app/tasky/manager/${user.email}`;
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

    let sprintcard = document.createElement("div");
    sprintcard.className = "sprintcard";

    let upper = document.createElement("div");

    let c1 = document.createElement("div");
    c1.innerHTML =
      '<span class="material-icons md-18"> bookmark </span> ' +
      "Sprint " +
      el.id;

    let c2 = document.createElement("div");
    c2.innerText = el.startDate;

    let c3 = document.createElement("div");
    c3.innerText = el.description;

    let lower = document.createElement("div");

    let c4 = document.createElement("div");
    c4.innerText = "Tasks  " + el.tasks.length;

    let c5 = document.createElement("div");
    c5.className = "namecurcle";
    c5.innerText = el.dueDate.slice(8, 10);

    upper.append(c1, c2);
    lower.append(c4, c5);
    sprintcard.append(upper, c3, lower);
    cont.append(sprintcard);
  });
}

function employeeData(data) {
  let empdata = data.employees;
  document.querySelector("#empdata").innerHTML = null;
  empdata.forEach((el) => {
    let cont = document.querySelector("#empdata");

    let sprintcard = document.createElement("div");
    sprintcard.className = "sprintcard";

    let upper = document.createElement("div");

    let c1 = document.createElement("div");
    c1.innerHTML =
      '<span class="material-icons md-18"> bookmark </span> ' + "EMP " + el.id;

    let c2 = document.createElement("div");
    c2.innerText = el.name;

    let c3 = document.createElement("div");
    c3.innerText = el.email;

    let lower = document.createElement("div");

    let c4 = document.createElement("div");
    c4.innerText = el.role;

    let c5 = document.createElement("div");
    c5.className = "namecurcle";
    c5.innerText = el.email.slice(0, 1).toUpperCase();

    let c6 = document.createElement("div");
    c6.innerHTML = `<span class="material-icons  delete">delete_forever</span>`;
    c6.addEventListener("click",() => {
      deleteEmployee(el);
    })

    upper.append(c1, c2);
    lower.append(c4, c5,c6);
    sprintcard.append(upper, c3, lower);
    cont.append(sprintcard);
  });

  let user = JSON.parse(localStorage.getItem("empdata")) || { value: false };

  if (user.value == false) {
    
    user.value = true;
    localStorage.setItem("empdata", JSON.stringify(user));
  } else {
    document.querySelector("#empdata").innerHTML = null;
    user.value = false;
    localStorage.setItem("empdata", JSON.stringify(user));
    
  }
}

// Ad user ***************************************************
document.querySelector(".closediv").addEventListener("click", closeempform);
function closeempform() {
  document.querySelector(".empdiv").style.display = "none";
}
document.querySelector("#addemp").addEventListener("click", addemployee);
function addemployee() {
  document.querySelector(".empdiv").style.display = "flex";
}

document.querySelector("#submitemp").addEventListener("click", submitempdata);
function submitempdata(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let role = document.getElementById("role").value;

  if (name != "" && email != "" && role != "") {
    let user = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      role: document.getElementById("role").value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `https://tasky-app-production.up.railway.app/tasky/employee/${user.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console("error", error));
    window.location.reload();
  } else {
    alert("form cannot be empty");
  }
}


// deleteEmployee()  delete employee function ****************

function deleteEmployee(el) {
  console.log(el)
}