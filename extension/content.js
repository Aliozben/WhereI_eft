var url = document.URL;
alert(url);

console.log("asdasd");
var websiteNames = {
  swatchseries: "swatchseries",
};

if (document.URL.includes(websiteNames.swatchseries)) {
  var names = url.split("/")[4].split("-");
  names = names.slice(0, -1);
  var name = "";
  names.forEach(value => {
    value = value.charAt(0).toUpperCase() + value.slice(1);
    name += value + " ";
  });
  setTimeout(() => {
    var episode = document.querySelectorAll("a.active")[0].dataset["kname"];
    request(episode, name, websiteNames.swatchseries);
  }, 5000);
}
setTimeout(() => {
  var episodeButtons = document.getElementsByClassName("bl-servers");
  Object.values(episodeButtons).forEach(element =>
    element.addEventListener("click", didPageChange)
  );
}, 5000);

var didPageChange = function () {
  document.URL == url ? alert("true") : alert("false");
};
var request = function (episode, show, website) {
  fetch("http://localhost:5000/episode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({episode, show, website}),
  });
};
