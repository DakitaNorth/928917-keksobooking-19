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
        if (window.pin.mapPinsList.children.length === 2) {
          window.map.addingPins();
        }
        window.form.mainPinСoordinates();
    }
  }

  function onPinMainKeydown(q) {
    if (q.key === ENTER_BUTTON) {
      unlockInterface();
      if (window.pin.mapPinsList.children.length === 2) {
        window.map.addingPins();
      }
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

      var newX = window.mainPin.offsetLeft - shift.x;
      var newY = window.mainPin.offsetTop - shift.y;

      if (startCoords.x < limits.left) {
        newX = 0;
      }
      if (startCoords.x > limits.right) {
        newX = 1135;
      }
      if (startCoords.y < limits.top) {
        newY = 130;
      }
      if (startCoords.y > limits.bottom) {
        newY = 630;
      }

      window.mainPin.style.top = newY + 'px';
      window.mainPin.style.left = newX + 'px';
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
