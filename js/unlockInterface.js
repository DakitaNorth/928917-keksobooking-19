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
    window.map.addingPins();
    window.map.addingCards();
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

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var limits = {
      top: 130,
      right: window.map.map.offsetWidth + window.map.map.offsetLeft - window.mainPin.offsetWidth,
      bottom: 630,
      left: window.map.map.offsetLeft
    };

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (startCoords.x < limits.left) {
        window.mainPin.style.left = 0 + 'px';
      }
      if (startCoords.x > limits.right) {
        window.mainPin.style.left = 1135 + 'px';
      }
      if (startCoords.y < limits.top) {
        window.mainPin.style.top = 130 + 'px';
      }
      if (startCoords.y > limits.bottom) {
        window.mainPin.style.top = 630 + 'px';
      }

      window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + 'px';
      window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
