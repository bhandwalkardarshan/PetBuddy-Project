
let detailsObject = {};
window.addEventListener('load', () => {
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token'); detailsObject.token = token;
        const email = urlParams.get('email'); detailsObject.email = email;
        const userID = urlParams.get('userID'); detailsObject.userID = userID;
        console.log(detailsObject)
        document.getElementById('reset-email').textContent = detailsObject.email
    }, 2000)
})

const passwordCheckbox = document.getElementById('passwordCheckbox');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');

passwordCheckbox.addEventListener('change', function () {
    if (passwordCheckbox.checked) {
        newPasswordInput.type = 'text';
        confirmPasswordInput.type = 'text';
    } else {
        newPasswordInput.type = 'password';
        confirmPasswordInput.type = 'password';
    }
});


function validationPassword() {
    let passwordError = document.getElementById('password-error-1')
    let password = document.getElementById("newPassword").value;
    const passwordInput = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@!#$%^&*()-=_+[\]{}|\\;:'",.<>/?`~]{8,}$/.test(password);
    // console.log(password, passwordInput)
    if (passwordInput) {
        // console.log("Password is valid.");
        passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        // alert("Password is invalid. It should have a minimum length of 8 characters, contain at least one letter and one digit, and may include any symbol.");
        passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

function validationConfirmPassword() {
    let passwordError = document.getElementById('password-error')
    let password = document.getElementById("confirmPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    if (validationPassword() && password == newPassword) {
        // console.log("Password is valid.");
        passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

var Submitbutton = document.getElementById("Submit");
Submitbutton.addEventListener("click", function (e) {
    e.preventDefault();
    validateSubmit();
})
function validateSubmit() {
    let submitError = document.getElementById("submit-error")
    if (!validationPassword() || !validationConfirmPassword()) {
        alert(`Password Not Matched!`);
        submitError.innerHTML = "Please fill correct Data."
        return false
    } else {
        UpdatePassword();
        return true;
    }
}

function UpdatePassword() {
    let password = document.getElementById("confirmPassword").value;
    detailsObject.password = password;
    console.log(detailsObject);
    // make a requiest to server here 
    // ! send the detailsObject in Body
    fetch(`http://localhost:3000/mail/reset-password`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(detailsObject)
    }).then((data) => data.json()).then((data) => {
        alert(data.msg)
    }).catch((err) => {
        // console.log(err);
        alert(err)
    })
}
