'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var mapPins = document.querySelector('.map__pins');
  var mapPin = pinTemplate.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var renderPin = function (offer) {
    var pin = mapPin.cloneNode(true);
    var pinImage = pin.querySelector('img');
    pin.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = offer.location.y - PIN_HEIGHT + 'px';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;

    pin.addEventListener('click', function () {
      var popup = document.querySelector('.popup');

      if (popup) {
        popup.remove();
      }
      window.card.renderCard(offer);
      pin.classList.add('map__pin--active');
    });

    return pin;
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      fragment.appendChild(renderPin(offer));
    });

    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
  };

})();
