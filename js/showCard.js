'use strict';
(function () {
  var ESC_BUTTON = 27;

  window.cardOpen = function () {
    var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var cardsCollecton = document.querySelectorAll('.map__card');
    var closeButton = document.querySelectorAll('.popup__close');


    var utilClose = function (array) {
      for (var i = 0; i < array.length; i++) {
        array[i].classList.add('hidden');
      }
    };

    utilClose(cardsCollecton);

    for (var h = 0; h < pinsCollection.length; h++) {
      pinsCollection[h].addEventListener('click', function (index) {
        utilClose(cardsCollecton);
        cardsCollecton[index].classList.remove('hidden');
      }.bind(null, h)
      );
    }

    for (var s = 0; s < closeButton.length; s++) {
      closeButton[s].addEventListener('click', function (index) {
        cardsCollecton[index].classList.add('hidden');
      }.bind(null, s)
      );
    }

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_BUTTON) {
        utilClose(cardsCollecton);
      }
    });
  };
})();
