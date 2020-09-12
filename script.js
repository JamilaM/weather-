const search = document.querySelector("form.search");
const input = document.querySelector(".search input");
const errorMsg = document.querySelector(".error");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const highLow = document.querySelector(".high-low");
const additional = document.querySelector(".additional");
const apiKey = "e7c3f734f8a7652718be39da401b7675";



window.addEventListener('load', e => {
  registerSW(); 
});


 
search.addEventListener("submit", e => {
  e.preventDefault();
  const searchValue = input.value;
  
    
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=metric`;
    
 fetch(url) 
  .then(response => response.json()) 
  .then(data => { 
     const { main, name, sys, weather, wind } = data;
     let dateNow = new Date();
     let sectionDivs = document.querySelectorAll("section.info > div");
     
     temp.innerHTML = `${Math.round(main.temp)}<sup>°C</sup><span>${weather[0]["description"]}</span>`;
     
     city.innerHTML = `<h2>${name}
    <sup>${sys.country}</sup><span>${dateNow.toDateString()}</span></h2>`;
     
     highLow.innerHTML = `<p><span>High-Low</span>${Math.round(main.temp_max)}/${Math.round(main.temp_min)}<p>`;
     
     icon.innerHTML = `<div><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg"></div>`;
     
     additional.innerHTML = `<p>Feels Like: ${Math.round(main.feels_like)}<sup>°C</sup></p><p>Humidity: ${main.humidity}</p><p>Pressure: ${main.pressure}</p><p>Wind Speed: ${wind.speed}</p>`; 
     
     sectionDivs.forEach(function(div){
      div.classList.add("style");
   })
    
 }) 

   .catch(() => { 
     errorMsg.textContent = "Please Enter a valid city"; 
 });
    
    errorMsg.textContent = "";
    search.reset();
    input.focus();
    
});


async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log('SW registration failed');
    }
  }
}
    
    

