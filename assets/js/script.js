var apiKey = '77ca7d6ec3122dd37ca00d73aa375bef';

var searchButton = document.getElementById('search-button');
var cityNameEl = document.getElementById('city-name');
var currentTempEl = document.getElementById('current-temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var cityInput = document.getElementById('current-city')
var forecastEl = document.getElementById('forecast');
var historyEl = document.getElementById('history');
var errorEl = document.getElementById('error');


/**
 * to retrieve the Latitude and Longitude from city name using api 
 * @param city
 * @returns respoonse.json() upon response failed
 */
function retrieveLatLong(city){

  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + '&appid=' + apiKey;
  var lat = 0;
  var long =0;
  errorEl.textContent = "";

  fetch(requestUrl)
  .then(function (response) {
    if (response.status !== 200){
      console.log(response);
    }   
    return response.json();
  })
  .then(function(data){
    //console.log('retrieveLatLong');
    //console.log(data);

    if (data.cod == 404){
      errorEl.textContent = data.message;
    } else {
      lat = data.coord.lat;
      long = data.coord.lon;
      city = data.name;
      ctcd = data.sys.country;
      
      console.log(`Latitude: ${lat}, Longitude: ${long}, City: ${city}, Country: ${ctcd}`);
      currentWeatherApi(lat, long, city, ctcd);    
    }

  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    errorEl.textContent = "Connection Error";

  });
}

/**
 * to retrieve the current weather info from input parameter
 * @param Latitude 
 * @param Longitude
 * @param City - City name
 * @param ctcd - Country Code, add this for Birmingham has US and UK 
 * @returns respoonse.json() upon response failed
 */
function currentWeatherApi(lat, long, city, ctcd){
  //var currentWeatherUrl = 
  var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric';
  // not working for one-call on free account
  //var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric';
  fetch(currentWeatherUrl)
  .then(function (response) {
    if (response.status !== 200){
      console.log(response);
    }
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var datenow = dayjs.unix(data.dt);
    var formDateNow = datenow.format('DD/MM/YYYY');
    var weather = "";
    console.log(data.weather[0].main);
    if (data.weather[0].main == 'Clouds'){
      weather = '☁️'; 
    } else if (data.weather[0].main == 'Rain'){
      weather = '🌧 '; 
    } else if (data.weather[0].main == 'Clear') {
      weather = '☀️';
    }
    cityNameEl.textContent = city + ", " + ctcd + " (" + formDateNow + ") " + weather;
    windEl.textContent = 'Wind: ' + data.wind.speed + ' mph';
    humidityEl.textContent = 'Humidity: ' + data.main.humidity + ' %' ;
    currentTempEl.textContent = 'Current Temp: ' + data.main.temp + " °C";
    console.log('Current Temp: ' + data.main.temp);
    console.log(currentTempEl);

    // continue to retrieve the 5 days forecast
    fiveDaysForcast(lat, long);
    // push to array and local storage
    saveHistory(city);    

  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    errorEl.textContent = "Connection Error";
  });

}

/**
 * to save the city to save history (local storage)
 * @param City 
 * @returns None
 */
function saveHistory(city){
  //console.log("save city is:");
  //console.log(city);
  // get localHistory to array
  var array = [];
  if (localStorage.getItem('saved-cities')!= null){
    array = JSON.parse(localStorage.getItem('saved-cities'));
  }
  // Find the index of the element in the array
  var index = array.indexOf(city);
  // Check if the element exists (index will be -1 if the element is not found)
  if (index !== -1) {
    // Remove the element using splice()
    array.splice(index, 1);
  }  
  array.push(city);
  console.log(array);
  localStorage.setItem('saved-cities', JSON.stringify(array));
  // remove existing entries
  // Remove all li elements (children) from the ul
  while (historyEl.firstChild) {
    historyEl.removeChild(historyEl.firstChild);
  }  
  // create all childs
  for (i=array.length-1; i>=0; i--){
    liEl = document.createElement('li');
    liEl.textContent = array[i];
    liEl.classList.add('histBtn',  'btn', 'btn-primary', 'w-100', 'list-group-item', 'list-group-item-action', 'mb-1');
    console.log(liEl);
    historyEl.appendChild(liEl);
  }
  
}

/**
 * to load the save history from local history
 * @param None
 * @returns None
 */
function loadFromLocalStorage(){
  var array = [];
  if (localStorage.getItem('saved-cities')!= null){
    array = JSON.parse(localStorage.getItem('saved-cities'));
  }
  while (historyEl.firstChild) {
    historyEl.removeChild(historyEl.firstChild);
  }  
  // create all childs
  for (i=array.length-1; i>=0; i--){
    liEl = document.createElement('li');
    liEl.textContent = array[i];
    liEl.classList.add('histBtn',  'btn', 'btn-primary', 'w-100', 'list-group-item', 'list-group-item-action', 'mb-2');
    console.log(liEl);
    historyEl.appendChild(liEl);
  }

}

/**
 * to retreive the five day Forecast
 * @param Latitude
 * @param Longitude
 * @returns response.json()
 */
function fiveDaysForcast(lat, long){
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric';
  fetch(weatherUrl)
  .then(function (response) {
    if (response.status !== 200){
      console.log(response);
    }
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    
    //console.log(data);

    var k = document.getElementById('five-day');
    if (k){ // only remove it when there is already five-day there
      forecastEl.removeChild(k);
    }

    div1 = document.createElement('div');
    div1.classList.add('row',  'row-cols-1', 'row-cols-md-6');
    div1.setAttribute('id', 'five-day');
    div1.style.display = "flex"; // Add this line
    div1.style.justifyContent = "center"; // Add this line    

    for (var i=7; i<data.list.length; i+=8){
      console.log(i);
      div2 = document.createElement('div');
      div2.classList.add('card', 'm-1');
      div2.style.backgroundSize = "cover";
      div2.style.backgroundPosition = "center"; // to center the cards

      div3 = document.createElement('div');
      div3.classList.add('card-body');

      h5El = document.createElement('h5');
      h5El.classList.add('card-title');
      h5El.style.fontWeight = 'bold'; // Make the font bolder
      h5El.style.color = 'white'; // Set the font color to white      

      var strDate = dayjs(data.list[i].dt_txt).format('DD/MM/YYYY');
      h5El.textContent = strDate;

      p1El = document.createElement('p');
      p1El.classList.add('card-text');
      p1El.style.fontSize = "24px"; // Set font size to 24 pixels

      var weather = ''
      if (data.list[i].weather[0].main == 'Clouds'){
        weather = '☁️'; 
        div2.style.backgroundImage = "url('./assets/images/cloudy.jpg')";
        
      } else if (data.list[i].weather[0].main == 'Rain'){
        weather = '🌧 '; 
        div2.style.backgroundImage = "url('./assets/images/rainy.jpg')";

      } else if (data.list[i].weather[0].main == 'Clear') {
        weather = '☀️';
        div2.style.backgroundImage = "url('./assets/images/sunny.jpg')";
      }   
      p1El.textContent = weather;
      
      p2El = document.createElement('p');
      p2El.classList.add('card-text');
      p2El.style.color = 'white'; // Set the font color to white      
      p2El.textContent = "Temp: " + data.list[i].main.temp + " °C";

      p3El = document.createElement('p');
      p3El.classList.add('card-text');
      p3El.style.color = 'white'; // Set the font color to white      
      p3El.textContent = "Wind: " + data.list[i].wind.speed + ' mph';

      p4El = document.createElement('p');
      p4El.classList.add('card-text');
      p4El.style.color = 'white'; // Set the font color to white      
      p4El.textContent = "Humidity: " + data.list[i].main.humidity + ' %';

      // Append the paragraphs as siblings of h5El
      div3.appendChild(h5El);
      div3.appendChild(p1El);
      div3.appendChild(p2El);
      div3.appendChild(p3El);
      div3.appendChild(p4El);

      div2.appendChild(div3);
    
      div1.appendChild(div2);

    }
    forecastEl.appendChild(div1);

  });

}


/**
 * to get Api - wrapper function
 * @param event
 * @returns none
 */
function getApi(event) {
  //console.log("Clicked");
  event.preventDefault();
  if (cityInput.value){
    city = cityInput.value;
    console.log("cityInput");
    console.log(city);
  } else {
    city = event.target.textContent;
    console.log("Event");
    console.log(city);
  }
  retrieveLatLong(city);
  cityInput.value = '';  
}


$(function () {

  // search button clicked
  searchButton.addEventListener('click', getApi);

  // load from local Storage
  loadFromLocalStorage();

  // for clicking on saved history button
  document.addEventListener('click', function(event) {
    if (event.target.matches('.histBtn')) {
      getApi(event);
    }
  });  

  // clear the error message upon focus on input field
  cityInput.addEventListener('focus', function() {
    errorEl.textContent = "";
  });  

});
