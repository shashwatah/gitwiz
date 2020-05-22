const html = document.getElementsByTagName("html")[0];
const snackbar = document.getElementById("snackbar");
const snackbarText = document.getElementById("snackbar-text");

function snackbarController(message) {
  snackbarText.innerHTML = `${message}`;
  snackbarVisible();
}

function snackbarVisible() {
  snackbar.classList.add("snackbar-visible");
  //This will hide the snackbar right after the fadeOut animation ends
  setTimeout(function() {
    snackbar.classList.remove("snackbar-visible");
  }, 2500);
}
