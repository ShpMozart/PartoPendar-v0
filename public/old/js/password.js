//elements
closeEye = document.querySelector("#eye-close");
openEye = document.querySelector("#eye-open");
passInput = document.querySelector("#password");
let passSecond = document.querySelector("#password-2");
preventForm = document.querySelector("form");
let submitBtn = document.querySelector("#submit-btn");
//eventListeners
closeEye.addEventListener("click", ElementOpen);
openEye.addEventListener("click", ElementClose);
passSecond.addEventListener("paste", (e) => preventDef(e));
// preventForm.addEventListener('submit');
//functions
function ElementOpen() {
  closeEye.style.display = "none";
  openEye.style.display = "inline";
  passInput.setAttribute("type", "text");
}

function ElementClose() {
  openEye.style.display = "none";
  closeEye.style.display = "inline";
  passInput.setAttribute("type", "password");
}

function passwordChanged() {
  var strength = document.getElementById("strength");
  var strongRegex = new RegExp(
    "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
    "g"
  );
  var mediumRegex = new RegExp(
    "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
    "g"
  );
  var enoughRegex = new RegExp("(?=.{6,}).*", "g");
  var pwd = document.getElementById("password");
  if (pwd.value.length == 0) {
    strength.innerHTML = "";
    strength.style.display = "none";
  } else if (false == enoughRegex.test(pwd.value)) {
    strength.style.display = "flex";
    strength.innerHTML = '<span style="color: #fff;">طول کم</span>';
    strength.style.width = "25%";
    strength.style.backgroundColor = "#1f8dc4";
  } else if (strongRegex.test(pwd.value)) {
    strength.innerHTML = '<span style="color:#fff">مناسب</span>';
    strength.style.width = "100%";
    strength.style.backgroundColor = "green";
  } else if (mediumRegex.test(pwd.value)) {
    strength.innerHTML = '<span style="color:#fff">متوسط</span>';
    strength.style.width = "75%";
    strength.style.backgroundColor = "orange";
  } else {
    strength.innerHTML = '<span style="color:#fff">ضعیف</span>';
    strength.style.width = "50%";
    strength.style.backgroundColor = "red";
  }
}

function preventDef(e) {
  e.preventDefault();
}
