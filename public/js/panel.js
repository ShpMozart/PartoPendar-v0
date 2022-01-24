//Variables
const menuBtn = document.querySelector(".menu-btn");
const menuTabs = document.querySelector(".menu-tabs");
const profPic = document.querySelector(".prof-pic");
const profPicMenu = document.querySelector(".pic-menu");
const navLogo = document.querySelector("#logo");
const profMenuPic = document.querySelector("#menu-prof");
const employeePic = document.querySelector("#employee-box");
const profPicture = document.querySelector("#prof-pic");

//dataBox data-1
const moneyValue = document.querySelector("#money");
const moneyPercent = document.querySelector("#percent");

//dataBox data-2
const requestNew = document.querySelector(".resualt-new");
const requestOnload = document.querySelector(".resualt-onLoad");
const requestFinished = document.querySelector(".resualt-finished");

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

//dataBox-1

//dataBox-2

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
    `${resualt.royaee.img}`,
    `${resualt.royaee.name}`,
    `${resualt.royaee.state}`,
    `${resualt.royaee.email}`
  );
});

//eventListeners
const nameMenu = document.querySelector("#name");
const stateMenu = document.querySelector("#state");
const emailMenu = document.querySelector("#email");

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
let done = 0;
let proccessing = 0;
let pending = 0;

async function counter() {
  let url = `${IP}/api/v1/tickets`;
  await getAPI(url)
    .then((res) => {
      res.data.ticket.forEach((element) => {
        if (element.status == "done") {
          done = done + 1;
        } else if (element.status == "pending") {
          pending = pending + 1;
        } else if (element.status == "proccessing") {
          proccessing = proccessing + 1;
        }
      });
    })
    .catch(() => {
      window.alert("Fail to fetch API");
    });
}

async function setCount() {
  let d = document.querySelector(".reusalt-finished");
  let p = document.querySelector(".resualt-new");
  let pr = document.querySelector(".resualt-onLoad");

  await counter().then(() => {
    d.innerHTML = done;
    p.innerHTML = pending;
    pr.innerHTML = proccessing;
  });
}
setCount();
//get API

async function getAPI(data) {
  let apiData = await fetch(data)
    .then((value) => value.json())
    .then((valu) => {
      return valu;
    })
    .catch((error) => error);

  return apiData;
}
