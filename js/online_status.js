let dns = require('dns');

function isInternetOnline(callback) {
  dns.lookup('alawiyeh.com', function (error) {
    if (error && error.code == 'ENOTFOUND') {
      callback(false);
    } else {
      callback(true);
    }
  });
}

module.exports = { isInternetOnline };
