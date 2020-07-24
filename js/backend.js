'use strict';

(function () {
  var SERVER_TIMEOUT = 10000;
  var Code = {
    SUCCESS: 200
  };

  var load = function (url, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = SERVER_TIMEOUT;
    return xhr;
  };

  window.backend = {
    load: load
  };
})();
