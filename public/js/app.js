//elements
let closeEye = document.querySelector('#eye-close')
let openEye = document.querySelector('#eye-open')
let passInput = document.querySelector('#password')
let btnClick = document.querySelector('#submit-btn')
let preventForm = document.querySelector('form')

//eventListeners
closeEye.addEventListener('click', ElementOpen)
openEye.addEventListener('click', ElementClose)
preventForm.addEventListener('submit', e =>  preventDef(e))

//functions
function ElementOpen() {
    closeEye.style.display = 'none'
    openEye.style.display = 'inline'
    passInput.setAttribute('type', 'text')
}

function ElementClose() {
    openEye.style.display = 'none'
    closeEye.style.display = 'inline'
    passInput.setAttribute('type', 'password')
}

function changeLocation() {
    location.assign('/htmls/password.html')
}

function preventDef(e) {
    e.preventDefault();
}

btnClick.addEventListener('click', () => {
    postData('http://194.62.43.146:3000/api/v1/users/login', { 
    username: "adora",
    password: "amir1381"
 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
})





async function postData(url = '', data = {} ) {

    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }
  