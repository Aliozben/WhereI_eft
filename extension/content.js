if (document.URL.includes("swatchseries")) {
  console.log("hey");
  setTimeout(() => {
    var episode = document.querySelectorAll("a.active")[0].dataset["kname"];
    request(episode, "swatchseries");
  }, 5000);
}

var request = function (episode, website) {
  var params = "episode=" + episode + "&website=" + website;
  var data = new FormData();
  data.append("episode", episode);
  data.append("website", website);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/test", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    // do something to response
    console.log(this.responseText);
  };
  xhr.send(params);
};
