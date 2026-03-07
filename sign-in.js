// Get SignIn Info
const username = document.getElementById('login-name');
const password = document.getElementById('login-pas');
const signIn = document.getElementById('signIn');


// function for validation User / Pas
function validation() {

    // Username: admin Password: admin123
    if (username.value == "admin" && password.value == "admin123") {
        window.location.assign("Main-App.html");
        return;
    }
    else {
        alert("Invalid Username or Password! :(");
    }
}