class App {
  constructor(mainElement) {
    this.mainElement = mainElement;
    this.getMemes = this.getMemes.bind(this);
    this.handleGetMemesSuccess = this.handleGetMemesSuccess.bind(this);
    this.handleGetMemesError = this.handleGetMemesError.bind(this);
    this.updateMemes = this.updateMemes.bind(this);
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
    var memesData = memes.data.memes;
    console.log(memesData);
    for (var i = 0; i < memesData.length; i++) {
      var imgElement = document.createElement("img")
      imgElement.setAttribute("src", memesData[i].url);
      imgElement.classList.add("col-3");
      imgElement.setAttribute("id", memesData[i].id);
      imgElement.setAttribute("name", memesData[i].name);
      imgElement.setAttribute("arrayIndex", i);

      this.mainElement.appendChild(imgElement);
    }
  }
}
