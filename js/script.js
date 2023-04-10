// timeout before a callback is called
let timeout;
const password = document.getElementById('password')
    , confirm_password = document.getElementById("password_confirm");
let strengthVisual = document.getElementById("pass_strength");
let mediumPassword = new RegExp("((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))");
let strongPassword = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");

function strengthCheck(passwordParameter) {
    if (strongPassword.test(passwordParameter)) {
        strengthVisual.style.backgroundColor = "green";
        strengthVisual.style.boxShadow = "2px 2px 3px black"
        strengthVisual.textContent = "✔ There it is!";
    } else if (mediumPassword.test(passwordParameter)) {
        strengthVisual.style.backgroundColor = "orange";
        strengthVisual.style.boxShadow = "2px 2px 3px black"
        strengthVisual.textContent = "⬇ Almost there";
    } else {
        strengthVisual.style.backgroundColor = "red";
        strengthVisual.style.boxShadow = "2px 2px 3px black"
        strengthVisual.textContent = "⬇ Pathetic"
    }
}

// Adding an input event listener when a user types to the  password input 
password.addEventListener("input", () => {

    //The visual is hidden by default. Here, we make it visible
    strengthVisual.style.display = "block";
    clearTimeout(timeout);

    //We then call the strengthCheck function as a callback then pass the typed password to it
    timeout = setTimeout(() => strengthCheck(password.value), 500);
    
    //Incase a user clears the text, the badge is hidden again
    if (password.value.lenth !== 0) {
        strengthVisual.style.display != "block";
    } else {
        strengthVisual.style.display = "none";
    }
});

const valid = document.getElementById('pass_match');
    
function validatePassword(){
    if(password.value != password_confirm.value) {
    password_confirm.setCustomValidity("Error: Passwords don't match. Please try again.");
    valid.textContent = "*Passwords don't match bruh";
    } else {
    password_confirm.setCustomValidity('');
    valid.textContent = "";
    }
}

password.onchange = validatePassword;
password_confirm.onkeyup = validatePassword;
// password.setCustomValidity("*Password must include at least one uppercase letter, number & special character... or so help me Rick, I'll slap the sh*t out of you.");