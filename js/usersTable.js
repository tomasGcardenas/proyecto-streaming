const addUser = document.getElementById('formAddUser');
const editForm = document.getElementById('formEditUser');
const tableBody = document.getElementById('tableBody');
const showMoreBody = document.getElementById('showMoreBody');
const showMoreTitle = document.getElementById('showMoreTitle');
const emailEdit = document.getElementById('emailEdit');
const userLabelEdit = document.getElementById('userLabelEdit');
const fullNameEdit = document.getElementById('fullNameEdit');
var editingUser = '';

class User{
  constructor(id, userLabel, fullName, email, password,admin){
    this.id = id;
    this.userLabel = userLabel;
    this.fullName = fullName;
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


editForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const userToEdit = {
		id: editingUser,
		userLabel: e.target[0].value,
		fullName: e.target[1].value,
		email: e.target[2].value,
	};
	let usersFromLS = JSON.parse(localStorage.getItem("users"));
	const newUsers = usersFromLS.map((user) => {
		if (user.id === editingUser) {
			return userToEdit;
		}
		return user;
});
localStorage.setItem('users', JSON.stringify(newUsers));
listarUsuarios();
$('#edit').modal('hide');
editingUser = '';
editForm.reset();
});

const generateId = function () {
	return '_'+Math.random().toString(36).substr(2,9);
};

const addUsers = () => {
	$('#modalAddUser').modal('show');
};

const edit = (id) => {
	editingUser = id;
	const users = JSON.parse(localStorage.getItem('users'));
	const userFound = users.find((user) => user.id == id);
	emailEdit.value = userFound.email;
	userLabelEdit.value = userFound.userLabel;
	fullNameEdit.value = userFound.fullName;
	$('#edit').modal('show');
};

let usuarios = []

addUser.addEventListener('submit', (e) => {
	e.preventDefault();
	const user = {
		id: generateId(),
		userLabel: e.target[0].value,
		fullName: e.target[1].value,
		email: e.target[2].value,
		password: e.target[3].value,
	};
	const usersFromLS = localStorage.getItem('users');
	if (!usersFromLS) {
		const users = JSON.stringify([user]);
		localStorage.setItem('users', users);
	} else {
		const usersParsed = JSON.parse(usersFromLS);
		usersParsed.push(user);
		const JSONusers = JSON.stringify(usersParsed);
		localStorage.setItem('users', JSONusers);
	}
	$('#modalAddUser').modal('hide')
	listarUsuarios();
	addUser.reset();
});

const deleteUser = (id) => {
	const usersFromLS = JSON.parse(localStorage.getItem('users'));
	const newUsers = usersFromLS.filter((user) => user.id !== id);
	localStorage.setItem('users', JSON.stringify(newUsers));
	listarUsuarios();
};

// CAMBIAR EL == POR UN STRINGIFY Y PARSE
const showMore = (id) => {
	$('#showMore').modal('show');
	const usersFromLS = JSON.parse(localStorage.getItem('users'));
	const showUsers = usersFromLS.find((user) => user.id == id);
	const body = `
	<label class="fs-4"><b>Usuario:</b> ${showUsers?.userLabel}</label>
	<br>
	<label class="fs-4"><b>Nombre y Apellido:</b> ${showUsers.fullName}</label>
	<br>
	<label class="fs-4"><b>Email:</b> ${showUsers.email}</label>
	`;
	showMoreBody.innerHTML = body;
	showMoreTitle.textContent = `${showUsers.userLabel}`;
};

function listarUsuarios(filteredUsers) {
	if (filteredUsers) {
		const trs = [];
		for (const user of filteredUsers) {
			const tr = `
			<tr>
				<td>${user.id}</td>
				<td>${user.userLabel}</td>
				<td>${user.fullName}</td>
				<td>${user.email}</td>
				<td>
					<button class="btn modalButton" onclick="showMore('${user.id}')"><i class="fa-solid fa-circle-info"></i></button>
				</td>
				<td>
				<button class="btn btn-outline-danger" onclick="deleteUser('${user.id}')"><i class="fa-solid fa-trash"></i></button>
				</td>
				<td>
				<button class="btn btn-outline-warning" onclick="edit('${user.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
				</td>
			</tr>
			`;
			trs.push(tr);
		}
		tableBody.innerHTML = trs.join(' ');
	} else {
		const usersFromLS = JSON.parse(localStorage.getItem('users'));
		const trs = [];
		for (const user of usersFromLS) {
			const tr = `
			<tr>
				<td>${user.id}</td>
				<td>${user.userLabel}</td>
				<td>${user.fullName}</td>
				<td>${user.email}</td>
				<td>
					<button class='btn modalButton' onclick="showMore('${user.id}')"><i class="fa-solid fa-circle-info"></i></button>
				</td>
				<td>
				<button class='btn btn-outline-warning' onclick="edit('${user.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
				</td>
				<td>
					<button class='btn btn-outline-danger' onclick="deleteUser('${user.id}')"><i class="fa-solid fa-trash"></i></button>
				</td>
				</tr>
			`;
			trs.push(tr);
		}
		tableBody.innerHTML = trs.join(' ');
	}
}

listarUsuarios();

const buscar = (filtro) => {
	const usersFromLS = JSON.parse(localStorage.getItem('users'));
	const filteredUsers = usersFromLS.filter((user) => (
		user?.userLabel?.toLowerCase()?.includes(filtro?.toLowerCase())
		||
		user?.fullName?.toLowerCase()?.includes(filtro?.toLowerCase())
		||
		user?.email?.toLowerCase()?.includes(filtro?.toLowerCase())
		)
	);
	listarUsuarios(filteredUsers);
};