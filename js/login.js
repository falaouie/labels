const { isInternetOnline } = require('../js/online_status');
const { db } = require('../db/dbConnection');
let sql;

document.addEventListener('DOMContentLoaded', () => {
  const loaderContainer = document.querySelector('#loader-container');
  const loginContainer = document.querySelector('#login-container');
  const loginForm = document.querySelector('#login');
  let redirectUrl;

  isInternetOnline(function (isOnline) {
    if (isOnline) {
      console.log('sync online with offline');
      // Electron `app` is ready ONLINE
    } else {
      console.log('use offline version');

      if (db.open) {
        sql = `SELECT * FROM users`;
        db.all(sql, [], (err, rows) => {
          if (err) {
            return console.error(err.message);
          } else {
            let users = [];
            rows.forEach((row) => {
              users.push(row);
            });
            loginForm.addEventListener('submit', (e) => {
              // to fetch or ajax
              e.preventDefault();
              const userName = document.getElementById('username').value;
              const password = document.getElementById('password').value;
              // perform fetch login
              const usersCnt = users.length;

              for (let i = 0; i < usersCnt; i++) {
                if (
                  userName === users[i].username &&
                  password === users[i].password
                ) {
                  redirectUrl = './dashboard.html';

                  welcomeAlert(redirect, './dashboard.html');
                  // redirect(redirectUrl);
                  return;
                }
              }

              setFormMessage(
                loginForm,
                'error',
                'Invalid username or password'
              );
            });
          }
        });
      } else {
        console.log('could not connect to db');
      }
    }
  });

  // function async await to get users table then remove loader and show login form
  setTimeout(() => {
    loaderContainer.classList.add('container-hidden');
    loginContainer.classList.remove('container-hidden');
  }, 1000);

  // let objPeople = [
  //   {
  //     username: 'sam',
  //     password: 'codify',
  //   },
  //   {
  //     username: 'matt',
  //     password: 'academy',
  //   },
  //   {
  //     username: 'chris',
  //     password: 'forever',
  //   },
  //   {
  //     username: 'fadi',
  //     password: 'pass',
  //   },
  // ];
  // above needs attention
  // app.on('before-quit', async (e) => {
  //   console.log('[app] will-quit');
  //   if (!canQuitNow) {
  //     e.preventDefault();
  //     await doClean();
  //     canQuitNow = true;
  //     app.quit();
  //   }
  // });

  // loginForm.addEventListener('submit', (e) => {
  //   // to fetch or ajax
  //   e.preventDefault();
  //   const userName = document.getElementById('username').value;
  //   const password = document.getElementById('password').value;
  //   // perform fetch login
  //   const usersCnt = objPeople.length;
  //   for (let i = 0; i < usersCnt; i++) {
  //     if (
  //       userName === objPeople[i].username &&
  //       password === objPeople[i].password
  //     ) {
  //       redirectUrl = './dashboard.html';

  //       welcomeAlert(redirect, './dashboard.html');
  //       // redirect(redirectUrl);
  //       return;
  //     }
  //   }

  //   setFormMessage(loginForm, 'error', 'Invalid username or password');
  // });

  document.querySelectorAll('.form__input').forEach((inputElement) => {
    inputElement.addEventListener('blur', (e) => {
      if (
        e.target.id === 'username' &&
        e.target.value.length > 0 &&
        e.target.value.length < 4
      ) {
        setInpuntError(inputElement, 'Username must be at least 4 characters');
      }
    });

    inputElement.addEventListener('input', (e) => {
      clearInputError(inputElement);
    });
  });
});

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector('.form__message');

  messageElement.textContent = message;
  messageElement.classList.remove(
    'form__message--success',
    'form__message--error'
  );
  messageElement.classList.add(`form__message--${type}`);
  errorAlert();
}

function setInpuntError(inputElement, message) {
  inputElement.classList.add('form__input--error');
  inputElement.parentElement.querySelector(
    '.form__input-error-message'
  ).textContent = message;
  errorAlert();
}

function clearInputError(inputElement) {
  inputElement.classList.remove('form__input--error');
  inputElement.parentElement.querySelector(
    '.form__input-error-message'
  ).textContent = '';
}

function redirect(redirectUrl) {
  location.href = `${redirectUrl}`;
}
