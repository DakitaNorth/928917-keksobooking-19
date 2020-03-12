'use strict';
var PIN_NUMBER = 8;
var ENTER_BUTTON = 'Enter';

var priceMin = 0;
var priceMax = 10000;
var roomsMin = 1;
var roomsMax = 100;
var guestsMin = 1;
var guestsMax = 100;

var form = document.querySelector('.ad-form');
var formFieldsets = form.children;
var formFilters = document.querySelector('.map__filters').children;
var adressField = form.querySelector('#address');

var roomField = form.querySelector('#room_number');
var roomOptions = roomField.children;
var capacityOptions = form.querySelector('#capacity').children;
var placeNotForGuests = capacityOptions[capacityOptions.length - 1];

var map = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');
var mapPinsTemplate = document.querySelector('#pin').content;
/* var mapFilter = document.querySelector('.map__filters-container');*/
var mainPin = document.querySelector('.map__pin--main');

/* var cardTemplate = document.querySelector('#card').content;
var newCardTemplate = cardTemplate.querySelector('.map__card');*/

for (var w = 0; w < formFieldsets.length; w++) {
  formFieldsets[w].setAttribute('disabled', 'disabled');
}

for (var b = 0; b < formFilters.length; b++) {
  formFilters[b].setAttribute('disabled', 'disabled');
}

var unlockInterface = function () {
  for (var z = 0; z < formFieldsets.length; z++) {
    formFieldsets[z].removeAttribute('disabled');
  }
  for (var g = 0; g < formFilters.length; g++) {
    formFilters[g].removeAttribute('disabled', 'disabled');
  }
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
};

function onPinMainClick(e) {
  if (typeof e === 'object') {
    switch (e.button) {
      case 0:
        unlockInterface();
        mainPinСoordinates();
    }
  }
}

function onPinMainKeydown(q) {
  if (q.key === ENTER_BUTTON) {
    unlockInterface();
    mainPinСoordinates();
  }
}

mainPin.addEventListener('mousedown', onPinMainClick);
mainPin.addEventListener('keydown', onPinMainKeydown);

var mainPinСoordinates = function () {
  var posY = mainPin.offsetTop;
  var posX = mainPin.offsetLeft;

  adressField.value = 'x: ' + posX + ' ' + 'y: ' + posY;
  adressField.setAttribute('readonly', 'readonly');
};

var capacityOptionsDisabled = function () {
  for (var i = 0; i < roomOptions.length; i++) {
    capacityOptions[i].disabled = true;
  }
};

capacityOptionsDisabled();

roomField.addEventListener('change', function () {
  var value = this.value;
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

/* var offerTypeObject = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};*/

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
        offerPhotosArray, randomInteger(40, 1200), randomInteger(130, 630));
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

/*
var cardGeneration = function () {
  var newCard = newCardTemplate.cloneNode(true);
  var newOfferArray = offersArrayGeneration(PIN_NUMBER);
  var newCardFeatures = newCard.querySelector('.popup__features').children;
  var newCardPhotos = newCard.querySelector('.popup__photos');

  var cardPhotoCollection = newCard.querySelector('.popup__photos').children;

  var newCardPhoto = newCard.querySelector('.popup__photo');

  newCard.querySelector('.popup__avatar').src = newOfferArray[0].author.avatar;
  newCard.querySelector('.popup__title').textContent = newOfferArray[0].offer.title;
  newCard.querySelector('.popup__text--address').textContent = newOfferArray[0].offer.address;
  newCard.querySelector('.popup__text--price').textContent = newOfferArray[0].offer.price;
  newCard.querySelector('.popup__type').textContent = offerTypeObject[newOfferArray[0].offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = newOfferArray[0].offer.rooms + ' комнаты для ' + newOfferArray[0].offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + newOfferArray[0].offer.checkin + ', выезд до ' + newOfferArray[0].offer.checkout;
  newCard.querySelector('.popup__description').textContent = newOfferArray[0].offer.description;

  for (var u = 0; u < newCardFeatures.length; u++) {
    newCardFeatures[u].textContent = newOfferArray[0].offer.features[u];
  }

  for (var y = 0; y < offerPhotosArray.length - 1; y++) {
    newCardPhotos.appendChild(newCardPhoto.cloneNode(true));
  }

  for (var j = 0; j < cardPhotoCollection.length; j++) {
    cardPhotoCollection[j].src = newOfferArray[0].offer.photos[j];
  }

  return newCard;
};

var fragmentCards = document.createDocumentFragment();

for (var z = 0; z < 1; z++) {
  fragmentCards.appendChild(cardGeneration());
}
map.insertBefore(fragmentCards, mapFilter);

*/
