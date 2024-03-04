var url = new URL(window.location.href);
var idFromURL = url.searchParams.get("id");
var element = document.getElementById("xystv");
if (element) {
  if (idFromURL) {
    element.id = idFromURL;
  }
}