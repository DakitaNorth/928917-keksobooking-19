'use strict';
(function () {
  window.mapFilter = document.querySelector('.map__filters');
  var filterHousingType = window.mapFilter.querySelector('#housing-type');

  var filterFragmentPins = document.createDocumentFragment();
  var filterFragmentCards = document.createDocumentFragment();

  var customPinsAdding = function (array) {
    window.map.removalPins();
    window.map.removalCards();
    for (var i = 0; i < array.length; i++) {
      filterFragmentPins.appendChild(window.pin.pinGeneration(window.data.offersArrayGeneration(array.length, array), array.length)[i]);
    }
    window.pin.mapPinsList.appendChild(filterFragmentPins);
    for (var j = 0; j < array.length; j++) {
      filterFragmentCards.appendChild(window.cardGeneration(window.data.offersArrayGeneration(array.length, array))[j]);
    }
    window.map.map.insertBefore(filterFragmentCards, window.form.mapFilter);
    window.showCard.cardOpen();
  };

  window.filterPins = function () {
    filterHousingType.addEventListener('change', function () {
      switch (filterHousingType.value) {
        case 'any':
          window.map.removalPins();
          window.map.removalCards();
          window.map.addingPins();
          window.map.addingCards();
          window.showCard.cardOpen();
          break;
        case 'flat':
          customPinsAdding(flats);
          break;
        case 'palace':
          customPinsAdding(palaces);
          break;
        case 'house':
          customPinsAdding(houses);
          break;
        case 'bungalo':
          customPinsAdding(bungalos);
          break;
      }
    });

    var flats = window.findings.filter(function (type) {
      return type.offer.type === 'flat';
    });

    var palaces = window.findings.filter(function (type) {
      return type.offer.type === 'palace';
    });

    var houses = window.findings.filter(function (type) {
      return type.offer.type === 'house';
    });

    var bungalos = window.findings.filter(function (type) {
      return type.offer.type === 'bungalo';
    });
  };
})();
