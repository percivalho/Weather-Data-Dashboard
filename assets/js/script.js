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
console.log(forecastEl);
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
/*<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>*/



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


function fiveDaysForcast(lat, long){
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + apiKey + '&units=metric';
  fetch(weatherUrl)
  .then(function (response) {
    //console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    div1 = document.createElement('div');
    div1.classList.add('row',  'row-cols-1', 'row-cols-md-5');

    for (var i=7; i<data.list.length; i+=8){
      console.log(i);
      div2 = document.createElement('div');
      div2.classList.add('card', 'm-2');
      div2.style.width = '9rem';
      
      div3 = document.createElement('div');
      div3.classList.add('card-body');

      h5El = document.createElement('h5');
      h5El.classList.add('card-title');

      var strDate = dayjs(data.list[i].dt_txt).format('DD/MM/YYYY');
      h5El.textContent = strDate;
      console.log(strDate);

      p1El = document.createElement('p');
      p1El.classList.add('card-text');
      
      var weather = ''
      if (data.list[i].weather.main == 'Clouds'){
        weather = '☁️'; 
      } else if (data.list[i].weather.main == 'Rain'){
        weather = '🌧 '; 
      } else if (data.list[i].weather.main == 'Clear') {
        weather = '☀️';
      }   
      p1El.textContent = weather;
      
      p2El = document.createElement('p');
      p2El.classList.add('card-text');
      p2El.textContent = "Temp: " + data.list[i].main.temp;

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

/*<div class="row row-cols-1 row-cols-md-5">
<div class="card m-2" style="width: 9rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>*/



    /*☀️☁️ 🌧 */
    /*var datenow = dayjs.unix(data.dt);
    var formDateNow = datenow.format('DD/MM/YYYY');
    var weather = "";
    console.log(data.weather[0].main);
    if (data.weather[0].main == 'Clouds'){
      weather = '☁️'; 
    } else if (data.weather[0].main == 'Rain'){
      weather = '🌧 '; 
    } else if (data.weather[0].main == 'Clear') {
      weather = '☀️';
    }*/
    //cityNameEl.textContent = data.name + " " + formDateNow + " " + weather;
    //cityNameEl.textContent = city + " " + formDateNow + " " + weather;
    //console.log(data.main.temp);
    //windEl.textContent = 'Wind: ' + data.wind.speed + ' mph';
    //humidityEl.textContent = 'Humidity: ' + data.main.humidity + ' %' ;
    //currentTempEl.textContent = 'Current Temp: ' + data.main.temp + " °C";
    //console.log('Current Temp: ' + data.main.temp);
    //console.log(currentTempEl);






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
  city = cityInput.value;
  //console.log(city);
  //city = 'Birmingham';
  //city = 'Hong Kong';
  //city = 'Macau';
  retrieveLatLong(city);
  //console.log(currentCity);
  
}


$(function () {

  searchButton.addEventListener('click', getApi);
  
});
