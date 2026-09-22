
let userNameReg = document.getElementById("UserNameReg")
let emailReg = document.getElementById("EmailReg")
let passwordReg = document.getElementById("PasswordReg")
let errorMessageReg = document.getElementById("ErrorMessageReg")
let successMessageReg = document.getElementById("SuccessMessageReg")
let signUpButton = document.getElementById("SignUpButton")

async function hashPassword(password) {
    let encodedPassword = new TextEncoder().encode(password);
    let hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);
    return Array.from(new Uint8Array(hashBuffer), byte => byte.toString(16).padStart(2, "0")).join("");
}

// Function to handle user registration
async function handleRegistration(e) {
    e.preventDefault(); // Prevent form submission
    let userName = userNameReg.value.trim();
    let email = emailReg.value.trim();
    let password = passwordReg.value.trim();
    //validation
    errorMessageReg.textContent = "";
    successMessageReg.textContent = "";
    let massageFields = [];
    if(!userName)massageFields.push("User Name");
    if(!email || !email.includes("@") || !email.includes(".") || email.split("@")[1].split(".")[0].length === 0 || email.split("@")[0].length === 0 || email.length > 100 || email.length === 0)massageFields.push("Email");
    if(!password || password.length < 6 || password.length > 100 || password.includes(" ") || password.includes("\t") || password.includes("\n") || password.includes("\r") || !/[a-zA-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password))massageFields.push("Password");
    if(massageFields.length > 0){
        errorMessageReg.textContent = "Please fill in the following fields: " + massageFields.join(", ");
    }else{
        let user = {
            userName: userName,
            email: email,
            password: await hashPassword(password)
        };
        localStorage.setItem("user", JSON.stringify(user));
        successMessageReg.textContent = "Registration successful!";
        setTimeout(()=>{window.location="login.html"},1500)
    }
}
signUpButton.addEventListener("click", handleRegistration)