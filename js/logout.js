const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
  goodbyeAlert(redirect, './index.html');
});

function redirect(redirectUrl) {
  location.href = `${redirectUrl}`;
}
