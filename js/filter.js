'use strict';
(function () {
  window.mapFilter = document.querySelector('.map__filters');
  var filterHousingType = window.mapFilter.querySelector('#housing-type');
  var filterHousingPrice = window.mapFilter.querySelector('#housing-price');
  var filterHousingRooms = window.mapFilter.querySelector('#housing-rooms');
  var filterHousingGuests = window.mapFilter.querySelector('#housing-guests');
  var filterWifi = window.mapFilter.querySelector('#filter-wifi');
  var filterDishwasher = window.mapFilter.querySelector('#filter-dishwasher');
  var filterParking = window.mapFilter.querySelector('#filter-parking');
  var filterWasher = window.mapFilter.querySelector('#filter-washer');
  var filterElevator = window.mapFilter.querySelector('#filter-elevator');
  var filterConditioner = window.mapFilter.querySelector('#filter-conditioner');

  var filterFragmentPins = document.createDocumentFragment();
  var filterFragmentCards = document.createDocumentFragment();

  window.filterPins = function () {
    window.mapFilter.addEventListener('change', function () {
      var typeValue = filterHousingType.value;
      var priceValue = filterHousingPrice.value;
      var roomsValue = filterHousingRooms.value;
      var guestsValue = filterHousingGuests.value;

      var newArray = [];

      switch (typeValue) {
        case 'any':
          for (var i = 0; i < 5; i++) {
            newArray[i] = window.findings[i];
          }
          break;
        case 'flat':
          newArray = window.findings.filter(function (it) {
            return it.offer.type === 'flat';
          });
          break;
        case 'palace':
          newArray = window.findings.filter(function (it) {
            return it.offer.type === 'palace';
          });
          break;
        case 'house':
          newArray = window.findings.filter(function (it) {
            return it.offer.type === 'house';
          });
          break;
        case 'bungalo':
          newArray = window.findings.filter(function (it) {
            return it.offer.type === 'bungalo';
          });
          break;
      }
      switch (priceValue) {
        case 'any':
          newArray = newArray;
          break;
        case 'middle':
          newArray = newArray.filter(function (it) {
            return it.offer.price > 10000;
          });
          newArray = newArray.filter(function (it) {
            return it.offer.price < 50000;
          });
          break;
        case 'low':
          newArray = newArray.filter(function (it) {
            return it.offer.price < 10000;
          });
          break;
        case 'high':
          newArray = newArray.filter(function (it) {
            return it.offer.price > 50000;
          });
          break;
      }
      switch (roomsValue) {
        case 'any':
          newArray = newArray;
          break;
        case '1':
          newArray = newArray.filter(function (it) {
            return it.offer.rooms === 1;
          });
          break;
        case '2':
          newArray = newArray.filter(function (it) {
            return it.offer.rooms === 2;
          });
          break;
        case '3':
          newArray = newArray.filter(function (it) {
            return it.offer.rooms === 3;
          });
          break;
      }
      switch (guestsValue) {
        case 'any':
          newArray = newArray;
          break;
        case '2':
          newArray = newArray.filter(function (it) {
            return it.offer.guests === 2;
          });
          break;
        case '1':
          newArray = newArray.filter(function (it) {
            return it.offer.guests === 1;
          });
          break;
        case '0':
          newArray = newArray.filter(function (it) {
            return it.offer.guests === 0;
          });
          break;
      }
      if (filterWifi.checked) {
        newArray = newArray.filter(function (it) {
          return it.offer.features.includes('wifi');
        });
      }
      if (filterDishwasher.checked) {
        newArray = newArray.filter(function (it) {
          return it.offer.features.includes('dishwasher');
        });
      }
      if (filterParking.checked) {
        newArray = newArray.filter(function (it) {
          return it.offer.features.includes('parking');
        });
      }
      if (filterWasher.checked) {
        newArray = newArray.filter(function (it) {
          return it.offer.features.includes('washer');
        });
      }
      if (filterElevator.checked) {
        newArray = newArray.filter(function (it) {
          return it.offer.features.includes('elevator');
        });
      }
      if (filterConditioner.checked) {
        newArray = newArray.filter(function (it) {
          return it.offer.features.includes('conditioner');
        });
      }

      var customAdding = function () {
        window.map.removalPins();
        window.map.removalCards();
        for (var h = 0; h < newArray.length; h++) {
          filterFragmentPins.appendChild(window.pin.pinGeneration(window.data.offersArrayGeneration(newArray.length, newArray), newArray.length)[h]);
        }
        window.pin.mapPinsList.appendChild(filterFragmentPins);
        for (var j = 0; j < newArray.length; j++) {
          filterFragmentCards.appendChild(window.cardGeneration(window.data.offersArrayGeneration(newArray.length, newArray))[j]);
        }
        window.map.map.insertBefore(filterFragmentCards, window.form.mapFilter);
        window.showCard.cardOpen();
      };

      window.debounce(customAdding);
    });
  };
})();
