var apiKey = '77ca7d6ec3122dd37ca00d73aa375bef';
//var lat = 52.489471
//var long = -1.898575

//var issueContainer = document.getElementById('issues');
var searchButton = document.getElementById('search-button');
var cityNameEl = document.getElementById('city-name');
var currentTempEl = document.getElementById('current-temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var cityInput = document.getElementById('current-city')
var forecastEl = document.getElementById('forecast');
var historyEl = document.getElementById('history');

//console.log(forecastEl);
//var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric';
//var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric';
//var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}             &appid={API key}
//console.log(requestUrl);

function retrieveLatLong(city){
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + '&appid=' + apiKey;
  var lat = 0;
  var long =0;
  fetch(requestUrl)
  .then(function (response) {
    //console.log(response);
    return response.json();
  })
  .then(function(data){
    console.log('retrieveLatLong');
    console.log(data);

    lat = data.coord.lat;
    long = data.coord.lon;
    city = data.name;

    console.log(`Latitude: ${lat}, Longitude: ${long}, City: ${city}`);
    currentWeatherApi(lat, long, city);  

  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
}


function currentWeatherApi(lat, long, city){
  //var currentWeatherUrl = 
  var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric';
  fetch(currentWeatherUrl)
  .then(function (response) {
    //console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    /*☀️☁️ 🌧 */
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
    //cityNameEl.textContent = data.name + " " + formDateNow + " " + weather;
    cityNameEl.textContent = city + " " + formDateNow + " " + weather;
    //console.log(data.main.temp);
    windEl.textContent = 'Wind: ' + data.wind.speed + ' mph';
    humidityEl.textContent = 'Humidity: ' + data.main.humidity + ' %' ;
    currentTempEl.textContent = 'Current Temp: ' + data.main.temp + " °C";
    console.log('Current Temp: ' + data.main.temp);
    console.log(currentTempEl);

    fiveDaysForcast(lat, long);
    // push to array and local storage
    saveHistory(city);    
  });

}

function saveHistory(city){
  console.log("save city is:");
  console.log(city);
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


function fiveDaysForcast(lat, long){
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric';
  fetch(weatherUrl)
  .then(function (response) {
    //console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    var k = document.getElementById('five-day');
    if (k){ // only remove it when there is already five-day there
      forecastEl.removeChild(k);
    }

    div1 = document.createElement('div');
    div1.classList.add('row',  'row-cols-1', 'row-cols-md-5');
    div1.setAttribute('id', 'five-day');

    for (var i=7; i<data.list.length; i+=8){
      console.log(i);
      div2 = document.createElement('div');
      div2.classList.add('card', 'm-2');
      div2.style.width = '11rem';
      
      div3 = document.createElement('div');
      div3.classList.add('card-body');

      h5El = document.createElement('h5');
      h5El.classList.add('card-title');

      var strDate = dayjs(data.list[i].dt_txt).format('DD/MM/YYYY');
      h5El.textContent = strDate;
      //console.log(strDate);

      p1El = document.createElement('p');
      p1El.classList.add('card-text');
      
      var weather = ''
      //console.log(data.list[i].weather[0].main);
      if (data.list[i].weather[0].main == 'Clouds'){
        weather = '☁️'; 
      } else if (data.list[i].weather[0].main == 'Rain'){
        weather = '🌧 '; 
      } else if (data.list[i].weather[0].main == 'Clear') {
        weather = '☀️';
      }   
      p1El.textContent = weather;
      //console.log(weather);      
      
      p2El = document.createElement('p');
      p2El.classList.add('card-text');
      p2El.textContent = "Temp: " + data.list[i].main.temp + " °C";
      //console.log(data.list[i].main.temp);

      p3El = document.createElement('p');
      p3El.classList.add('card-text');
      p3El.textContent = "Wind: " + data.list[i].wind.speed + ' mph';

      p4El = document.createElement('p');
      p4El.classList.add('card-text');
      p4El.textContent = "Humidity: " + data.list[i].main.humidity + ' %';

      h5El.appendChild(p1El)
      h5El.appendChild(p2El);
      h5El.appendChild(p3El);
      h5El.appendChild(p4El);

      div3.appendChild(h5El);
      div2.appendChild(div3);
    
      div1.appendChild(div2);

    }
    forecastEl.appendChild(div1);


  });


}

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
  //console.log(city);
  //city = 'Birmingham';
  //city = 'Hong Kong';
  //city = 'Macau';
  retrieveLatLong(city);
  //console.log(currentCity);
  cityInput.value = '';
  
}


$(function () {

  searchButton.addEventListener('click', getApi);

  document.addEventListener('click', function(event) {
    if (event.target.matches('.histBtn')) {
      getApi(event);
    }
  });  

});
