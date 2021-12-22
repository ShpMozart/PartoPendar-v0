//elements
let closeEye = document.querySelector('#eye-close');
let openEye = document.querySelector('#eye-open');
let passInput = document.querySelector('#password');
let btnClick = document.querySelector('#submit-btn');
let preventForm = document.querySelector('form');

//eventListeners
closeEye.addEventListener('click', ElementOpen);
openEye.addEventListener('click', ElementClose);
// btnClick.addEventListener('click', changeLocation);

//functions
function ElementOpen() {
  closeEye.style.display = 'none';
  openEye.style.display = 'inline';
  passInput.setAttribute('type', 'text');
}

function ElementClose() {
  openEye.style.display = 'none';
  closeEye.style.display = 'inline';
  passInput.setAttribute('type', 'password');
}

// function changeLocation() {
//   location.assign('/htmls/password.html');
// }

function preventDef(e) {
  e.preventDefault();
}
