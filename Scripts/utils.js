// logout functionality ******************************

document.getElementById("logout").addEventListener("click", logoutsession);
function logoutsession() {
    console.log("fa")
    let response = confirm("Are you sure want to logout")
    console.log(response)
    if (response == true) {
        localStorage.setItem("user", {})
        window.location.href = "./index.html"
    }
}