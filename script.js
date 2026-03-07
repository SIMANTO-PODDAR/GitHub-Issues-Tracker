// Get Elements

const username = document.getElementById('login-name');
const password = document.getElementById('login-pas');
const signIn = document.getElementById('signIn');

// Get Top Btn 
const allBtn = document.getElementById('btn-all');
const openBtn = document.getElementById('btn-open');
const closedBtn = document.getElementById('btn-closed');


// function for Filter & color activeBtn
function filter(id) {
    allBtn.classList.remove('btn-primary');
    openBtn.classList.remove('btn-primary');
    closedBtn.classList.remove('btn-primary');

    const activeBtn = document.getElementById(id).classList.add('btn-primary');
}