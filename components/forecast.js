class Forecast {
  constructor(mainElement, formElement, optionalElement, cityForm, cityForecast) {
    this.mainElement = mainElement;
    this.formElement = formElement;
    this.optionalElement = optionalElement;
    this.cityForm = cityForm;
    this.cityForecast = cityForecast;
    this.isForecast = true;
    this.renderForecast = this.renderForecast.bind(this);
    this.matchWeather = this.matchWeather.bind(this);
    this.memesWeather = [];
    this.selectMemes = this.selectMemes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmitCity = this.handleSubmitCity.bind(this);
    this.formElement.addEventListener("submit", this.handleSubmit);
    this.formElement.addEventListener("reset", this.handleCancel);
    this.cityForm.addEventListener("submit", this.handleSubmitCity);
    this.cityForm.addEventListener("reset", this.handleCancel);
    this.createCityForecast = this.createCityForecast.bind(this);
  }

  onSubmit(getCityWeather) {
    this.getCityWeather = getCityWeather;
  }

  handleSubmitCity() {
    event.preventDefault();

    var formData = new FormData(event.target);
    var city = formData.get("city");
    city = city.toLowerCase();
    city = city.charAt(0).toUpperCase() + city.slice(1);

    this.cityForm.classList.add("hidden");

    this.getCityWeather(city);
  }

  createCityForecast(weather) {
    console.log("new forecast", weather);

    var buttonElement = document.createElement("button");
    buttonElement.classList.add("fc-button");
    buttonElement.setAttribute("type", "reset");
    buttonElement.textContent = "Reset";
    buttonElement.addEventListener("click", () => {
      while (this.cityForecast.childNodes.length > 2) {
        this.cityForecast.removeChild(this.cityForecast.lastChild);
      }
      this.cityForm.classList.remove("hidden");
    })

    if(weather === undefined) {
      console.log(this.cityForecast.lastChild)

      var noCity = document.createElement("h1");
      noCity.textContent = "No Matching City"
      this.cityForecast.appendChild(noCity);
      this.cityForecast.appendChild(buttonElement)
      return;
    }

    this.cityForm.classList.add("hidden");

    var cityElement = document.createElement("h1");
    cityElement.textContent = weather.name;

    var weatherElement = document.createElement("h3");
    weatherElement.textContent = "Weather: " + weather.weather[0].main;

    var cityMatch = this.matchWeather(weather.weather[0].main)
    var imgElement = document.createElement("img");
    imgElement.classList.add("img-margin")
    imgElement.setAttribute("src", this.memesWeather[cityMatch].url);

    this.cityForecast.appendChild(cityElement);
    this.cityForecast.appendChild(weatherElement);
    this.cityForecast.appendChild(imgElement);
    this.cityForecast.appendChild(buttonElement)
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
    weather = weather.toLowerCase();
    weather = weather.charAt(0).toUpperCase() + weather.slice(1);

    this.formElement.classList.add("hidden");

    var weatherElement = document.createElement("h3");
    weatherElement.textContent = "Weather: " + weather;

    var customMemeIndex = this.matchWeather(weather);

    var imgElement = document.createElement("img");
    imgElement.classList.add("img-margin")
    imgElement.setAttribute("src", this.memesWeather[customMemeIndex].url);
    if (customMemeIndex === 4) {
      var h3noMatchElement = document.createElement("h3");
      h3noMatchElement.textContent = "Mismatched Weather";
    }

    var buttonElement = document.createElement("button");
    buttonElement.classList.add("fc-button");
    buttonElement.setAttribute("type", "reset");
    buttonElement.textContent = "Reset";
    buttonElement.addEventListener("click", function() {
      while (optionalElement.childNodes.length > 2) {
        optionalElement.removeChild(optionalElement.lastChild);
      }
      formElement.classList.remove("hidden");
    })

    this.optionalElement.appendChild(weatherElement);
    if(h3noMatchElement !== undefined) {
      this.optionalElement.appendChild(h3noMatchElement);
    }
    this.optionalElement.appendChild(imgElement);
    this.optionalElement.appendChild(buttonElement);
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

      var card = document.createElement("div");
      card.classList.add("forecast-card");
      var cardFront = document.createElement("div");
      cardFront.classList.add("forecast-card-front");
      var cardBack = document.createElement("div");
      cardBack.classList.add("forecast-card-back");
      card.appendChild(cardFront);
      card.appendChild(cardBack);

      cardFront.appendChild(cityLocation);
      cardFront.appendChild(currentWeather);
      cardFront.appendChild(currentTemperature);
      cardFront.appendChild(imgElement);

      cardBack.appendChild(imgElement)

      forecast.appendChild(card);
      // forecast.appendChild(cityLocation);
      // forecast.appendChild(currentWeather);
      // forecast.appendChild(currentTemperature);
      // forecast.appendChild(imgElement);

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
