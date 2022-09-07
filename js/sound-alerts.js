function errorAlert() {
  var audio = new Audio('./sounds/icq-message.wav');
  audio.play();
}

function successAlert() {
  var audio = new Audio('./sounds/success.mp3');
  audio.play();
}

function welcomeAlert(redirect, redirectUrl) {
  var audio = new Audio('./sounds/welcome.mp3');
  audio.play();
  setTimeout(() => {
    redirect(redirectUrl);
  }, 550);
}

function goodbyeAlert(redirect, redirectUrl) {
  var audio = new Audio('./sounds/goodbye.mp3');
  audio.play();
  setTimeout(() => {
    redirect(redirectUrl);
  }, 550);
}
