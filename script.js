const userTab = document.querySelector("[data-userWeather]") ; 
const searchTab = document.querySelector("[data-searchedWeather]") ; 
const userContainer = document.querySelector(".weather-container");
const searchForm = document.querySelector('[data-searchForm]');
const grantAccessContainer = document.querySelector(".grant-location-container");

const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessButton = document.querySelector('[data-grantAccess]');

// Initailly needed variable 


let currentTab = userTab ; 
const API_KEY = "9a1cddcf06f72d6c661d08d618e32176" ; 
currentTab.classList.add("current-tab") ; 
getFromSessionStorage();


function switchTab(clickedTab){
   if(clickedTab != currentTab){
      currentTab.classList.remove("current-tab") ; 
       currentTab = clickedTab ;
       currentTab.classList.add("current-tab") ; 
 
       if(!searchForm.classList.contains("active")){
         //kya search form wala container is invisible, if yes then make it visible

         userInfoContainer.classList.remove("active") ; 
         grantAccessContainer.classList.remove("active") ; 
         searchForm.classList.add("active") ; 
       }
       else{
         //pehle search tab pr tha ,ab your weather visible karna he
           searchForm.classList.remove("active") ; 
           userInfoContainer.classList.remove("active") ; 
           //ab me your weather tab me aagya hu, toh weather  bhi display karna padega
           //lets check local storage for coordinates  if we saved them there
           getFromSessionStorage() ; 
       }
   }
}



userTab.addEventListener('click' , ()=> {
   // pass clicked tab as input parameter 
   switchTab(userTab) ; 
})

 searchTab.addEventListener('click',()=>{
    // pass clicked tab as input parameter 
   switchTab(searchTab);
 }) ; 

 function getFromSessionStorage() {
   const localCoordinates = sessionStorage.getItem("user-coordinates") ; 
   if(!localCoordinates){
   // agar local cooordinates nahi hai 
     grantAccessContainer.classList.add("active") }
     else{
      const coordinates = JSON.parse(localCoordinates) ; 
      fetchUserWeatherInfo(coordinates) ; 
     }

 }
 
 async function fetchUserWeatherInfo(cooordinates){
   const {lat,lon}= cooordinates ;
   //make grantcontainer visible 
    grantAccessContainer.classList.remove("active") ; 
    //make loader visible
    loadingScreen.classList.add("active"); 

    //API CALL
    try{
        
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json() ; 
        loadingScreen.classList.remove("active") ;
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data) ;
    }
    catch(err){
      loadingScreen.classList.remove("active")

    }
 }


 function renderWeatherInfo(weatherInfo)  {

   //firstly w
   const cityName = document.querySelector("[data-cityName]")
   const countryIcon = document.querySelector("[data-countryIcon]")
   const description = document.querySelector("[data-weatherDescription]") ; 

   const weatherIcon = document.querySelector("[data-weatherIcon]") ; 
   const temperature = document.querySelector("[data-temperature]") ; 
   const windspeed = document.querySelector("[data-windspeed]") ; 
   const humidity = document.querySelector("[data-humidity]") ; 
   const cloudiness = document.querySelector("[data-clouds]"); 

   //fetch values from weather Info object ant put it in UI elements
    cityName.innerText = weatherInfo?.name ; 
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo.sys?.country.toLowerCase()}.png` ;
    
    description.innerText = weatherInfo?.weather?.[0]?.description ;
     weatherIcon.src= `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`
     temperature.innerText = `${weatherInfo?.main?.temp} °C`;
     windspeed.innerText = `${weatherInfo?.wind?.speed} m/s` ; 
     humidity.innerText = `${weatherInfo?.main?.humidity} %` ; 
     cloudiness.innerText =`${ weatherInfo?.clouds?.all }%` ;   
 }

 grantAccessButton.addEventListener('click' , getLocation);
   

   function getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)  ;
    }
   }

   function showPosition(position) {
    const userCoordinates = { 
      lat: position.coords.latitude ,
      lon : position.coords.longitude
    } 

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates))
    fetchUserWeatherInfo(userCoordinates) ;
   }


    let searchInput =document.querySelector("[data-searchInput]") ; 


   searchForm.addEventListener('submit',(e) =>{
    e.preventDefault() ; 
    let cityName = searchInput.value  ;
    if(cityName ==="")return ;
  
     else 
    fetchSearchWeatherInfo(cityName)  });
    
   async function fetchSearchWeatherInfo(city) { 
    loadingScreen.classList.add("active") ; 
    userInfoContainer.classList.remove("active") ; 
    grantAccessContainer.classList.remove("active") ; 

    try { 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      ) ;
      const data = await response.json() ; 
      loadingScreen.classList.remove("active") ; 
      userInfoContainer.classList.add("active") ; 
      renderWeatherInfo(data) ;
    }
    catch(e) { 

    }
   }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //API CALL
   
// async function t () { 
//     let  city = "delhi" ; 
//     let key = "9a1cddcf06f72d6c661d08d618e32176"

//     let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
//  let data = await result.json() ; 
//  console.log(data);


// }



// TO PRINT LATTITUDE AND LONGITUDE

// function getLoc() {
//     if(navigator.geolocation) { 
//         navigator.geolocation.getCurrentPosition(show) 

//     }
//     function show(position) {
//         let lat = position.coords.latitude ; 
//         let lon = position.coords.longitude ; 
//         console.log(lat);
//         console.log(lon);
//     }
// }