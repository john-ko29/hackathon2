var mainElement = document.getElementById("main");
var formElement = document.getElementById("forecast-form");
var optionalElement = document.getElementById("formOptional");

var forecast = new Forecast(mainElement, formElement, optionalElement);
var app = new App(mainElement, forecast);
app.start();
