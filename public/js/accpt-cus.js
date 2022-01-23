//Variables
const menuBtn = document.querySelector('.menu-btn')
const menuTabs = document.querySelector('.menu-tabs')
const profPic = document.querySelector('.prof-pic')
const profPicMenu = document.querySelector('.pic-menu')
const navLogo = document.querySelector('#logo')
const profMenuPic = document.querySelector('#menu-prof')
const employeePic = document.querySelector('#employee-box')
const profPicture = document.querySelector('#prof-pic')
const customerDate = document.querySelector('#date')
const customerName = document.querySelector('#customer-name')
const customerStatus = document.querySelector('#customer-status')
const requestTitle = document.querySelector('#request-title')
const requestsBox = document.querySelector('.requests')
const searchField = document.querySelector('.search-field')
const container = document.querySelector('.container')
const ticketBox = document.querySelector('.main-box')

//Picture menu variables
const backBtn = document.querySelector('#prev')

//bool 
let menuOpen = false;
let picOpen = false;

//EventListeners
menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open')
        menuOpen = true;
        menuTabs.classList.add('open')
    } else {
        menuBtn.classList.remove('open')
        menuOpen = false;
        menuTabs.classList.remove('open')
        menuTabs.classList.add('close') 
        
    }
})

const nameMenu = document.querySelector('#name')
const stateMenu = document.querySelector('#state')
const emailMenu = document.querySelector('#email')

//Profile picture click eventslistener
profPic.addEventListener('click', () => {
    if(!picOpen) {
        profPicMenu.style.display = 'flex'
        setTimeout(() => {
            profPicMenu.classList.add('open')
            picOpen = true;
        }, 200)
        profPic.classList.add('hidden')
        setTimeout(() => {
            profMenuPic.classList.add('move-1')
        },300)
        navLogo.classList.add('move')
        profMenuPic.style.visibility = 'visible'
    }
})

//Picture menu 
backBtn.addEventListener('click', () => {
    profPicMenu.classList.remove('open')
    profPicMenu.classList.add('close')
    setTimeout(() => {
        profPicMenu.style.display = 'none'
        profMenuPic.style.visibility = 'hidden'
        profMenuPic.classList.remove('move-1')
    }, 800)
    picOpen = false;
    navLogo.classList.add('rev-move')
    navLogo.classList.remove('move')
    profPic.classList.remove('hidden')
})

//personalData (eventListener, class, functions)
let dataMenu = new Promise((resolve, reject) => {
    resolve(
        fetch('../dataBase/data.json')
        .then((element) => element.json())
        .then((user) => dataMenu = user)
    ) 
    reject('get some error')
    
})

dataMenu.then((resualt) => {
    new Employee(`${resualt.adora.img}`, `${resualt.adora.name}`, 
    `${resualt.adora.state}`, `${resualt.adora.email}`)
})




//classes
class Employee {
    constructor(prof, name, state, email) {
        //get data from the initialiser
        this.profPic = prof
        this.name = name
        this.state = state
        this.email = email
        //set data in the html fields
        profPicture.setAttribute('src', this.profPic)
        profMenuPic.setAttribute('src', this.profPic)
        // employeePic.setAttribute('src', this.profPic)
        nameMenu.textContent = this.name
        stateMenu.textContent = this.state
        emailMenu.textContent = this.email
    }
}

class Ticket {
    constructor(ticket) {
        let data = document.createElement('div')
            data.classList.add('header')
            let title = document.createElement('h2')
            title.textContent = 'درخواست شماره: '
            data.appendChild(title)
            let reqNum = document.createElement('h3')
            reqNum.textContent = ticket.id * 234 + 23321
            data.appendChild(reqNum)
        container.appendChild(data)
        let ticketBox = document.createElement('div')
            ticketBox.classList.add('ticket-box')
        let ticketHeader = document.createElement('div')
            ticketHeader.classList.add('ticket-header')
            ticketBox.appendChild(ticketHeader)
        let customerName = document.createElement('div')
            let name = document.createElement('h5')
                name.textContent = `${ticket.senderName} / شماره: ${ticket.id * 234 + 23321}`
            customerName.appendChild(name)
            customerName.classList.add('customer-name')
            ticketHeader.appendChild(customerName)
        let status = document.createElement('div')
            status.classList.add('status')
            let stat = document.createElement('h5')
                stat.textContent = `وضعیت: ${statusCheck()}`
            status.appendChild(stat)
            let date = document.createElement('h5')
                date.textContent = `تاریخ: ${ticket.createdAt}`
            status.appendChild(date)
            ticketHeader.appendChild(status)

            let ticketProb = document.createElement('div')
            ticketProb.classList.add('ticket-problem')
            let probInfo = document.createElement('div')
            probInfo.classList.add('prob-info')
            let city = document.createElement('h5')
            city.textContent = `شهر: ${ticket.city}`
            probInfo.appendChild(city)
            let center = document.createElement('h5')
            center.textContent = `مرکز: ${ticket.center}`
            probInfo.appendChild(center)
            let file = document.createElement('h5') 
            file.textContent = `فایل ضمیمه: `
            let btn = document.createElement('button')
            btn.classList.add('btn')
            btn.textContent = 'دانلود'
            btn.id = 'download-file'
            file.appendChild(btn)
            probInfo.appendChild(file)
            ticketProb.appendChild(probInfo)
            let probTitle = document.createElement('div')
            probTitle.classList.add('prob-title')
            let titleli = document.createElement('li')
            let titleTxt = document.createElement('h5')
            titleTxt.textContent = `عنوان درخواست: ${ticket.title}`
            titleli.appendChild(titleTxt)
            probTitle.appendChild(titleli)
            ticketProb.appendChild(probTitle)
            let probText = document.createElement('div')
            probText.classList.add('prob-text')
            let probli = document.createElement('li')
            let probtitle = document.createElement('h5')
            probtitle.textContent = `شرح درخواست: ${ticket.text}`
            probli.appendChild(probtitle)
            probText.appendChild(probli)
            ticketProb.appendChild(probText)
            ticketBox.appendChild(ticketProb)
        let ticketAnswer = document.createElement('div')
            ticketAnswer.classList.add('ticket-answer')
            let answer = document.createElement('div')
                answer.classList.add('answer')
            let tytle = document.createElement('h5')
                tytle.textContent = `پرسش و پاسخ: `
                answer.appendChild(tytle)
            ticket.message.forEach(answr => {
                console.log(answr.from);
                let txtBx = document.createElement('div')
                    let time = document.createElement('div')
                    if (answr.from == 'client') {
                        txtBx.classList.add('client')
                        txtBx.id = `${answr.id}`
                        time.classList.add('time-client')
                        console.log(answr.createdAt);
                    } else if(answr.from == 'boss') {
                        txtBx.classList.add('boss')
                        time.classList.add('time-boss')
                        txtBx.id = `${answr.id}`
                        console.log(answr.createdAt);
                    }
                    time.textContent = `${answr.createdAt}`
                    txtBx.textContent = `${answr.text}`
                    txtBx.appendChild(time)
                    answer.appendChild(txtBx)
            ticketAnswer.appendChild(answer)
            })
        let accptOrNot = document.createElement('div')
            accptOrNot.classList.add('accpt-fild')
            let slct = document.createElement('div')
                slct.classList.add('select')
                    let accptCheck = document.createElement('div')
                        let accInput = document.createElement('input')
                            accInput.setAttribute('type', 'checkbox')
                            accInput.id = 'accpt'
                            accInput.value = 'accpt'
                                let accLable = document.createElement('label')
                                    accLable.setAttribute('for', 'accpt')
                                    accLable.textContent = 'همه موارد را تایید می کنم.'
                                        let br = document.createElement('br')
                                    accLable.appendChild(br)
                            accInput.appendChild(accLable)
                        accptCheck.appendChild(accInput)
                        accptCheck.appendChild(accLable)
                    slct.appendChild(accptCheck)
            let send = document.createElement('div')
                send.classList.add('send')
                    let sendBtn = document.createElement('button')
                        sendBtn.classList.add('btn')
                        sendBtn.textContent = 'ارسال'
                    send.appendChild(sendBtn)
                    let textSend = document.createElement('textarea')
                        textSend.setAttribute('id', 'notaccpt')
                        textSend.setAttribute('cols', '25')
                        textSend.setAttribute('rows', '3')
                        textSend.setAttribute('placeholder', 'علت تایید نکرد...')
                    send.appendChild(textSend)
                    accptOrNot.appendChild(slct)
                    accptOrNot.appendChild(send)
                    setTimeout(() => {
                        
                        ticketBox.appendChild(accptOrNot)
                    }, 1000);
                    
        ticketBox.appendChild(ticketAnswer)

        let firsttime = true;
        let counter = 1;

        function showFactor() {

            const loadFactor = ticket.factors

            loadFactor.forEach(factor => {
                if (firsttime) {
                    let factore = document.createElement('div')
                        factore.classList.add('factore')
                    let heeader = document.createElement('div')
                        heeader.classList.add('heeader')
                        let obj = document.createElement('h5')
                            obj.textContent = 'شرح کالا'
                            heeader.appendChild(obj)
                        let num = document.createElement('h5')
                            num.textContent = 'تعداد'
                            heeader.appendChild(num)
                        let unit = document.createElement('h5')
                            unit.textContent = 'واحد'
                            heeader.appendChild(unit)
                        let tex = document.createElement('h5')
                            tex.textContent = 'توضیحات'
                            heeader.appendChild(tex)
                        factore.appendChild(heeader)
                    let fileds = document.createElement('div')
                        fileds.classList.add('fileds')
                        let cntr = document.createElement('h5')
                            cntr.textContent = `${factor.id}-`
                            fileds.appendChild(cntr)
                        let objj = document.createElement('input')
                            objj.setAttribute('readOnly', true)
                            objj.type = 'text'
                            objj.id = `obj`
                            objj.value = `${factor.name}`
                            fileds.appendChild(objj)
                        let val = document.createElement('input')
                            val.setAttribute('readOnly', true)
                            val.type = 'number'
                            val.value = `${factor.tedad}`
                            val.id = `val`
                            val.style.width = '10%'
                            fileds.appendChild(val)
                        let selct = document.createElement('select')
                            selct.id = 'unit-selector'
                                let optF = document.createElement('option')
                                    optF.textContent = `${factor.vahed}`
                                    selct.appendChild(optF)
                            fileds.appendChild(selct)
                        let text = document.createElement('textarea')
                            text.setAttribute('readOnly', true)
                            text.id = 'factor-info'
                            text.setAttribute("cols", 10)
                            text.setAttribute("rows", 1)
                            text.textContent = `${factor.tozihat}` 
                            fileds.appendChild(text)
                        factore.appendChild(fileds)
                    ticketBox.appendChild(factore)
                    counter = counter + 1;
                    firsttime = false
                } else {
                    let fileds = document.createElement('div')
                        fileds.classList.add('fileds')
                        let cntr = document.createElement('h5')
                            cntr.textContent = `${factor.id}-`
                            fileds.appendChild(cntr)
                        let obj = document.createElement('input')
                            obj.type = 'text'
                            obj.id = `obj`
                            obj.setAttribute('readOnly', true)
                            obj.value = `${factor.name}`
                            fileds.appendChild(obj)
                        let val = document.createElement('input')
                            val.type = 'number'
                            val.setAttribute('readOnly', true)
                            val.value = `${factor.tedad}`
                            val.id = `val`
                            val.style.width = '10%'
                            fileds.appendChild(val)
                        let selct = document.createElement('select')
                            selct.id = 'unit-selector'
                                let optF = document.createElement('option')
                                    optF.textContent = `${factor.vahed}`
                                    selct.appendChild(optF)
                            fileds.appendChild(selct)
                        let text = document.createElement('textarea')
                            text.setAttribute('readOnly', true)
                            text.id = 'factor-info'
                            text.setAttribute("cols", 10)
                            text.setAttribute("rows", 1)
                            text.textContent = `${factor.tozihat}` 
                            fileds.appendChild(text)
                            let factore = document.querySelector('.factore')
                            factore.appendChild(fileds)
                    
                    counter = counter + 1
                        
                }

                
            });

        } 
        let activeInputCheck = false

        accInput.addEventListener('click', () => {
            if(!activeInputCheck) {
                accInput.classList.add('active-input')
                activeInputCheck = true
                textSend.style.display = 'none'
                sendBtn.classList.add('move-btn')
            } else {
                accInput.classList.remove('active-input')
                activeInputCheck = false
                textSend.style.display = 'block'
                sendBtn.classList.remove('move-btn')
            }
        })

        sendBtn.addEventListener('click', () => {
            if(activeInputCheck) {
                    ``
            } else {
                console.log(textSend.value);
            }
        })

        

            container.appendChild(ticketBox)
        //function that check the status and change the color of them
        function statusCheck() {
            if(ticket.status == 'done') {
                stat.classList.add('done-status')
                return 'انجام شده'
            } 
            else if(ticket.status == 'pending') {
                stat.classList.add('pending-status')
                return 'جدید'
            }
            else {
                stat.classList.add('proccessing-status')
                return 'در حال انجام'
            }
        }

            document.querySelector('#download-file').addEventListener('click', ()=> {
                 window.location.assign(`http://194.62.43.146:3000/api/v1/files/${ticket.file.id}`)
            })

        setTimeout(() => {
           showFactor()
            
        }, 500);
    }
}

let pathname = location.pathname

async function tikcetSetup(id) {
    let url = `http://194.62.43.146:3000/api/v1/tickets/${id}`
    let data = await getAPI(url)
        data = data.data.ticket
        //send to the class
    new Ticket(data)
    
}tikcetSetup(1)


//get data from api function
async function getAPI(data) {
    let apiData = await fetch(data)
    .then((value) => value.json())
    .then((valu) => {
        return valu
    })
    return apiData
} 


//eventListeners with timeout




