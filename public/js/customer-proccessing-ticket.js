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

class Ticket {
  constructor(ticket) {
    let data = document.createElement("div");
    data.classList.add("header");
    let title = document.createElement("h2");
    title.textContent = "درخواست شماره: ";
    data.appendChild(title);
    let reqNum = document.createElement("h3");
    reqNum.textContent = ticket.id * 234 + 23321;
    data.appendChild(reqNum);
    container.appendChild(data);
    let ticketBox = document.createElement("div");
    ticketBox.classList.add("ticket-box");
    let ticketHeader = document.createElement("div");
    ticketHeader.classList.add("ticket-header");
    ticketBox.appendChild(ticketHeader);
    let customerName = document.createElement("div");
    let name = document.createElement("h5");
    name.textContent = `${ticket.senderName} / شماره: ${
      ticket.id * 234 + 23321
    }`;
    customerName.appendChild(name);
    customerName.classList.add("customer-name");
    ticketHeader.appendChild(customerName);
    let status = document.createElement("div");
    status.classList.add("status");
    let stat = document.createElement("h5");
    stat.textContent = `وضعیت: ${statusCheck()}`;
    status.appendChild(stat);
    let date = document.createElement("h5");
    date.textContent = `تاریخ: ${ticket.createdAt}`;
    status.appendChild(date);
    ticketHeader.appendChild(status);

    let ticketProb = document.createElement("div");
    ticketProb.classList.add("ticket-problem");
    let probInfo = document.createElement("div");
    probInfo.classList.add("prob-info");
    let city = document.createElement("h5");
    city.textContent = `شهر: ${ticket.city}`;
    probInfo.appendChild(city);
    let center = document.createElement("h5");
    center.textContent = `مرکز: ${ticket.center}`;
    probInfo.appendChild(center);
    let file = document.createElement("h5");
    file.textContent = `فایل ضمیمه: `;
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.id = "file";
    btn.textContent = "دانلود";
    file.appendChild(btn);
    probInfo.appendChild(file);
    ticketProb.appendChild(probInfo);
    let probTitle = document.createElement("div");
    probTitle.classList.add("prob-title");
    let titleli = document.createElement("li");
    let titleTxt = document.createElement("h5");
    titleTxt.textContent = `عنوان درخواست: ${ticket.title}`;
    titleli.appendChild(titleTxt);
    probTitle.appendChild(titleli);
    ticketProb.appendChild(probTitle);
    let probText = document.createElement("div");
    probText.classList.add("prob-text");
    let probli = document.createElement("li");
    let probtitle = document.createElement("h5");
    probtitle.textContent = `شرح درخواست: ${ticket.text}`;
    probli.appendChild(probtitle);
    probText.appendChild(probli);
    ticketProb.appendChild(probText);
    ticketBox.appendChild(ticketProb);

    container.appendChild(ticketBox);
    //function that check the status and change the color of them
    function statusCheck() {
      if (ticket.status == "done") {
        stat.classList.add("done-status");
        return "انجام شده";
      } else if (ticket.status == "pending") {
        stat.classList.add("proccessing-status");
        return "در حال انجام";
      } else {
        stat.classList.add("proccessing-status");
        return "در حال انجام";
      }
    }
  }
}

async function logout() {
  document.querySelector("#logout").classList.add("logout-active");
  await getAPI("http://192.168.1.104:3000/api/v1/users/logout").then(
    (response) => {
      location.assign("/");
    }
  );
}
let pathname = location.pathname.slice(11) * 1;
async function tikcetSetup(id) {
  let url = `http://192.168.1.104:3000/api/v1/tickets/${id}`;
  let data = await getAPI(url);
  data = data.data.ticket;
  //send to the class
  new Ticket(data);
}
tikcetSetup((pathname - 23321) / 234);
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
