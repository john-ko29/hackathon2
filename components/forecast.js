class Forecast {
  constructor(mainElement, formElement) {
    this.mainElement = mainElement;
    this.formElement = formElement;
    this.renderForecast = this.renderForecast.bind(this);
    this.matchWeather = this.matchWeather.bind(this);
    this.memesWeather = [];
    this.selectMemes = this.selectMemes.bind(this);
  }

  handleSubmit() {

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
        case 57:
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
