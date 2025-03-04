// API =>  https://api.aladhan.com/v1/timingsByAddress/09-03-2015?address=Dubai,UAE&method=8&tune=2,3,4,5,2,3,4,5,-3
const { axios } = require("axios");
let planet = document.getElementById("planet");
let clock = new Date().getHours();
let header = document.getElementsByTagName("header")[0];
console.log(header)
console.log(clock)
if (clock >= 17 || clock < 8){
planet.classList.remove('sun');
planet.classList.add('moon');
header.style.cssText = `background: linear-gradient(to top,#702963,rgb(0, 0, 0));`;
}else{
    planet.classList.remove('moon');
    planet.classList.add('sun');
    header.style.cssText = `background: linear-gradient(to top, #f7f7f7,rgb(162, 234, 247));`;
}


let submit = document.getElementById('submit');
window.onload = function () {
    let recovery = JSON.parse(localStorage.getItem('user'));
    if (recovery) {
        document.getElementById('country').value=recovery.countryvalue;
        document.getElementById('city').value=recovery.cityvalue;
    }
    let currentDate = new Date();
    let formattedDate = currentDate.toDateString();
        let api = `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${recovery.cityvalue},${recovery.countryvalue}&method=8&tune=2,3,4,5,2,3,4,5,-3`;
        axios.get(api)
        .then(response => {
            let adhanTime = response.data.data.timings;
            for ([pray,time] of Object.entries(adhanTime)){
                let content = `
                <div id="${pray}" class="time">
                <p>${pray}</p>
                <span>${time}</span>
            </div>
                `
                document.getElementById('container').innerHTML += content;
            }
        })
        .catch(error => console.log("api request",error))

}

submit.onclick = function (){
    let country = document.getElementById('country').value;
    let city = document.getElementById('city').value;
    let user = { countryvalue: country, cityvalue: city };
    localStorage.setItem('user', JSON.stringify(user));    
    window.location.reload()
}