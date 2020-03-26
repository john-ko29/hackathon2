class Forecast {
  constructor(mainElement, formElement, optionalElement) {
    this.mainElement = mainElement;
    this.formElement = formElement;
    this.optionalElement = optionalElement;
    this.isForecast = true;
    this.renderForecast = this.renderForecast.bind(this);
    this.matchWeather = this.matchWeather.bind(this);
    this.memesWeather = [];
    this.selectMemes = this.selectMemes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.formElement.addEventListener("submit", this.handleSubmit);
    this.formElement.addEventListener("reset", this.handleCancel);
  }

  handleCancel(event) {
    event.target.reset();
  }

  handleSubmit() {
    event.preventDefault();

    var optionalElement = document.getElementById("formOptional")
    var formElement = document.getElementById("forecast-form");

    var formData = new FormData(event.target);
    var weather = formData.get("weather");
    weather.toLowerCase();
    weather.charAt(0).toUpperCase();

    this.formElement.classList.add("hidden");

    var weatherElement = document.createElement("h3");
    weatherElement.textContent = "Weather: " + weather;

    var customMemeIndex = this.matchWeather(weather);

    var imgElement = document.createElement("img");
    imgElement.setAttribute("src", this.memesWeather[customMemeIndex].url);

    var buttonElement = document.createElement("button");
    buttonElement.classList.add("fc-button");
    buttonElement.setAttribute("type", "reset");
    buttonElement.textContent = "Reset";
    buttonElement.addEventListener("click", function(event) {
      while (optionalElement.childNodes.length > 2) {
        optionalElement.removeChild(optionalElement.lastChild);
      }
      formElement.classList.remove("hidden");
    })

    this.optionalElement.appendChild(weatherElement);
    this.optionalElement.appendChild(imgElement);
    this.optionalElement.appendChild(buttonElement);
  }

  toggleForecast() {
    if (this.isForecast) {
      this.isForecast = false;
    } else {
      this.isForecast = true;
    }
  }

  renderForecast(weather, memes) {
    var memeMatch = [];
    console.log("render weather", weather)
    console.log("render memes", memes);

    this.selectMemes(memes);

    for(var i = 0; i < weather.length; i++) {
      var weatherCondition = weather[i].weather[0].main;
      memeMatch.push(this.matchWeather(weatherCondition))
    }
    console.log(memeMatch);

    for (var k = 0; k < weather.length; k++) {
      var forecast = document.createElement("div");
      forecast.classList.add("forecast");
      forecast.classList.add("col-4");

      var cityLocation = document.createElement("h1");
      cityLocation.textContent = weather[k].name;

      var currentWeather = document.createElement("h3");
      currentWeather.textContent = "Current Weather: " + weather[k].weather[0].main;

      var currentTemperature = document.createElement("h3");
      currentTemperature.textContent = weather[k].main.temp + "C";

      var imgElement = document.createElement("img");
      imgElement.setAttribute("src", this.memesWeather[memeMatch[k]].url)

      forecast.appendChild(cityLocation);
      forecast.appendChild(currentWeather);
      forecast.appendChild(currentTemperature);
      forecast.appendChild(imgElement);

      this.mainElement.appendChild(forecast);
    }
  }

  selectMemes(memes) {
    for(var i = 0; i < memes.length; i++) {
      switch (i) {
        case 15:
        case 18:
        case 31:
        case 48:
        case 56:
        case 59:
        case 64:
        case 78:
        case 97:
          this.memesWeather.push(memes[i]);
          break;
        default:
          break;
      }
    }
    console.log("weather memes", this.memesWeather);
  }

  matchWeather(currentWeather) {
    switch (currentWeather) {
      case "Clear":
        return 7;
      case "Clouds":
        return 1;
      case "Rain":
      case "Drizzle":
        return 6;
      case "Thunderstorm":
        return 0;
      case "Snow":
        return 5;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
      case "Ash":
        return 3;
      case "Tornado":
        return 8;
      default:
        return 4;
    }
  }
}
