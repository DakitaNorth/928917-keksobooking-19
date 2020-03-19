'use strict';
(function () {
  var mapPinsTemplate = document.querySelector('#pin').content;

  window.pin = {
    pinGeneration: function (oneOffer) {
      var pinArray = [];
      for (var i = 0; i < window.PIN_NUMBER; i++) {
        var pinElement = mapPinsTemplate.cloneNode(true);
        pinElement.querySelector('.map__pin').style = 'left: ' + oneOffer[i].location.x + 'px; top:' + oneOffer[i].location.y + 'px;';
        pinElement.querySelector('img').src = oneOffer[i].author.avatar;
        pinElement.querySelector('img').alt = oneOffer[i].offer.title;

        pinArray[i] = pinElement;
      }
      return pinArray;
    },
    mapPinsList: document.querySelector('.map__pins')
  };
})();
