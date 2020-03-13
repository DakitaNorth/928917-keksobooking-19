'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.children;
  var formFilters = document.querySelector('.map__filters').children;
  var adressField = form.querySelector('#address');

  var roomField = form.querySelector('#room_number');
  var roomOptions = roomField.children;
  var capacityOptions = form.querySelector('#capacity').children;
  var placeNotForGuests = capacityOptions[capacityOptions.length - 1];

  for (var w = 0; w < formFieldsets.length; w++) {
    formFieldsets[w].setAttribute('disabled', 'disabled');
  }

  for (var b = 0; b < formFilters.length; b++) {
    formFilters[b].setAttribute('disabled', 'disabled');
  }

  var capacityOptionsDisabled = function () {
    for (var i = 0; i < roomOptions.length; i++) {
      capacityOptions[i].disabled = true;
    }
  };

  roomField.addEventListener('change', function () {
    var value = roomField.value;
    capacityOptionsDisabled();
    for (var i = 0; i <= value - 1; i++) {
      if (value < 100) {
        capacityOptions[i].disabled = false;
        capacityOptions[i].selected = true;
      }
      if (value === 100 || i > 3) {
        placeNotForGuests.disabled = false;
        placeNotForGuests.selected = true;
      }
    }
  });

  window.form = {
    mapFilter: document.querySelector('.map__filters-container'),
    formFieldsets: form.children,
    formFilters: document.querySelector('.map__filters').children,
    form: document.querySelector('.ad-form'),
    mainPinСoordinates: function () {
      var posY = window.mainPin.offsetTop;
      var posX = window.mainPin.offsetLeft;

      adressField.value = 'x: ' + posX + ' ' + 'y: ' + posY;
      adressField.setAttribute('readonly', 'readonly');
    }
  };
})();
