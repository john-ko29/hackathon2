var mainElement = document.getElementById("main");
var formElement = document.getElementById("formOptional");

var forecast = new Forecast(mainElement, formElement);
var app = new App(mainElement, forecast);
app.start();
