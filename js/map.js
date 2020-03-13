'use strict';
(function () {
  window.PIN_NUMBER = 8;

  var map = document.querySelector('.map');
  var fragmentPins = document.createDocumentFragment();

  for (var i = 0; i < window.PIN_NUMBER; i++) {
    fragmentPins.appendChild(window.pin.pinGeneration(window.data.offersArrayGeneration(window.PIN_NUMBER)));
  }
  window.pin.mapPinsList.appendChild(fragmentPins);

  var fragmentCards = document.createDocumentFragment();

  for (var z = 0; z < 1; z++) {
    fragmentCards.appendChild(window.cardGeneration());
  }
  map.insertBefore(fragmentCards, window.form.mapFilter);

  window.map = {
    map: document.querySelector('.map')
  };
})();
