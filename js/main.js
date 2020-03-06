'use strict';
var PIN_NUMBER = 8;

var priceMin = 0;
var priceMax = 10000;
var roomsMin = 1;
var roomsMax = 100;
var guestsMin = 1;
var guestsMax = 100;

var map = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');
var mapPinsTemplate = document.querySelector('#pin').content;

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

var offersArrayGeneration = function (offersNumber) {
  var offersArray = [];
  for (var i = 0; i < offersNumber; i++) {
    offersArray[i] = offerGeneration(offersNumber, i + 1, randomInteger(priceMin, priceMax),
        randomInteger(0, offerTypeArray.length - 1), randomInteger(roomsMin, roomsMax),
        randomInteger(guestsMin, guestsMax), randomInteger(0, offerCheckArray.length - 1), randomInteger(0, offerCheckArray.length - 1),
        offerDescriptionArray[randomInteger(0, offersNumber - 1)],
        offerPhotosArray[randomInteger(0, offerPhotosArray.length - 1)], randomInteger(40, 1200), randomInteger(130, 630));
  }
  return offersArray;
};

var pinGeneration = function (oneOffer) {
  for (var i = 0; i < PIN_NUMBER; i++) {
    var pinElement = mapPinsTemplate.cloneNode(true);
    pinElement.querySelector('.map__pin').style = 'left: ' + oneOffer[i].location.x + 'px; top:' + oneOffer[i].location.y + 'px;';
    pinElement.querySelector('img').src = oneOffer[i].author.avatar;
    pinElement.querySelector('img').alt = oneOffer[i].offer.title;
  }
  return pinElement;
};

var fragmentPins = document.createDocumentFragment();

for (var i = 0; i < PIN_NUMBER; i++) {
  fragmentPins.appendChild(pinGeneration(offersArrayGeneration(PIN_NUMBER)));
}
mapPinsList.appendChild(fragmentPins);


map.classList.remove('map--faded');
