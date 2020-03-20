'use strict';
(function () {
  var offerGeneration = function (avatarNumber, offerTitle, offerPrice, offerType,
      offerRooms, offerGuests, offerCheckin, offerCheckout, offerFeaturesArray, offerDescription,
      offerPhotos, locationX, locationY) {

    var offerObject = {
      author: {},
      offer: {},
      location: {}
    };

    offerObject.author.avatar = avatarNumber;
    offerObject.offer.title = offerTitle;
    offerObject.offer.address = locationX + ',' + locationY;
    offerObject.offer.price = offerPrice + '/Руб';
    offerObject.offer.type = offerType;
    offerObject.offer.rooms = offerRooms;
    offerObject.offer.guests = offerGuests;
    offerObject.offer.checkin = offerCheckin;
    offerObject.offer.checkout = offerCheckout;
    offerObject.offer.features = offerFeaturesArray;
    offerObject.offer.description = offerDescription;
    offerObject.offer.photos = offerPhotos;
    offerObject.location.x = locationX;
    offerObject.location.y = locationY;

    return offerObject;
  };

  window.data = {
    offersArrayGeneration: function (offerNumber) {
      var offersArray = [];
      for (var i = 0; i < offerNumber; i++) {
        offersArray[i] = offerGeneration(window.findings[i].author.avatar, window.findings[i].offer.title, window.findings[i].offer.price,
            window.findings[i].offer.type, window.findings[i].offer.rooms, window.findings[i].offer.guests, window.findings[i].offer.checkin, window.findings[i].offer.checkout,
            window.findings[i].offer.features, window.findings[i].offer.description, window.findings[i].offer.photos, window.findings[i].location.x, window.findings[i].location.y);
      }
      return offersArray;
    }
  };
})();
