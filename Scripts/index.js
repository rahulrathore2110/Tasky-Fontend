const managerurl = `https://tasky-app-production.up.railway.app/tasky/manager/aman%40gmail.com`;
managerData(managerurl);
let data;
async function managerData(managerurl) {
    let res =  await fetch(managerurl);
    let data = await res.json();
    console.log(data)
    showData(data);
}

function showData(data) {
    document.querySelector(".welcome").innerText = "Welcome, " + data.name
    document.querySelector(".namecurcle").innerText = data.email.slice(0, 1).toUpperCase();
}

