// IDENTIFICAMOS SI EL USUARIO ES ADMIN O NO
let userId = localStorage.getItem('user');
let users = JSON.parse(localStorage.getItem('users'));
let userActive = users.find(user=>user.id==userId);
if(userActive.admin){
  let adminButton = document.createElement('li');
  adminButton.classList.add('nav-item');
  adminButton.innerHTML=`
  <a class="nav-link" href="http://127.0.0.1:5500/usersTable.html">Lista de usuarios</a>
  `;
  document.getElementById('headerHome').appendChild(adminButton)
}

const logout = () =>{
  let usersLS = JSON.parse(localStorage.getItem('users'));
  let userActive = usersLS.find(user=>user.id == localStorage.getItem('user'));
  usersLS.filter(user=>user.id!= localStorage.getItem('user'));
  usersLS.push(userActive);
  localStorage.setItem('users',JSON.stringify(usersLS))
  localStorage.removeItem('user');
  window.location.assign(window.location.origin + '/index.html')
}