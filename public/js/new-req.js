//Variables
const menuBtn = document.querySelector(".menu-btn");
const menuTabs = document.querySelector(".menu-tabs");
const profPic = document.querySelector(".prof-pic");
const profPicMenu = document.querySelector(".pic-menu");
const navLogo = document.querySelector("#logo");
const profMenuPic = document.querySelector("#menu-prof");
const employeePic = document.querySelector("#employee-box");
const profPicture = document.querySelector("#prof-pic");
const customerDate = document.querySelector("#date");
const customerName = document.querySelector("#customer-name");
const customerStatus = document.querySelector("#customer-status");
const requestTitle = document.querySelector("#request-title");
const requestsBox = document.querySelector(".requests");
const searchField = document.querySelector(".search-field");
const container = document.querySelector(".container");
const ticketBox = document.querySelector(".main-box");

//Picture menu variables
const backBtn = document.querySelector("#prev");

//bool
let menuOpen = false;
let picOpen = false;

//EventListeners
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menuOpen = true;
    menuTabs.classList.add("open");
  } else {
    menuBtn.classList.remove("open");
    menuOpen = false;
    menuTabs.classList.remove("open");
    menuTabs.classList.add("close");
  }
});

const nameMenu = document.querySelector("#name");
const stateMenu = document.querySelector("#state");
const emailMenu = document.querySelector("#email");

//Profile picture click eventslistener
profPic.addEventListener("click", () => {
  if (!picOpen) {
    profPicMenu.style.display = "flex";
    setTimeout(() => {
      profPicMenu.classList.add("open");
      picOpen = true;
    }, 200);
    profPic.classList.add("hidden");
    setTimeout(() => {
      profMenuPic.classList.add("move-1");
    }, 300);
    navLogo.classList.add("move");
    profMenuPic.style.visibility = "visible";
  }
});

//Picture menu
backBtn.addEventListener("click", () => {
  profPicMenu.classList.remove("open");
  profPicMenu.classList.add("close");
  setTimeout(() => {
    profPicMenu.style.display = "none";
    profMenuPic.style.visibility = "hidden";
    profMenuPic.classList.remove("move-1");
  }, 800);
  picOpen = false;
  navLogo.classList.add("rev-move");
  navLogo.classList.remove("move");
  profPic.classList.remove("hidden");
});

//personalData (eventListener, class, functions)
let dataMenu = new Promise((resolve, reject) => {
  resolve(
    fetch("../dataBase/data.json")
      .then((element) => element.json())
      .then((user) => (dataMenu = user))
  );
  reject("get some error");
});

dataMenu.then((resualt) => {
  new Employee(
    `${resualt.adora.img}`,
    `${resualt.adora.name}`,
    `${resualt.adora.state}`,
    `${resualt.adora.email}`
  );
});

//classes
class Employee {
  constructor(prof, name, state, email) {
    //get data from the initialiser
    this.profPic = prof;
    this.name = name;
    this.state = state;
    this.email = email;
    //set data in the html fields
    profPicture.setAttribute("src", this.profPic);
    profMenuPic.setAttribute("src", this.profPic);
    // employeePic.setAttribute('src', this.profPic)
    nameMenu.textContent = this.name;
    stateMenu.textContent = this.state;
    emailMenu.textContent = this.email;
  }
}

//function that check the status and change the color of them

let cntr = document.querySelector("#center");
let addCntr = document.querySelector(".add-center");
setInterval(() => {
  if (cntr.value == "سایر") {
    addCntr.style.display = "block";
  } else {
    addCntr.style.display = "none";
  }
}, 100);

let fileCheck = false;

let fileId;

function uploadFile(target) {
  if (
    target.files[0].type == "application/pdf" &&
    target.files[0].size <= 1000000
  ) {
    document.getElementById("fileError").style.display = "none";
    document.getElementById("uploadLogo").style.display = "none";
    document.getElementById("uploadDone").style.display = "block";
    fileCheck = true;
  } else {
    document.getElementById("uploadDone").style.display = "none";
    document.getElementById("uploadLogo").style.display = "none";
    document.getElementById("fileError").style.display = "block";
    fileCheck = false;
  }
  console.log(target.files[0].size);
}

//submit action
async function loadData() {
  let apiData = await getAPI("http://192.168.1.104:3000/api/v1/city");
  apiData = apiData.data.cities;
  let citty = document.querySelector("#city");
  let centter = document.querySelector("#center");
  for (let { city } of apiData) {
    let option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citty.appendChild(option);
  }

  apiData.forEach((element) => {
    if (element.city == citty.value) {
      element.centers.forEach((center) => {
        let opttion = document.createElement("option");
        opttion.id = "centers";
        opttion.value = center.center;
        opttion.textContent = center.center;
        centter.appendChild(opttion);
      });
      let optionAdd = document.createElement("option");
      optionAdd.id = "centers";
      optionAdd.valu = "سایر";
      optionAdd.textContent = "سایر";
      centter.appendChild(optionAdd);
    }
  });

  citty.addEventListener("change", () => {
    document.querySelectorAll("#centers").forEach((element) => {
      console.log(element);
      element.remove();
    });
    apiData.forEach((element) => {
      if (element.city == citty.value) {
        element.centers.forEach((center) => {
          let opttion = document.createElement("option");
          opttion.id = "centers";
          opttion.value = center.center;
          opttion.textContent = center.center;
          centter.appendChild(opttion);
        });
        let optionAdd = document.createElement("option");
        optionAdd.id = "centers";
        optionAdd.valu = "سایر";
        optionAdd.textContent = "سایر";
        centter.appendChild(optionAdd);
      }
    });
  });
}
loadData();

console.log(fileId);

let submitAct = document.querySelector("#submit");
submitAct.addEventListener("click", () => {
  let cityL = document.querySelector("#city").value;
  let centerL = document.querySelector("#center").value;
  if (centerL == "سایر") {
    centerL = document.querySelector("#added-center").value;
  }
  let titleL = document.querySelector("#title").value;
  let textL = document.querySelector("#text").value;

  ///////////////////////////////////////////////////////////////////////////////////
  let fileL = document.querySelector("#file").files[0];
  let formData = new FormData();
  formData.append("pdf", fileL);
  fetch("http://192.168.1.104:3000/api/v1/files/upload", {
    method: "POST",
    body: formData,
  }).then((response) => {
    response.json().then((data) => {
      fileId = data.data.id;
      let newTicket = {
        city: `${cityL}`,
        center: `${centerL}`,
        title: `${titleL}`,
        text: `${textL}`,
        fileId: `${fileId}`,
      };

      postData(
        "http://192.168.1.104:3000/api/v1/tickets/create",
        newTicket
      ).then((data) => {
        if (data.status === "success") {
          location.assign("/panel");
        }
      });
    });
  });
});

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

//get data from api function
async function getAPI(data) {
  let apiData = await fetch(data)
    .then((value) => value.json())
    .then((valu) => {
      return valu;
    });

  return apiData;
}

//eventListeners with timeout
