'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var mapPins = document.querySelector('.map__pins');
  var mapPin = pinTemplate.querySelector('.map__pin');
  var mainPinButton = document.querySelector('.map__pin--main');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 85;
  var addressInput = document.querySelector('#address');
  var MOVEMENT_ZONE_Y_TOP = 130;
  var MOVEMENT_ZONE_Y_BOTTOM = 630;
  var defaultPositionMainPin = {
    x: mainPinButton.offsetLeft,
    y: mainPinButton.offsetTop
  };

  var renderPin = function (offer) {
    var pin = mapPin.cloneNode(true);
    var pinImage = pin.querySelector('img');
    pin.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = offer.location.y - PIN_HEIGHT + 'px';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;

    pin.addEventListener('click', function () {
      var popup = document.querySelector('.popup');
      var currentPin = document.querySelector('.map__pin--active');

      if (currentPin) {
        currentPin.classList.remove('map__pin--active');
      } if (popup) {
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

  var getAddressOfMainPin = function (value) {
    var mainPinPositionX = mainPinButton.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    var mainPinPositionY = value ? mainPinButton.offsetTop + MAIN_PIN_HEIGHT_ACTIVE : mainPinButton.offsetTop + Math.round(MAIN_PIN_HEIGHT / 2);

    addressInput.value = mainPinPositionX + ', ' + mainPinPositionY;
  };

  mainPinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newPosition = {
        x: mainPinButton.offsetLeft - shift.x,
        y: mainPinButton.offsetTop - shift.y,
      };

      if (newPosition.x >= -Math.round(MAIN_PIN_WIDTH / 2) && newPosition.x <= mapPins.offsetWidth - MAIN_PIN_WIDTH / 2) {
        mainPinButton.style.left = newPosition.x + 'px';
      } if (newPosition.y >= MOVEMENT_ZONE_Y_TOP - Math.round(MAIN_PIN_HEIGHT / 2) && newPosition.y <= MOVEMENT_ZONE_Y_BOTTOM - MAIN_PIN_HEIGHT / 2) {
        mainPinButton.style.top = newPosition.y + 'px';
      }

      getAddressOfMainPin();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  function resetPositionPin() {
    mainPinButton.style = 'left:' + defaultPositionMainPin.x + 'px;' + 'top:' + defaultPositionMainPin.y + 'px';
    getAddressOfMainPin(false);
  }

  window.pin = {
    renderPins: renderPins,
    getAddressOfMainPin: getAddressOfMainPin,
    removePins: removePins,
    resetPositionPin: resetPositionPin,
  };

})();
