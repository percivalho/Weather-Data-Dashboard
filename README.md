# Weather-Data-Dashboard

A weather data dashboard is built that will run in the browser and feature dynamically updated HTML and CSS. It can provide the current weather and 5 day forecast.


## User Story

```md
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```md
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

## Technologies Used

This application is built using the following technologies:

- **HTML5**: Markup language for structuring content.
- **CSS**: Stylesheet language for styling HTML content.
- **JavaScript**: Programming language for adding interactivity and dynamic content.
- **Bootstrap**: Front-end framework for developing responsive and mobile-first websites.

## APIs Used

This application is built using the following APIs:

- **DayJS**: for Date and Time.
- **OpenWeather**: for Weather APIs.


## Usage

open index.html in Google Chrome (recommended), the Weather Data Dashboard is shown as below:

![Weather Data Dashboard Start Page](assets/images/start.png)

Type in the city you search for the current weather and 5 days forecast and the city stored in local storage and can retrieve by clicking on the button on search history.

![Show the current weather and 5 days forecast ](assets/images/forecast.png)

It shows sunny, cloudy and rainy based on the forecast
![Sunny, cloudy and rainy](assets/images/sunny.png)

On Refresh the page, saved history still shown as buttons

![Local Storage](assets/images/storage.png)


## Features

it includes the following features:

1.  current weather and 5 days forecast of different cities of the world can be shown using OpenWeatherMap API.
2.  the city will be added to search history.
3.  for current weather, current temperature, humidity and wind speed and weather condition symbols are shown. 
4.  for 5 days forecase, similar info, date, temperature, wind speed and humidity are shown.
5.  the city in the search history can be clicked for search to retrieve current weather and 5 day forecast.
6.  on refreshing the page, the search history are still there.



## Tests

Testing done on:

1. testing on default page display on show up.
2. testing on input valid city name.
3. testing on input invalid city name, like Abc, with 'city not found'. 
4. testing on no internet connection, with 'Connection Error' on error message.
5. testing on the error message display disappear when focus on input field.
6. testing on display the current weather details including city, date, weather symbol, temperature, wind speed, and humidity.
7. testing on display the 5 day forecast details including date, weather symbol, temperature, wind speed, and humidity.
8. testing on clicking on saved city button and current and 5 day forecast display
9. testing on refreshing the page and those saved cities still can be found. 
10. testing on media break point and changing screen sizes.
11. testing on funny city names, like Bat Cave, Llanfairpwllgwyngyll and so on.



## Resources

Link to Deployed Website:


Link to GitHub repo:
https://github.com/percivalho/Weather-Data-Dashboard.git


## License 

![License badge](https://img.shields.io/badge/license-MIT-blue.svg)


## Credits and Copyright 
&copy; Copyright 2023 - Present. Percival Ho