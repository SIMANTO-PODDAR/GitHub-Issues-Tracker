// DOM Elements
const usernameInput = document.getElementById('login-name');
const passwordInput = document.getElementById('login-pas');
const signInCard = document.getElementById('signIn');
const errorToast = document.getElementById('error-toast');
const errorMsg = document.getElementById('error-msg');
const passwordToggleIcon = document.getElementById('password-toggle-icon');

// Autofill helper
function autofillDemo() {
    usernameInput.value = "admin";
    passwordInput.value = "admin123";
    
    // Hide error if shown
    errorToast.classList.add('hidden');
    
    // Add brief animation/visual queue of autofill success
    usernameInput.classList.add('border-indigo-500/50');
    passwordInput.classList.add('border-indigo-500/50');
    setTimeout(() => {
        usernameInput.classList.remove('border-indigo-500/50');
        passwordInput.classList.remove('border-indigo-500/50');
    }, 1000);
}

// Toggle password text visibility
function togglePasswordVisibility() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggleIcon.classList.remove('fa-eye');
        passwordToggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        passwordToggleIcon.classList.remove('fa-eye-slash');
        passwordToggleIcon.classList.add('fa-eye');
    }
}

// Validate credentials
function validation() {
    const userVal = usernameInput.value.trim();
    const passVal = passwordInput.value.trim();

    if (userVal === "admin" && passVal === "admin123") {
        // Redirect on successful login
        window.location.assign("Main-App.html");
    } else {
        // Trigger card shake animation
        signInCard.classList.remove('animate-shake');
        // Force browser repaint to trigger animation again
        void signInCard.offsetWidth;
        signInCard.classList.add('animate-shake');

        // Show custom error toast message
        if (userVal === "" || passVal === "") {
            errorMsg.innerText = "Please fill in all fields.";
        } else {
            errorMsg.innerText = "Invalid Username or Password! :(";
        }
        errorToast.classList.remove('hidden');

        // Remove shake class after animation completes so it can be re-run
        setTimeout(() => {
            signInCard.classList.remove('animate-shake');
        }, 500);
    }
}