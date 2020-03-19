'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var StatusCode = {
      OK: 200
    };
    var TIMEOUT_IN_MS = 10000;

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);

        window.findings = xhr.response;
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Встречена ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
