var mainElement = document.getElementById("main");
var formElement = document.getElementById("forecast-form");
var cityFormElement = document.getElementById("forecast-city");
var optionalElement = document.getElementById("formOptional");
var cityForecastElement = document.getElementById("formCity");
var invalidModalElement = document.getElementById("invalidModal");
var invalidOkayElement = document.getElementById("invalidOkay");

var forecast = new Forecast(mainElement, formElement, optionalElement, cityFormElement, cityForecastElement, invalidModalElement);
var app = new App(mainElement, forecast, invalidOkayElement, invalidModalElement);
app.start();
