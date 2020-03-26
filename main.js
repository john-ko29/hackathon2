var mainElement = document.getElementById("main");
var formElement = document.getElementById("forecast-form");
var cityFormElement = document.getElementById("forecast-city");
var optionalElement = document.getElementById("formOptional");
var cityForecastElement = document.getElementById("formCity");

var forecast = new Forecast(mainElement, formElement, optionalElement, cityFormElement, cityForecastElement);
var app = new App(mainElement, forecast);
app.start();
