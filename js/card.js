'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content;
  var newCardTemplate = cardTemplate.querySelector('.map__card');

  var offerTypeObject = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.cardGeneration = function () {
    var newCard = newCardTemplate.cloneNode(true);
    var newOfferArray = window.data.offersArrayGeneration(window.PIN_NUMBER);
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

    for (var y = 0; y < window.data.offerPhotosArray.length - 1; y++) {
      newCardPhotos.appendChild(newCardPhoto.cloneNode(true));
    }

    for (var j = 0; j < cardPhotoCollection.length; j++) {
      cardPhotoCollection[j].src = newOfferArray[0].offer.photos[j];
    }

    return newCard;
  };
})();
