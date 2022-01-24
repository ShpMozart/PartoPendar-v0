const IP = "http://192.168.1.104:3000";
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
    btn.textContent = "دانلود";
    btn.id = "download-file";
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
    let ticketAnswer = document.createElement("div");
    ticketAnswer.classList.add("ticket-answer");
    let answer = document.createElement("div");
    answer.classList.add("answer");
    let tytle = document.createElement("h5");
    tytle.textContent = `پرسش و پاسخ: `;
    answer.appendChild(tytle);
    ticket.message.forEach((answr) => {
      let txtBx = document.createElement("div");
      let time = document.createElement("div");
      if (answr.from == "client") {
        txtBx.classList.add("client");
        txtBx.id = `${answr.id}`;
        time.classList.add("time-client");
      } else if (answr.from == "boss") {
        txtBx.classList.add("boss");
        time.classList.add("time-boss");
        txtBx.id = `${answr.id}`;
      }
      time.textContent = `${answr.createdAt}`;
      txtBx.textContent = `${answr.text}`;
      txtBx.appendChild(time);
      answer.appendChild(txtBx);
      ticketAnswer.appendChild(answer);
    });

    ticketBox.appendChild(ticketAnswer);

    let firsttime = true;
    let counter = 1;
    let factorChecking;

    if (ticket.signedByClient) {
      factorChecking = true;
    } else {
      factorChecking = false;
    }
    let employes = ["مسعود اسدی", "علی حیدری"];

    function factorCheck() {
      if (factorChecking) {
        let accptFactor = document.createElement("div");
        accptFactor.classList.add("factor-accepted");
        let resualt = document.createElement("div");
        resualt.classList.add("resualt");
        let resualtHeader = document.createElement("h5");
        resualtHeader.textContent = "فاکتور توسط مشتری تایید شده است.";
        resualt.appendChild(resualtHeader);
        let employeChosse = document.createElement("div");
        employeChosse.classList.add("employe-chosse");
        let employeLi = document.createElement("li");
        let employeTitle = document.createElement("h5");
        employeTitle.textContent = "انتخاب کارشناس مربوطه:";
        employeLi.appendChild(employeTitle);
        let employeSelect = document.createElement("select");
        employeSelect.id = "employe";
        employeSelect.name = "employe";
        employes.forEach((employe) => {
          let employeOption = document.createElement("option");
          employeOption.value = `${employe}`;
          employeOption.textContent = `${employe}`;
          employeSelect.appendChild(employeOption);
        });
        employeLi.appendChild(employeSelect);
        let textLi = document.createElement("li");
        let textLiTitle = document.createElement("h5");
        textLiTitle.textContent = "متن: ";
        textLi.appendChild(textLiTitle);
        let textArea = document.createElement("textarea");
        textArea.name = "text";
        textArea.id = "employe-text";
        textArea.setAttribute("cols", "25");
        textArea.setAttribute("rows", "4");
        textArea.setAttribute("placeholder", "متن مورد نظر...");
        textLi.appendChild(textArea);
        employeChosse.appendChild(employeLi);
        employeChosse.appendChild(textLi);
        let submitBtn = document.createElement("button");
        submitBtn.classList.add("btn");
        submitBtn.textContent = "ثبت";

        accptFactor.appendChild(resualt);
        accptFactor.appendChild(employeChosse);
        accptFactor.appendChild(submitBtn);

        ticketBox.appendChild(accptFactor);
      } else {
        let rejectFactor = document.createElement("div");
        rejectFactor.classList.add("factor-reject");
        let resualt = document.createElement("div");
        resualt.classList.add("resualt");
        let resualtHeader = document.createElement("h5");
        resualtHeader.textContent = "فاکتور توسط مشتری تایید نشده است.";
        resualt.appendChild(resualtHeader);
        let bossAnswer = document.createElement("div");
        bossAnswer.classList.add("boss-answer");
        let bossLi = document.createElement("li");
        let bossTitle = document.createElement("h5");
        bossTitle.textContent = "پاسخ مدیر: ";
        bossLi.appendChild(bossTitle);
        let bossTextArea = document.createElement("textarea");
        bossTextArea.name = "boss-answer";
        bossTextArea.id = "answer-boss";
        bossTextArea.setAttribute("cols", "39");
        bossTextArea.setAttribute("rows", "4");
        bossTextArea.setAttribute("placeholder", "متن مورد نظر...");
        bossLi.appendChild(bossTextArea);
        bossAnswer.appendChild(bossLi);
        let buttons = document.createElement("div");
        buttons.classList.add("buttons");
        let submitBtn = document.createElement("button");
        submitBtn.classList.add("btn");
        submitBtn.id = "submit";
        submitBtn.textContent = "ارسال";
        buttons.appendChild(submitBtn);
        let addFactor = document.createElement("button");
        addFactor.classList.add("btn");
        addFactor.id = "add-factor";
        addFactor.textContent = "افزودن فاکتور";
        buttons.appendChild(addFactor);

        rejectFactor.appendChild(resualt);
        rejectFactor.appendChild(bossAnswer);
        rejectFactor.appendChild(buttons);

        ticketBox.appendChild(rejectFactor);
      }
    }

    function adFactor() {
      if (firsttime) {
        let factore = document.createElement("div");
        factore.classList.add("factore");
        let heeader = document.createElement("div");
        heeader.classList.add("heeader");
        let obj = document.createElement("h5");
        obj.textContent = "شرح کالا";
        heeader.appendChild(obj);
        let num = document.createElement("h5");
        num.textContent = "تعداد";
        heeader.appendChild(num);
        let unit = document.createElement("h5");
        unit.textContent = "واحد";
        heeader.appendChild(unit);
        let tex = document.createElement("h5");
        tex.textContent = "توضیحات";
        heeader.appendChild(tex);
        factore.appendChild(heeader);
        let fileds = document.createElement("div");
        fileds.classList.add("fileds");
        let cntr = document.createElement("h5");
        cntr.textContent = `${counter}-`;
        fileds.appendChild(cntr);
        let objj = document.createElement("input");
        objj.type = "text";
        objj.id = `obj`;
        fileds.appendChild(objj);
        let val = document.createElement("input");
        val.type = "number";
        val.value = 1;
        val.id = `val`;
        val.style.width = "10%";
        fileds.appendChild(val);
        let selct = document.createElement("select");
        selct.id = "unit-selector";
        let optF = document.createElement("option");
        optF.value = "عدد";
        optF.textContent = "عدد";
        selct.appendChild(optF);
        let optS = document.createElement("option");
        optS.value = "متر";
        optS.textContent = "متر";
        selct.appendChild(optS);
        fileds.appendChild(selct);
        let text = document.createElement("textarea");
        text.id = "factor-info";
        text.setAttribute("cols", 10);
        text.setAttribute("rows", 1);
        fileds.appendChild(text);
        factore.appendChild(fileds);
        ticketBox.appendChild(factore);
        counter = counter + 1;
        document.querySelector("#add-factor").textContent = "افزودن کالا";
        firsttime = false;
      } else {
        let fileds = document.createElement("div");
        fileds.classList.add("fileds");
        let cntr = document.createElement("h5");
        cntr.textContent = `${counter}-`;
        fileds.appendChild(cntr);
        let obj = document.createElement("input");
        obj.type = "text";
        obj.id = `obj`;
        fileds.appendChild(obj);
        let val = document.createElement("input");
        val.type = "number";
        val.value = 1;
        val.id = `val`;
        val.style.width = "10%";
        fileds.appendChild(val);
        let selct = document.createElement("select");
        selct.id = "unit-selector";
        let optF = document.createElement("option");
        optF.value = "عدد";
        optF.textContent = "عدد";
        selct.appendChild(optF);
        let optS = document.createElement("option");
        optS.value = "متر";
        optS.textContent = "متر";
        selct.appendChild(optS);
        fileds.appendChild(selct);
        let text = document.createElement("textarea");
        text.id = "factor-info";
        text.setAttribute("cols", 10);
        text.setAttribute("rows", 1);
        fileds.appendChild(text);
        let factore = document.querySelector(".factore");
        factore.appendChild(fileds);

        counter = counter + 1;
      }
    }

    function showFactor() {
      const loadFactor = ticket.factors;

      loadFactor.forEach((factor) => {
        if (firsttime) {
          let factore = document.createElement("div");
          factore.classList.add("factore");
          let heeader = document.createElement("div");
          heeader.classList.add("heeader");
          let obj = document.createElement("h5");
          obj.textContent = "شرح کالا";
          heeader.appendChild(obj);
          let num = document.createElement("h5");
          num.textContent = "تعداد";
          heeader.appendChild(num);
          let unit = document.createElement("h5");
          unit.textContent = "واحد";
          heeader.appendChild(unit);
          let tex = document.createElement("h5");
          tex.textContent = "توضیحات";
          heeader.appendChild(tex);
          factore.appendChild(heeader);
          let fileds = document.createElement("div");
          fileds.classList.add("fileds");
          let cntr = document.createElement("h5");
          cntr.textContent = `${counter}-`;
          fileds.appendChild(cntr);
          let objj = document.createElement("input");
          objj.type = "text";
          objj.id = `obj`;
          objj.value = `${factor.name}`;
          fileds.appendChild(objj);
          let val = document.createElement("input");
          val.type = "number";
          val.value = `${factor.tedad}`;
          val.id = `val`;
          val.style.width = "10%";
          fileds.appendChild(val);
          let selct = document.createElement("select");
          selct.id = "unit-selector";
          let optF = document.createElement("option");
          optF.value = "عدد";
          optF.textContent = "عدد";
          selct.appendChild(optF);
          let optS = document.createElement("option");
          optS.value = "متر";
          optS.textContent = "متر";
          selct.appendChild(optS);
          fileds.appendChild(selct);
          let text = document.createElement("textarea");
          text.id = "factor-info";
          text.setAttribute("cols", 10);
          text.setAttribute("rows", 1);
          text.textContent = `${factor.tozihat}`;
          fileds.appendChild(text);
          factore.appendChild(fileds);
          ticketBox.appendChild(factore);
          counter = counter + 1;
          firsttime = false;
        } else {
          let fileds = document.createElement("div");
          fileds.classList.add("fileds");
          let cntr = document.createElement("h5");
          cntr.textContent = `${counter}-`;
          fileds.appendChild(cntr);
          let obj = document.createElement("input");
          obj.type = "text";
          obj.id = `obj`;
          obj.value = `${factor.name}`;
          fileds.appendChild(obj);
          let val = document.createElement("input");
          val.type = "number";
          val.value = `${factor.tedad}`;
          val.id = `val`;
          val.style.width = "10%";
          fileds.appendChild(val);
          let selct = document.createElement("select");
          selct.id = "unit-selector";
          let optF = document.createElement("option");
          optF.value = "عدد";
          optF.textContent = "عدد";
          selct.appendChild(optF);
          let optS = document.createElement("option");
          optS.value = "متر";
          optS.textContent = "متر";
          selct.appendChild(optS);
          fileds.appendChild(selct);
          let text = document.createElement("textarea");
          text.id = "factor-info";
          text.setAttribute("cols", 10);
          text.setAttribute("rows", 1);
          text.textContent = `${factor.tozihat}`;
          fileds.appendChild(text);
          let factore = document.querySelector(".factore");
          factore.appendChild(fileds);

          counter = counter + 1;
        }
      });
    }

    container.appendChild(ticketBox);
    //function that check the status and change the color of them
    function statusCheck() {
      if (ticket.status == "done") {
        stat.classList.add("done-status");
        return "انجام شده";
      } else if (ticket.status == "pending") {
        stat.classList.add("pending-status");
        return "جدید";
      } else {
        stat.classList.add("proccessing-status");
        return "در حال انجام";
      }
    }

    setTimeout(() => {
      let fieldsObj = document.querySelectorAll(".fileds");
      fieldsObj.forEach((element) => {
        element.querySelector("h5").addEventListener("click", () => {
          element.remove();
        });
      });
    }, 550);

    var Factor = [];

    setTimeout(() => {
      let addFactor = document.querySelector("#add-factor");
      let submmit = document.querySelector("#submit");

      if (addFactor != null) {
        addFactor.addEventListener("click", () => {
          adFactor();
        });
      }

      let cntr = 1;
      if (submmit != null) {
        submmit.addEventListener("click", () => {
          let fieldsObj = document.querySelectorAll(".fileds");
          fieldsObj.forEach((element) => {
            let objct = element.querySelectorAll("#obj");
            objct.forEach((elmnt) => {
              let val = element.querySelectorAll("#val");
              val.forEach((varElmnt) => {
                let unit = element.querySelectorAll("#unit-selector");
                unit.forEach((unitElmnt) => {
                  let factorText = element.querySelectorAll("#factor-info");
                  factorText.forEach((textElmnt) => {
                    let factorRes = {
                      ticketId: `${ticket.id}`,
                      name: `${elmnt.value}`,
                      tedad: `${varElmnt.value}`,
                      vahed: `${unitElmnt.value}`,
                      tozihat: `${textElmnt.value}`,
                    };
                    cntr = cntr + 1;
                    Factor.push(factorRes);
                  });
                });
              });
            });
          });
          let bossAnswer = document.querySelector("#answer-boss").value;
          let bosAnswer = {
            ticketId: `${ticket.id}`,
            text: `${bossAnswer}`,
          };
          console.log(bosAnswer);
          postData(`${IP}/api/v1/messages/create`, bosAnswer).then((res) => {
            console.log(res);
          });
          postData(`${IP}/api/v1/factor/create`, Factor).then((res) => {
            console.log(res);
          });
        });
      }
    }, 1000);

    document.querySelector("#download-file").addEventListener("click", () => {
      window.location.assign(`${IP}/api/v1/files/${ticket.file.id}`);
    });

    setTimeout(() => {
      showFactor();
      factorCheck();
    }, 500);
  }
}

let pathname = location.pathname.slice(12) * 1;

async function tikcetSetup(id) {
  let url = `${IP}/api/v1/tickets/${id}`;
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

async function logout() {
  document.querySelector("#logout").classList.add("logout-active");
  await getAPI("http://192.168.1.104:3000/api/v1/users/logout").then(
    (response) => {
      location.assign("/");
    }
  );
}
