let userNameLog = document.getElementById("UserNameLogin")
let passwordLog =document.getElementById("PasswordLogin")
let loginButton = document.getElementById("LoginButton")
let errorMessageLog = document.getElementById("ErrorMessageLog")
let successMessageLog = document.getElementById("SuccessMessageLog")

async function hashPassword(password) {
    let encodedPassword = new TextEncoder().encode(password);
    let hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);
    return Array.from(new Uint8Array(hashBuffer), byte => byte.toString(16).padStart(2, "0")).join("");
}

//  Function to handle user login
async function handleUserLog(e){
    e.preventDefault();
    let userName = userNameLog.value.trim();
    let password = passwordLog.value.trim();
    errorMessageLog.textContent = "";
    successMessageLog.textContent = "";
    let massageFields = [];
    if(!userName)massageFields.push("User Name");
    if(!password || password.length < 6 || password.length > 100 || password.includes(" ") || password.includes("\t") || password.includes("\n") || password.includes("\r") || !/[a-zA-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password))massageFields.push("Password");
    if(massageFields.length > 0){
    errorMessageLog.textContent = "Please fill in the following fields: " + massageFields.join(", ");
    return
}
let storgeDate = localStorage.getItem("user")
if(!storgeDate){
    errorMessageLog.textContent = "No registered user found. Please sign up first."
    return;
}
let storeUser = JSON.parse(storgeDate)
let passwordHash = await hashPassword(password);
let isValidPassword = passwordHash === storeUser.password;
if (!isValidPassword && password === storeUser.password) {
    storeUser.password = passwordHash;
    localStorage.setItem("user", JSON.stringify(storeUser));
    isValidPassword = true;
}
if(userName === storeUser.userName && isValidPassword){
    successMessageLog.textContent = "Login successful! Redirecting..."
    setTimeout(()=>{window.location="index.html"},1500)
}
else{
        errorMessageLog.textContent = "Invalid username/email or password!"
    }
}
loginButton.addEventListener("click",handleUserLog)