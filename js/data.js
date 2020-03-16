'use strict';
(function () {
  var PRICE_MIN = 0;
  var PRICE_MAX = 10000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 100;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 100;

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  var offerPhotosArray = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var offerFeaturesArray = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var offerCheckArray = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var offerTypeArray = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var offerTitleArray = [];
  var offerDescriptionArray = [];

  var offerGeneration = function (offersNumber, avatarNumber, offerPrice,
      offerType, offerRooms, offerGuests, offerCheckin, offerCheckout,
      offerDescription, offerPhotos, locationX, locationY) {

    var offerObject = {
      author: {},
      offer: {},
      location: {}
    };

    offerObject.author.avatar = 'img/avatars/user0' + avatarNumber + '.png';
    offerObject.offer.title = offerTitleArray;
    offerObject.offer.address = locationX + ',' + locationY;
    offerObject.offer.price = offerPrice + '/Руб';
    offerObject.offer.type = offerTypeArray[offerType];
    offerObject.offer.rooms = offerRooms;
    offerObject.offer.guests = offerGuests;
    offerObject.offer.checkin = offerCheckArray[offerCheckin];
    offerObject.offer.checkout = offerCheckArray[offerCheckout];
    offerObject.offer.features = offerFeaturesArray;
    offerObject.offer.description = offerDescription;
    offerObject.offer.photos = offerPhotos;
    offerObject.location.x = locationX;
    offerObject.location.y = locationY;

    return offerObject;
  };

  window.data = {
    offersArrayGeneration: function (offersNumber) {
      var offersArray = [];
      for (var i = 0; i < offersNumber; i++) {
        offersArray[i] = offerGeneration(offersNumber, i + 1, randomInteger(PRICE_MIN, PRICE_MAX),
            randomInteger(0, offerTypeArray.length - 1), randomInteger(ROOMS_MIN, ROOMS_MAX),
            randomInteger(GUESTS_MIN, GUESTS_MAX), randomInteger(0, offerCheckArray.length - 1), randomInteger(0, offerCheckArray.length - 1),
            offerDescriptionArray[randomInteger(0, offersNumber - 1)],
            offerPhotosArray, randomInteger(40, 1160), randomInteger(130, 630));
      }
      return offersArray;
    },
    offerPhotosArray: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  };
})();
