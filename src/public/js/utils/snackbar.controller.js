const html = document.getElementsByTagName("html")[0];
const snackbar = document.getElementById("snackbar");
const snackbarText = document.getElementById("snackbar-text");

const snackbarController = {
  init: function (message) {
    snackbarText.innerHTML = `${message}`;
    this.snackbarVisible();
  },
  snackbarVisible: function () {
    snackbar.classList.add("snackbar-visible");
  },
};

export default snackbarController;
