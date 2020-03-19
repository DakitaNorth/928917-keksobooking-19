'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.children;
  var formFilters = document.querySelector('.map__filters').children;
  var adressField = form.querySelector('#address');

  var titleField = form.querySelector('#title');
  var typeHousingField = form.querySelector('#type');
  var housingPrice = form.querySelector('#price');
  var timeinField = form.querySelector('#timein');
  var timeoutField = form.querySelector('#timeout');

  var roomField = form.querySelector('#room_number');
  var capacityOptions = form.querySelector('#capacity').children;
  var placeNotForGuests = capacityOptions[capacityOptions.length - 1];

  titleField.addEventListener('invalid', function () {
    if (titleField.validity.tooShort) {
      titleField.setCustomValidity('Минимальное значение - 30 символов');
    } else if (titleField.validity.tooLong) {
      titleField.setCustomValidity('Максимальное значение - 100 символов');
    } else if (titleField.validity.valueMissing) {
      titleField.setCustomValidity('Обязательное поле');
    } else {
      titleField.setCustomValidity('');
    }
  });

  housingPrice.addEventListener('invalid', function () {
    if (housingPrice.validity.valueMissing) {
      housingPrice.setCustomValidity('Обязательное поле');
    } else {
      housingPrice.setCustomValidity('');
    }
  });

  timeinField.addEventListener('change', function () {
    var value = timeinField.value;
    if (timeinField.value === value) {
      timeoutField.value = value;
    }
  });

  timeoutField.addEventListener('change', function () {
    var value = timeoutField.value;
    if (timeoutField.value === value) {
      timeinField.value = value;
    }
  });

  typeHousingField.addEventListener('change', function () {
    var value = typeHousingField.value;
    if (value === 'bungalo') {
      housingPrice.setAttribute('min', 0);
      housingPrice.placeholder = 0;
    }
    if (value === 'flat') {
      housingPrice.setAttribute('min', 1000);
      housingPrice.placeholder = 1000;
    }
    if (value === 'house') {
      housingPrice.setAttribute('min', 5000);
      housingPrice.placeholder = 5000;
    }
    if (value === 'palace') {
      housingPrice.setAttribute('min', 10000);
      housingPrice.placeholder = 10000;
    }
  });

  for (var w = 0; w < formFieldsets.length; w++) {
    formFieldsets[w].setAttribute('disabled', 'disabled');
  }

  for (var b = 0; b < formFilters.length; b++) {
    formFilters[b].setAttribute('disabled', 'disabled');
  }

  var optionsDisabled = function (firstOptions, secondOptions) {
    for (var i = 0; i < firstOptions.length; i++) {
      secondOptions[i].disabled = true;
    }
  };

  roomField.addEventListener('change', function () {
    var value = roomField.value;
    optionsDisabled(roomField, capacityOptions);
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
