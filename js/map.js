'use strict';
(function () {
  window.PIN_NUMBER = 8;

  var map = document.querySelector('.map');
  var fragmentPins = document.createDocumentFragment();

  var fragmentCards = document.createDocumentFragment();

  window.map = {
    map: document.querySelector('.map'),
    addingPins: function () {
      for (var i = 0; i < window.PIN_NUMBER; i++) {
        fragmentPins.appendChild(window.pin.pinGeneration(window.data.offersArrayGeneration(window.PIN_NUMBER))[i]);
      }
      window.pin.mapPinsList.appendChild(fragmentPins);
    },
    addingCards: function () {
      for (var z = 0; z < window.PIN_NUMBER; z++) {
        fragmentCards.appendChild(window.cardGeneration(window.data.offersArrayGeneration(window.PIN_NUMBER))[z]);
      }
      map.insertBefore(fragmentCards, window.form.mapFilter);
    }
  };
})();
