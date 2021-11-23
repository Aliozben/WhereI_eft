var url = document.URL;
var lastUrl = url;

var websiteNames = {
  swatchseries: "swatchseries",
};

setTimeout(() => {
  var episodeButtons = document.getElementsByClassName("bl-servers");

  Object.values(episodeButtons).forEach(element =>
    element.addEventListener("click", didPageChange)
  );
}, 3000);

var getCurrentEpisode = function () {
  if (document.URL.includes(websiteNames.swatchseries)) {
    var names = url.split("/")[4].split("-");
    names = names.slice(0, -1);
    var name = "";
    names.forEach(value => {
      value = value.charAt(0).toUpperCase() + value.slice(1);
      name += value + " ";
    });
    name = name.trim();
    setTimeout(() => {
      var episode = document.querySelectorAll("a.active")[0].dataset["kname"];
      if (url === lastUrl) request(episode, name, websiteNames.swatchseries);
      else getCurrentEpisode();
      lastUrl = url;
    }, 300000);
  }
};
var didPageChange = function () {
  lastUrl = url;
  setTimeout(() => {
    url = document.URL;
    if (document.URL !== lastUrl) getCurrentEpisode();
  }, 1000);
};
var request = function (episode, show, website) {
  fetch("https://whereileft.herokuapp.com/episode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({episode, show, website}),
  });
};

getCurrentEpisode();
