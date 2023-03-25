const managerurl = `https://tasky-app-production.up.railway.app/tasky/manager/aman%40gmail.com`;
managerData(managerurl);
let data;
async function managerData(managerurl) {
    let res =  await fetch(managerurl);
    let data = await res.json();
    console.log(data)
    showData(data);
    document.querySelector(".emp").addEventListener("click", () => {
        employeeData(data);
    });
    
}

function showData(data) {
    document.querySelector(".welcome").innerText = "Welcome, " + data.name
    document.querySelector(".namecurcle").innerText = data.email.slice(0, 1).toUpperCase();
  
    let sprint = data.sprints
   
    sprint.forEach((el) => {
        
        let cont = document.querySelector("#totalsprints");

        let sprintcard = document.createElement("div")
        sprintcard.className = "sprintcard"

        let upper = document.createElement("div")

        let c1 = document.createElement("div")
        c1.innerHTML = '<span class="material-icons md-18"> bookmark </span> '+ "Sprint "+el.id

        let c2 = document.createElement("div");
        c2.innerText = el.startDate;

        let c3 = document.createElement("div");
        c3.innerText = el.description;

        let lower = document.createElement("div");

        let c4 = document.createElement("div");
        c4.innerText = "Tasks  " + el.tasks.length
        
        let c5 = document.createElement("div")
        c5.className = "namecurcle";
        c5.innerText = el.dueDate.slice(8,10)

        upper.append(c1, c2);
        lower.append(c4,c5)
        sprintcard.append(upper, c3, lower);
        cont.append(sprintcard)



    })
}

function employeeData(data) {
  
    let empdata = data.employees;
    document.querySelector("#empdata").innerHTML = null
  empdata.forEach((el) => {
    console.log(el);
    let cont = document.querySelector("#empdata");

    let sprintcard = document.createElement("div");
    sprintcard.className = "sprintcard";

    let upper = document.createElement("div");

    let c1 = document.createElement("div");
    c1.innerHTML =
      '<span class="material-icons md-18"> bookmark </span> ' + "EMP " + el.id;

    let c2 = document.createElement("div");
    c2.innerText =  el.name;

    let c3 = document.createElement("div");
    c3.innerText = el.email;

    let lower = document.createElement("div");

    let c4 = document.createElement("div");
    c4.innerText = el.role

    let c5 = document.createElement("div");
    c5.className = "namecurcle";
      c5.innerText = el.email.slice(0, 1).toUpperCase();

    upper.append(c1, c2);
    lower.append(c4, c5);
    sprintcard.append(upper, c3, lower);
    cont.append(sprintcard);
  });
}