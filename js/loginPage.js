class User {
    constructor(id, name, email, password, admin) {
      this.name = name;
      this.id = id;
      this.email = email;
      this.password = password;
      this.admin = admin;
    }
  }
  
  let users;
  
  const usersFromLS = JSON.parse(localStorage.getItem("users"));
  
  if (usersFromLS) {
    users = usersFromLS;
  } else {
    users = [
      new User(1, "Alexia Tonin", "alexia@gmail.com", "123456789", true),
      new User(2, "Tomas Garcia", "tomasgarcia@gmail.com", "987654321", false),
      new User(3, "Martin Gomez", "martingomez@gmail.com", "741852963", false),
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  const login = (event) => {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#pass").value;
    let emailOk = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    if (emailOk) {
      let userFound = users.find((user) => user.email === email);
      if (userFound && userFound.password === pass) {
        window.location.assign(window.location.origin + "/pages/homePage.html");
      } else {
        errorAlert("Credenciales incorrectas");
      }
    } else {
      errorAlert("Email inválido");
    }
  };
  function errorAlert(texto) {
    let errorMessage = document.createElement("div");
    errorMessage.innerText = texto;
    errorMessage.classList.add("alert");
    let loginForm = document.getElementById("loginForm");
    loginForm.appendChild(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
    }, 2000);
  }
  //! REGISTRO
  
  const register = (event) => {
    event.preventDefault();
    let fullName = document.querySelector("#register-fullname").value;
    let email = document.querySelector("#register-email").value;
    let pass = document.getElementById("register-pass").value;
    let pass2 = document.getElementById("register-pass2").value;
  
    let fullNameOk = /^([a-zA-Z]){4,35}$/.test(fullName); //true
    let emailOk = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email); //true
    let passOk = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass); //true
    let pass2Ok = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass2); //true
    let equalPass = pass === pass2; //true
  
    if (fullNameOk && emailOk && pass2Ok && passOk && equalPass) {
      let usersLS = JSON.parse(localStorage.getItem("users"));
      if (usersLS.find((user) => user.email == email)) {
        console.log("-------");
      } else {
        usersLS.push(new User(usersLS.length + 1, fullName, email, pass, false));
        localStorage.setItem("user", JSON.stringify(usersLS.length + 1));
        window.location.assign(window.location.origin + "/headerHome.html");
      }
      localStorage.setItem("users", JSON.stringify(usersLS));
    } else {
      console.log("------");
    }
  };