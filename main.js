let loginForm = document.getElementById("loginForm");
let registerForm = document.getElementById("registerForm");
let linkToRegister = document.getElementById("wantToRegister");
let linkToLogin = document.getElementById("wantToLogin");
let loginButton = document.getElementById("login");
let registerButton = document.getElementById("register");

registerForm.style.display = "none";
linkToRegister.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
});
linkToLogin.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
});

let usersFromLS = localStorage.getItem("users");
let users;

if (usersFromLS) {
    users = JSON.parse(usersFromLS);
} else {
    users = [];
}

function checkEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

let registerPassword = document.getElementById("registerPassword");

registerPassword.onkeyup = function (event) {
    let value = event.target.value;
    let errors = {
        badLength: "Password must have at least 8 charachters",
        noCapital: "The password must have at least one capital letter",
        noNumber: "The password must have at least one number",
        noSpecial: "The password must have at least one special character",
    };

    let hasBadLength = value.length < 8;
    let hasCapital = /[A-Z]/g.test(value);
    let hasNumber = /[0-9]/.test(value);
    let hasSpecialCase = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
        value
    );

    let errorDiv = document.getElementById("regErrors");
    errorDiv.innerHTML = "";
    let errorStrings = [];

    if (hasBadLength) {
        errorStrings.push(errors.badLength);
    }
    if (!hasCapital) {
        errorStrings.push(errors.noCapital);
    }
    if (!hasNumber) {
        errorStrings.push(errors.noNumber);
    }
    if (!hasSpecialCase) {
        errorStrings.push(errors["noSpecial"]);
    }
    if (value.length) {
        for (const errorText of errorStrings) {
            let errorNode = document.createElement("small");
            errorNode.innerText = errorText;
            errorNode.style.color = "red";
            errorNode.style.display = "block";
            errorDiv.append(errorNode);
        }
    }

    let validPassword =
        hasSpecialCase && hasNumber && hasCapital && !hasBadLength;

    if (!validPassword) {
        registerButton.setAttribute("disabled", "disabled");
    } else {
        registerButton.removeAttribute("disabled");
    }
};

let email2 = document.getElementById("confirmEmail");
let email1 = document.getElementById("registerEmail");

email2.onkeyup = function () {
    if (email1.value !== email2.value) {
        email2.style.border = "1px solid red";

    } else {
        email2.style.border = "1px solid green";
    }
};

registerButton.addEventListener("click", () => {
    let email1 = document.getElementById("registerEmail");
    let email2 = document.getElementById("confirmEmail");
    let regPassword = document.getElementById("registerPassword");

    if (checkEmail(email1.value) && email1.value === email2.value) {
        if (true || validatePassword(regPassword.value)) {
            users.push(new User(email1.value, regPassword.value));
            localStorage.setItem("users", JSON.stringify(users));

            email1.value = "";
            email2.value = "";
            regPassword.value = "";

            registerForm.style.display = "none";
            loginForm.style.display = "block";
            alert("Succesfully registered");
        }
    } else {
        alert(
            "Enter valid email and the email must be the same with confirmation email"
        );
    }
});

loginButton.addEventListener("click", () => {
    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");

    const userExists = users.find(
        (user) => user.email === loginEmail.value        
    );
    if (!userExists) {
        alert("There is no such user, wrong email");
        loginEmail.style.borderColor = "red";
    }
    console.log(userExists, users, loginEmail.value);


    const okPassword = userExists.password === loginPassword.value;
    if (userExists && userExists.email === loginEmail.value && okPassword) {
        alert("Congratulations you are logged in");
    } else if (!okPassword) {
        alert("wrong password");
    }

});

loginEmail.onchange = function(){
    if(loginEmail.value == "")
    {
        loginEmail.style.borderColor = "red";
    } else
    {
       loginEmail.style.borderColor = "green"; 
    }
}

loginPassword.onchange = function(){
    if(loginPassword.value == "")
    {
        loginPassword.style.borderColor = "red";
    } else
    {
       loginPassword.style.borderColor = "green"; 
    }
}
