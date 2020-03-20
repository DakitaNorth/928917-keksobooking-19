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

  window.cardGeneration = function (oneOffer) {
    var cardArray = [];
    for (var i = 0; i < oneOffer.length; i++) {
      var newCard = newCardTemplate.cloneNode(true);
      var newCardFeatures = newCard.querySelector('.popup__features').children;
      var newCardPhotos = newCard.querySelector('.popup__photos');

      var cardPhotoCollection = newCard.querySelector('.popup__photos').children;

      var newCardPhoto = newCard.querySelector('.popup__photo');

      newCard.querySelector('.popup__avatar').src = oneOffer[i].author.avatar;
      newCard.querySelector('.popup__title').textContent = oneOffer[i].offer.title;
      newCard.querySelector('.popup__text--address').textContent = oneOffer[i].offer.address;
      newCard.querySelector('.popup__text--price').textContent = oneOffer[i].offer.price;
      newCard.querySelector('.popup__type').textContent = offerTypeObject[oneOffer[i].offer.type];
      newCard.querySelector('.popup__text--capacity').textContent = oneOffer[i].offer.rooms + ' комнаты для ' + oneOffer[i].offer.guests + ' гостей';
      newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + oneOffer[i].offer.checkin + ', выезд до ' + oneOffer[i].offer.checkout;
      newCard.querySelector('.popup__description').textContent = oneOffer[i].offer.description;

      for (var u = 0; u < newCardFeatures.length; u++) {
        newCardFeatures[u].textContent = oneOffer[i].offer.features[u];
      }

      if (oneOffer[i].offer.photos.length === 0) {
        newCardPhotos.removeChild(newCardPhoto);
      }

      for (var y = 0; y < oneOffer[i].offer.photos.length - 1; y++) {
        newCardPhotos.appendChild(newCardPhoto.cloneNode(true));
      }

      for (var j = 0; j < cardPhotoCollection.length; j++) {
        cardPhotoCollection[j].src = oneOffer[i].offer.photos[j];
      }

      cardArray[i] = newCard;
    }
    return cardArray;
  };
})();
