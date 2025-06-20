
function loadCountryCodes() {
  fetch("codes.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("code").insertAdjacentHTML("beforeend", data);
    })
    .catch(error => {
      console.error("Failed to load country codes:", error);
    });
}

window.onload = function () {
  document.getElementById("message").value = "";
  document.getElementById("number").value = "";
  document.getElementById("form").style.display = "none";
  loadCountryCodes();
};

function getStarted() {
  document.getElementById("form").style.display = "block";
  document.getElementById("start").style.display = "none";
}

function generateLink() {
  var code = document.getElementById("code").value.trim();
  var number = document.getElementById("number").value.trim();
  var message = document.getElementById("message").value.trim();
  if (number === "" || message === "") {
    alert("Please fill in both message and phone number in the correct format.");
    return;
  }
  if (!/^\d{9,15}$/.test(number)) {
    alert("Please enter a valid phone number with 9 to 15 digits only.");
    return;
  }
  if (code === "0") {
    alert("Please choose country code.");
    return;
  }
  var encodedMessage = encodeURIComponent(message);
  var fullLink = "https://wa.me/" + code + number + "?text=" + encodedMessage;
  var output = document.getElementById("output");
  output.innerHTML = '<a href="' + fullLink + '" target="_blank" style="color: white;">Click Here To Open WhatsApp chat</a>';
  document.getElementById("message").value = "";
  document.getElementById("number").value = "";
  document.getElementById("copy-btn").style.display = "inline-block";
  document.getElementById("output").style.display = "inline-block";
}

function copyLink() {
  const link = document.querySelector("#output a").href;
  navigator.clipboard.writeText(link)
    .then(() => alert("Link copied to clipboard!"))
    .catch(err => {
      alert("Failed to copy link.");
      console.error(err);
    });
}

function openFacebook() {
  window.open("href=facebook.com/gbtech101", "_blank");
}
function openWhatsapp() {
  window.open('https://wa.me/237654841420', '_blank');
}