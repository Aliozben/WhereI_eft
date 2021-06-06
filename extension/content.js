var url = document.URL;
var websiteNames = {
  swatchseries: "swatchseries",
};
if (document.URL.includes(websiteNames.swatchseries)) {
  var names = url.split("/")[4].split("-");
  names = names.slice(0, -1);
  var name = "";
  names.forEach(value => {
    name += value + " ";
  });
  setTimeout(() => {
    document.querySelectorAll("a.active")[0].dataset["kname"];
    request(episode, name, websiteNames.swatchseries);
  }, 5000);
}

var request = function (episode, show, website) {
  fetch("http://localhost:5000/episode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({episode, show, website}),
  });
};
