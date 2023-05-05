var key = '77ca7d6ec3122dd37ca00d73aa375bef';
var lat = 52.489471
var long = -1.898575

//var issueContainer = document.getElementById('issues');
var searchButton = document.getElementById('search-button');
var cityNameEl = document.getElementById('city-name');
var currentTempEl = document.getElementById('current-temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');

var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + key + '&units=metric';
var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + key + '&units=metric';
//var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}             &appid={API key}
console.log(requestUrl);

function currentWeatherApi(){
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
    }
    cityNameEl.textContent = data.name + " " + formDateNow + " " + weather;
    console.log(data.main.temp);
    windEl.textContent = 'Wind: ' + data.wind.speed + ' mph';
    humidityEl.textContent = 'Humidity: ' + data.main.humidity + ' %' ;
    currentTempEl.textContent = 'Current Temp: ' + data.main.temp + " °C";
    console.log('Current Temp: ' + data.main.temp);
    console.log(currentTempEl);
    /*for (var i = 0; i < data.length; i++) {
      var userName = document.createElement('h3');
      var issueTitle = document.createElement('p');
      userName.textContent = data[i].user.login;
      issueTitle.textContent = data[i].title;
      issueContainer.append(userName);
      issueContainer.append(issueTitle);
    }*/
  });

}

function getApi(event) {
  //console.log("Clicked");
  event.preventDefault();
  currentWeatherApi();
}


$(function () {

  searchButton.addEventListener('click', getApi);
  
});
