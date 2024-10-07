// Switch entre formularios de Iniciar Sesión y Registro
const btnSignIn = document.getElementById("sign-in"),
    btnSignUp = document.getElementById("sign-up"),
    containerFormRegister = document.querySelector(".register"),
    containerFormLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", () => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", () => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide");
});

// Función para validar solo letras
document.addEventListener("DOMContentLoaded", () => {
    const nombreUsuarioInput = document.querySelector("#userName");
    if (nombreUsuarioInput) {
        nombreUsuarioInput.addEventListener("keypress", soloLetras);
    }
});

function soloLetras(event) {
    if (!event.key.match(/[A-Za-z\s]/) && !esTeclaPermitida(event)) {
        event.preventDefault();
    }
}

function esTeclaPermitida(event) {
    return ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key);
}

// Validaciones del formulario de registro
document.addEventListener("DOMContentLoaded", () => {
    const formRegister = document.querySelector(".form__register");
    const userName = formRegister.querySelector("#userName");
    const userEmail = formRegister.querySelector("#userEmail");
    const userPassword = formRegister.querySelector("#userPassword");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(input, message) {
        const parent = input.parentElement;
        let error = parent.querySelector("small");
        if (!error) {
            error = document.createElement("small");
            parent.appendChild(error);
        }
        error.textContent = message;
        error.style.color = "red";
        input.classList.add("error");
        input.classList.remove("success");
    }

    function showSuccess(input) {
        const parent = input.parentElement;
        let error = parent.querySelector("small");
        if (error) {
            error.textContent = "";
        }
        input.classList.add("success");
        input.classList.remove("error");
    }

    // Validar nombre de usuario
    function validateUserName() {
        const value = userName.value;
        if (!value) {
            showError(userName, "El nombre de usuario no puede estar vacío.");
        } else if (/\d/.test(value)) {
            showError(userName, "El nombre de usuario no puede contener números.");
        } else if (value.length < 3 || value.length > 40) {
            showError(userName, "El nombre de usuario debe tener entre 3 y 40 caracteres.");
        } else {
            showSuccess(userName);
        }
    }

    // Validar correo electrónico
    function validateEmail(input) {
        const value = input.value;
        if (!value) {
            showError(input, "El correo electrónico no puede estar vacío.");
        } else if (!emailRegex.test(value)) {
            showError(input, "El correo electrónico no es válido.");
        } else {
            showSuccess(input);
        }
    }

    // Validar contraseña
    function validatePassword() {
        const value = userPassword.value;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        if (!value) {
            showError(userPassword, "La contraseña no puede estar vacía.");
        } else if (value.length < 8 || !hasUpperCase || !hasNumber) {
            showError(userPassword, "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
        } else {
            showSuccess(userPassword);
        }
    }

    // Eventos de validación en tiempo real
    userName.addEventListener("input", validateUserName);
    userEmail.addEventListener("input", () => validateEmail(userEmail));
    userPassword.addEventListener("input", validatePassword);

    // Validar todo antes de enviar el formulario de registro
    formRegister.addEventListener("submit", (event) => {
        validateUserName();
        validateEmail(userEmail);
        validatePassword();

        if (formRegister.querySelectorAll(".error").length > 0) {
            event.preventDefault(); // Evitar envío si hay errores
        }
    });
});

// Validaciones del formulario de Iniciar Sesión
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.querySelector(".form__login");
    const loginEmail = formLogin.querySelector("#userEmailL");
    const loginPassword = formLogin.querySelector("#userPasswordL");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar correo electrónico en login
    function validateLoginEmail() {
        const value = loginEmail.value;
        if (!value) {
            showError(loginEmail, "El correo electrónico no puede estar vacío.");
        } else if (!emailRegex.test(value)) {
            showError(loginEmail, "El correo electrónico no es válido.");
        } else {
            showSuccess(loginEmail);
        }
    }

    // Validar contraseña en login
    function validateLoginPassword() {
        const value = loginPassword.value;
        if (!value) {
            showError(loginPassword, "La contraseña no puede estar vacía.");
        } else {
            showSuccess(loginPassword);
        }
    }

    // Eventos de validación en tiempo real en el login
    loginEmail.addEventListener("input", validateLoginEmail);
    loginPassword.addEventListener("input", validateLoginPassword);

    // Validar todo antes de enviar el formulario de login
    formLogin.addEventListener("submit", (event) => {
        validateLoginEmail();
        validateLoginPassword();

        if (formLogin.querySelectorAll(".error").length > 0) {
            event.preventDefault(); // Evitar envío si hay errores
        }
    });
});

// Manipulación del historial para evitar volver a la página anterior
window.onload = function() {
    history.pushState(null, null, location.href);
    history.replaceState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
};