let input = document.querySelector('input');
let city = document.querySelector('.city');
let btn = document.querySelector('button');
let cloudy = document.querySelector('#cldy');
let dateTime = document.querySelector('.time');
let temperature = document.querySelector('.tempture-scale');
let wind = document.querySelector('.wind-scale');
let humidity = document.querySelector('.humidity-scale');
let cloud = document.querySelector('.cloud-scale');
let feellike = document.querySelector('.feellike-scale');
let dewPoint = document.querySelector('.dew-point-scale');
let pressure = document.querySelector('.pressure-scale');
let UVscale = document.querySelector('.uv-index-scale');
let UVupdown = document.querySelector('.uv-index-scale-updown');
// let apiimg = document.querySelector('#apiimg');
// let URL = "https://api.weatherapi.com/v1/current.json?key=f138d9e1d9e9465e89165839241808&q=contai&aqi=yes";
function showTime() {
    const datee = new Date().toLocaleDateString(); // e.g., "8/20/2024" or "20/8/2024" depending on locale
const timee = new Date().toLocaleTimeString()
const dateTimeString = `${datee} - ${timee}`;
dateTime.innerText = dateTimeString;
}
setInterval(() => {
    showTime()
}, 1000);

btn.addEventListener('click',weatherall)
input.addEventListener('keydown', (e) => {
    // console.log(e);
    if (e.code == "Enter" && e.key == "Enter") {
        weatherall()
    }
})

function weatherall(){
    // cloudy.innerText = 'sdjshdus'
    if (input.value) {

        // sessionStorage.clear();
        let urlFpart="https://api.weatherapi.com/v1/current.json?key=f138d9e1d9e9465e89165839241808&q=";
        let urlSpart = "&aqi=yes";
        let uniqueParam = `&nocache=${new Date().getTime()}`;  // Add unique timestamp to URL
        // console.log(uniqueParam)
        let FinalAPI=urlFpart+`${input.value}`+urlSpart+uniqueParam;
        // let actualCity = input.value;
        fetch(FinalAPI)
            .then((resp) => {
                return resp.json();
        })
            .then((data) => {
                let apiimg = document.querySelector('#apiimg');
                console.log(data)
                if (data.current.condition.text.toLowerCase() == "clear") {
                    apiimg.src = 'images/clear-removebg.png';
                } 
                else if (data.current.condition.text.toLowerCase() == "mist") {
                    apiimg.src = 'images/mist-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "light rain" || data.current.condition.text.toLowerCase() == "light rain shower") {
                    apiimg.src = 'images/light_rain_shower-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "partly cloudy") {
                    apiimg.src = 'images/partly_cloudy-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "fog") {
                    apiimg.src = 'images/fog.png';
                }
                else if (data.current.condition.text.toLowerCase() == "cloudy") {
                    apiimg.src = 'images/cloudy-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "thundery outbreaks in nearby") {
                    apiimg.src = 'images/thundery_outbreaks-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "patchy light drizzle") {
                    apiimg.src = 'images/patchy_light_drizzle-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "sunny") {
                    apiimg.src = 'images/sunny-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "patchy rain nearby") {
                    apiimg.src = 'images/patchy_rain_nearby-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "overcast") {
                    apiimg.src = 'images/overcast-removebg.png';
                }
                else if (data.current.condition.text.toLowerCase() == "moderate or heavy rain shower") {
                    apiimg.src = 'images/patchy_light_drizzle-removebg.png';
                }
                    
                    
                    
                else {
                    apiimg.src = `${data.current.condition.icon}`;
                }
                
                cloudy.innerText = data.current.condition.text;
                city.innerText = `${data.location.name}, ${data.location.region}`;
                let date = data.location.localtime;
                let time = date.slice(11, 16)
                time=time.split(":")
                date = date.slice(0, 10);
                let mins =new Number(time[1]);
                let min2 =  mins + 2;
                // console.log(min2)
                date=date.split("-")
                // console.log(`${date[2]}/${date[1]}/${date[0]}=${time[0]}:${min2}`)
                dateTime.innerText = `${date[2]}/${date[1]}/${date[0]}, ${time[0]}:${min2}`;
                let temc=data.current.temp_c
                temc = temc - 1;
                temc = temc.toFixed(1);
                temperature.innerText = temc;
                wind.innerText = data.current.wind_kph;
                humidity.innerText=data.current.humidity;
                cloud.innerText = data.current.cloud;
                feellike.innerText = data.current.feelslike_c;
                dewPoint.innerText = data.current.dewpoint_c;
                pressure.innerText = data.current.pressure_mb;
                UVscale.innerText = data.current.uv;
                if ((data.current.uv)-1 <= 2) {
                    UVupdown.innerText = 'Low';
                }
                else if ((data.current.uv)-1 <= 5) {
                    UVupdown.innerText = 'Moderate';
                }
                else if ((data.current.uv)-1 <= 7) {
                    UVupdown.innerText = 'High';
                }
                else if ((data.current.uv)-1 <= 10) {
                    UVupdown.innerText = 'Very High';
                }
                else if ((data.current.uv)-1 >= 11) {
                    UVupdown.innerText = 'Extreme';
                }

                // console.log(apiimg);
                
            })
        
            .catch((er) => {
                console.log("API Can't found data, ERROR is:-", er);
                alert("Enter Your VALID CITY Name ‼️");
            })
        
            input.value = "";
    }
    else {
        alert("Please Enter city Name");
    }

}