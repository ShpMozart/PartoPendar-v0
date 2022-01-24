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
    `${resualt.royaee.img}`,
    `${resualt.royaee.name}`,
    `${resualt.royaee.state}`,
    `${resualt.royaee.email}`
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

class Tickets {
  constructor(ticket) {
    //make html elements for request box and set the elemnts of them from api

    let ticketMainBox = document.createElement("div");
    ticketMainBox.classList.add("main-box");
    ticketMainBox.id = `${ticket.id}`;
    let ticketChildBox = document.createElement("div");
    ticketChildBox.classList.add("req-box");
    ticketMainBox.appendChild(ticketChildBox);
    let detail = document.createElement("div");
    detail.classList.add("req-detail");
    ticketChildBox.appendChild(detail);
    let status = document.createElement("div");
    status.classList.add("custStatus");
    detail.appendChild(status);
    let title = document.createElement("h2");
    title.textContent = `مشتری: ${ticket.senderName}`;
    status.appendChild(title);
    let statusTitle = document.createElement("h2");
    statusTitle.textContent = `وضعیت: ${statusCheck()}`;
    statusTitle.classList.add("status");
    status.appendChild(statusTitle);
    let detailTitle = document.createElement("h2");
    detailTitle.textContent = `عنوان درخواست: ${ticket.title}`;
    detailTitle.classList.add("title");
    detail.appendChild(detailTitle);
    let date = document.createElement("div");
    date.classList.add("date");
    detail.appendChild(date);
    let dateTitle = document.createElement("h2");
    dateTitle.textContent = `تاریخ: ${ticket.updatedAt}`;
    date.appendChild(dateTitle);
    //append the final html elemnt to the body
    requestsBox.appendChild(ticketMainBox);

    //functions

    //function that check the status and change the color of them
    function statusCheck() {
      if (ticket.status == "done") {
        statusTitle.classList.add("done-status");
        return "انجام شده";
      } else if (ticket.status == "pending") {
        statusTitle.classList.add("pending-status");
        return "جدید";
      } else {
        statusTitle.classList.add("proccessing-status");
        return "در حال انجام";
      }
    }
  }
}

//request box

//fetch tickets api
setInterval(() => {}, 5000);

//get data from api function
async function getAPI(data) {
  let apiData = await fetch(data)
    .then((value) => value.json())
    .then((valu) => {
      return valu;
    });

  return apiData;
}

async function setTicket() {
  let ticketURL = `${IP}/api/v1/tickets`;

  //make tickets box for each ticket & get title of them for search
  let resualt = await getAPI(ticketURL);
  resualt.data.ticket.forEach((ticket) => {
    new Tickets(ticket);
  });
}
setTicket();

function filterTitle() {
  let tickets = document.querySelectorAll(".main-box");
  let ticketsTitle = document.querySelectorAll(".title");
  let check = false;

  if (searchField.value == "" || searchField.value == undefined) {
    tickets.forEach((tickbox) => {
      tickbox.style.display = "";
    });
  } else {
    for (let i = 0; i < ticketsTitle.length; i++) {
      for (let k = 0; k < searchField.value.split("").length; k++) {
        if (
          ticketsTitle[i].innerHTML.slice(15).split("")[k] ==
            searchField.value.split("")[k] &&
          check == false
        ) {
          tickets[i].style.display = "";
        } else {
          tickets[i].style.display = "none";
          check = true;
        }
      }
      check = false;
    }
  }
}

function pendingFilter() {
  let ticketsTitle = document.querySelectorAll(".status");
  ticketsTitle.forEach((title) => {
    if (title.classList[0] == "pending-status") {
      title.parentElement.parentElement.parentElement.parentElement.style.display =
        "";
    } else {
      title.parentElement.parentElement.parentElement.parentElement.style.display =
        "none";
    }
  });
}

function doneFilter() {
  let ticketsTitle = document.querySelectorAll(".status");
  ticketsTitle.forEach((title) => {
    if (title.classList[0] == "done-status") {
      title.parentElement.parentElement.parentElement.parentElement.style.display =
        "";
    } else {
      title.parentElement.parentElement.parentElement.parentElement.style.display =
        "none";
    }
  });
}

function proccessingFilter() {
  let ticketsTitle = document.querySelectorAll(".status");
  ticketsTitle.forEach((title) => {
    if (title.classList[0] == "proccessing-status") {
      title.parentElement.parentElement.parentElement.parentElement.style.display =
        "";
    } else {
      title.parentElement.parentElement.parentElement.parentElement.style.display =
        "none";
    }
  });
}

setTimeout(() => {
  document.querySelectorAll(".main-box").forEach((item) => {
    item.addEventListener("click", () => {
      location.assign(`req/${item.id * 234 + 23321}`);
    });
  });
}, 500);

//assign location for each ticket
