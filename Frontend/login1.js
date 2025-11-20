
document.addEventListener("DOMContentLoaded", function ()
     {
    var form = document.querySelector("#form");
    var password = document.querySelector("#password");
    var email = document.querySelector("#email");

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); 
        if (validateInputs()) {
            console.log("Logging in...");

            const userData = {
                email: email.value.trim(),
                password: password.value.trim(),
            };
            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token);

            try {
                    const response = await fetch("https://bloomtrack-herbal-plant-e-commerce-1jwk.onrender.com/user",
 {  
                  method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                        
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Login successful!", data.auth);
                    
                    if(data.auth.isProfiled){
                        console.log("Storing Token:", data.token);
                        localStorage.setItem("token", data.token); 
                        document.querySelector(".alert-success").style.display="block";
                        await new Promise((resolve) => setTimeout(resolve, 2000));
                        window.location.href = "products.html"; 
                            successmsg();
                    }
                    else{
                        if (!data.auth.isProfiled) {
                            console.log("Storing Token:", data.token);
                            localStorage.setItem("token", data.token); 
                             document.querySelector(".alert-profile").style.display="block";
                            profilemsg();   setTimeout(() => {
                                window.location.href = "profileget.html";  }, 3000); 
                        }
                        

                        
                    }
                    
                } else {
                    console.log("Login failed:", data.message);
                    document.querySelector(".alert-text").textContent="Login failed: " + data.message;
     
            document.querySelector(".alert-error-msg").style.display = "block"; 
            seterrormsg();
                }
            } catch (error) {
                console.error("Error:", error);
                document.querySelector(".alert-error").style.display="block";
                
                await new Promise((resolve) => setTimeout(resolve, 3000));
                
                 errormsg();
            }
        }
    });
});
function successmsg() {
    const successAlert = document.querySelector(".alert-success");
    if (successAlert) {
        successAlert.style.display = "flex";
        setTimeout(() => {
            successAlert.style.display = "none"; 
        }, 3000);
    }
}

function errormsg() {
    const errorAlert = document.querySelector(".alert-error");
    if (errorAlert) {
        errorAlert.style.display = "flex"; 
        setTimeout(() => {
            errorAlert.style.display = "none";
        }, 3000);
    }
}

function seterrormsg() {
    const errorMsgAlert = document.querySelector(".alert-error-msg");
    if (errorMsgAlert) {
        errorMsgAlert.style.display = "flex"; 
        setTimeout(() => {
            errorMsgAlert.style.display = "none";
        }, 3000);
    }
}
function profilemsg(){
    alertProfile =document.querySelector(".alert-profile");
    if(alertProfile){
        alertProfile.style.display="flex";
        setTimeout(() => {
            alertProfile.style.display="none";
        }, 3000);
    }

}
function validateInputs() {
    const passwordVal = password.value.trim();
    const emailVal = email.value.trim();
    let success = true;

    if (emailVal === "") {
        success = false;
        setError(email, "Email is required");
    } else if (!validateEmail(emailVal)) {
        success = false;
        setError(email, "Please enter a valid email");
    } else {
        setSuccess(email);
    }

    if (passwordVal === "") {
        success = false;
        setError(password, "Password is required");
    } else if (passwordVal.length < 8) {
        success = false;
        setError(password, "Password must be at least 8 characters");
    } else {
        setSuccess(password);
    }

    console.log("Validation status:", success); 
    return success;
}
function setError(element, message) {
    var inputGroup = element.closest('.input-group');   var errorElement = inputGroup.querySelector('.error');
    
    errorElement.innerText = message; 
    inputGroup.classList.add('error'); 
    inputGroup.classList.remove('success'); 
}

function setSuccess(element) {
    var inputGroup = element.closest('.input-group'); 
      var errorElement = inputGroup.querySelector('.error');
    
    errorElement.innerText = ''; 
    inputGroup.classList.remove('error'); 
    inputGroup.classList.add('success'); 
}
//mail check
const validateEmail = (email) =>{
    return String(email)
    .toLowerCase()
    .match(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    );
 };
 var sideNavbar=document.querySelector('.side-navbar');

function shownavbar(){
 sideNavbar.style.left='0%';}
 function closenavbar(){
sideNavbar.style.left='-60%';}
  function togglePassword() {
    var passwordField = document.getElementById("password");
    var passwordVal = passwordField.value.trim();
    var showPassword12=document.getElementById("showPassword");
    if (passwordVal === "") {
        
        setError(passwordField, "Password is required to show");
    } else {
        setSuccess(passwordField);
         if (passwordField.type === "password") {
            passwordField.type = "text";
            showPassword12.classList.remove('fa-eye');
            showPassword12.classList.add('fa-eye-slash');
           
        } 
        else 
        {
            passwordField.type = "password";
            showPassword12.classList.add('fa-eye');
            showPassword12.classList.remove('fa-eye-slash');
        }
    }
}