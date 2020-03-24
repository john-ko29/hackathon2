class App {
  constructor(mainElement) {
    this.mainElement = mainElement;
    this.getMemes = this.getMemes.bind(this);
    this.handleGetMemesSuccess = this.handleGetMemesSuccess.bind(this);
    this.handleGetMemesError = this.handleGetMemesError.bind(this);
    this.updateMemes = this.updateMemes.bind(this);
    this.weatherAPI = "2bfe50c866295a179e87fa1e712f39bc";
    this.gifAPI = "MhQsunQ2WuoHo7CFjWWy0YrOR5aVrP0u"
    this.getWeather = this.getWeather.bind(this);
    this.handleGetWeatherSuccess = this.handleGetWeatherSuccess.bind(this);
    this.handleGetWeatherError = this.handleGetWeatherError.bind(this);
    this.memesData = null;
    this.weatherData = null;
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
    this.updateMemes(memes);
  }

  handleGetMemesError(error) {
    console.log(error);
  }

  updateMemes(memes) {
    this.mainElement.innerHTML = "";
    this.memesData = memes.data.memes;
    console.log(this.memesData);
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

  start() {
      this.getMemes()
  }

  getWeather() {
    var url = "http://api.openweathermap.org/data/2.5/group?id=5359777,5368361,5128581,3582383,5475433&units=metric&appid=" + this.weatherAPI;
    $.ajax({
      method: "GET",
      url: url,
      success: this.handleGetWeatherSuccess,
      error: this.handleGetWeatherError
    })
  }

  handleGetWeatherSuccess(weather) {
    console.log(weather);
    for(var i = 0; i < weather.length; i++) {
      console.log(weather[i].weather.main)
    }
  }

  handleGetWeatherError(error) {
    console.error(error);
  }
}
