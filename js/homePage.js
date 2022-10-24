let userId = localStorage.getItem('user');
let users = JSON.parse(localStorage.getItem('users'));
let userActive = users.find(user=>user.id==userId);
if(userActive.admin){
  let adminButton = document.createElement('div');
  adminButton.classList.add('nav-item','d-flex','flex-row','text-white',);
  adminButton.innerHTML=`
  <a class="nav-link px-2 fs-5" href="http://127.0.0.1:5500/pages/usersTable.html">Lista de usuarios</a>
  <a class="nav-link px-2 fs-5" href="http://127.0.0.1:5500/homePage.html">Lista de canciones</a>
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