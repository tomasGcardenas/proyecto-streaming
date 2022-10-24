class User {
    constructor(id, userLabel, name, email, password, admin) {
      this.id = id;
      this.userLabel = userLabel;
      this.name = name;
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
      new User(1,"Alexia Master","Alexia Tonin", "alexia@gmail.com", "123456789", true),
      new User(2,"Tomas García","Tomas Garcia", "tomasgarcia@gmail.com", "987654321", false),
      new User(3,"Martin Gomez","Martin Gomez", "martingomez@gmail.com", "741852963", false),
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  const login = (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let emailOk = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    if (emailOk) {
      let userFound = users.find((user) => user.email === email);
      if (userFound && userFound.password === pass) {
        localStorage.setItem('user',JSON.stringify(userFound.id));
        window.location.assign(window.location.origin + "/pages/homePage.html");
      } else {
        errorAlert("Contraseña inválida");
      }
    } else {
      errorAlert("Email inválido");
    }
  };

  function errorAlert(texto) {
    let errorMessage = document.createElement("div");
    errorMessage.innerText = texto;
    errorMessage.classList.add("alert", "text-danger", "fs-4");
    let loginForm = document.getElementById("loginForm");
    loginForm.appendChild(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
    }, 2000);
  };