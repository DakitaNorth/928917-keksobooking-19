'use strict';
(function () {
  var ENTER_BUTTON = 'Enter';

  window.mainPin = document.querySelector('.map__pin--main');

  var unlockInterface = function () {
    for (var z = 0; z < window.form.formFieldsets.length; z++) {
      window.form.formFieldsets[z].removeAttribute('disabled');
    }
    for (var g = 0; g < window.form.formFilters.length; g++) {
      window.form.formFilters[g].removeAttribute('disabled', 'disabled');
    }
    window.map.map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
  };

  function onPinMainClick(e) {
    switch (e.button) {
      case 0:
        unlockInterface();
        window.form.mainPinСoordinates();
    }
  }

  function onPinMainKeydown(q) {
    if (q.key === ENTER_BUTTON) {
      unlockInterface();
      window.form.mainPinСoordinates();
    }
  }

  window.mainPin.addEventListener('mousedown', onPinMainClick);
  window.mainPin.addEventListener('keydown', onPinMainKeydown);
})();
