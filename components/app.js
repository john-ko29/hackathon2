class App {
  constructor(mainElement, forecast, invalidOkay, invalidModal, helpConfirm, helpModal) {
    this.mainElement = mainElement;
    this.forecast = forecast;
    this.invalidOkay = invalidOkay;
    this.invalidModal = invalidModal;
    this.helpConfirm = helpConfirm;
    this.helpModal = helpModal;
    this.getMemes = this.getMemes.bind(this);
    this.handleGetMemesSuccess = this.handleGetMemesSuccess.bind(this);
    this.handleGetMemesError = this.handleGetMemesError.bind(this);
    this.updateMemes = this.updateMemes.bind(this);
    this.weatherAPI = "2bfe50c866295a179e87fa1e712f39bc";
    this.getWeather = this.getWeather.bind(this);
    this.getCityWeather = this.getCityWeather.bind(this);
    this.handleGetWeatherSuccess = this.handleGetWeatherSuccess.bind(this);
    this.handleGetWeatherError = this.handleGetWeatherError.bind(this);
    this.createForecast = this.createForecast.bind(this);
    this.handleGetCityWeatherSuccess = this.handleGetCityWeatherSuccess.bind(this);
    this.handleGetCityWeatherError = this.handleGetCityWeatherError.bind(this);
    this.addHidden  = this.addHidden.bind(this);
    this.weather = null;
    this.memes = null;
  }

  getMemes() {
    $.ajax({
      method: "GET",
      url: "https://api.imgflip.com/get_memes",
      success: this.handleGetMemesSuccess,
      error: this.handleGetMemesError
    });
  }

  handleGetMemesSuccess(memes) {
    this.getWeather();
    // this.updateMemes(memes);
    this.memes = memes.data.memes;
  }

  handleGetMemesError(error) {
    console.error(error);
  }

  updateMemes(memes) {
    this.mainElement.innerHTML = "";
    this.memesData = memes.data.memes;
    for (var i = 0; i < this.memesData.length; i++) {
      var imgElement = document.createElement("img")
      imgElement.setAttribute("src", this.memesData[i].url);
      imgElement.classList.add("col-4");
      imgElement.setAttribute("id", this.memesData[i].id);
      imgElement.setAttribute("name", this.memesData[i].name);
      imgElement.setAttribute("arrayIndex", i);

      this.mainElement.appendChild(imgElement);
    }
  }

  addHidden() {
    this.invalidModal.classList.add("hidden");
    this.helpModal.classList.add("hidden");
  }

  start() {
      this.getMemes();
      this.forecast.onSubmit(this.getCityWeather);
      this.invalidOkay.addEventListener("click", this.addHidden);
      this.helpConfirm.addEventListener("click", this.addHidden);
  }

  getWeather() {
    var url = "https://api.openweathermap.org/data/2.5/group?id=5359777,1835847,2643741,3582383&units=metric&appid=" + this.weatherAPI;
    $.ajax({
      method: "GET",
      url: url,
      success: this.handleGetWeatherSuccess,
      error: this.handleGetWeatherError
    })
  }

  getCityWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.weatherAPI;
    $.ajax({
      method: "GET",
      dataType: "json",
      url: url,
      success: this.handleGetCityWeatherSuccess,
      error: this.handleGetWeatherError
    })
  }

  handleGetCityWeatherSuccess(weather) {
    this.forecast.createCityForecast(weather);
    return weather;
  }

  handleGetWeatherSuccess(weather) {
    this.weather = weather.list;
    this.createForecast(this.weather, this.memes);
  }

  handleGetWeatherError(error) {
    this.forecast.createCityForecast(undefined);
    console.error(error);
  }

  handleGetCityWeatherError(error) {
    console.error(error);
  }

  createForecast(weather, memes) {
    this.forecast.renderForecast(weather, memes);
  }
}
