class User{
  constructor(id, userLabel, name, email, password, admin){
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

const register = (event) =>{
  event.preventDefault();
  let userLabel = document.getElementById('userLabel').value;
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let pass = document.getElementById('pass').value;

  let emailOk= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email); //true
  let passOk= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass); //true

  if(emailOk && passOk){
    let usersLS = JSON.parse(localStorage.getItem('users'));
    if(usersLS.find(user=>user.email==email)){
    }else{
      usersLS.push(new User(usersLS.length+1,userLabel,name,email,pass,false));
      localStorage.setItem('user',JSON.stringify(usersLS.length+1));
      window.location.assign(window.location.origin + '/pages/homePage.html')
    }
    localStorage.setItem('users',JSON.stringify(usersLS))
  }else{
    console.log('error al crear usuario');
  }
} 