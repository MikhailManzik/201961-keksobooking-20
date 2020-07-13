'use strict';

(function () {
  var pinCount = 8;
  var map = document.querySelector('.map');
  var mainPinButton = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var filterAndNoticeFields = document.querySelectorAll('.map__features, select, fieldset');
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_KEY = 'Enter';

  var disableFields = function (value) {
    filterAndNoticeFields.forEach(function (item) {
      item.disabled = value;
    });
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    disableFields(false);
    window.pin.renderPins(window.data.getData(pinCount));
    window.pin.getAddressOfMainPin(true);

    mainPinButton.removeEventListener('mousedown', onMainPinClick);
    mainPinButton.removeEventListener('keydown', onMainPinEnterPress);

  };

  var onMainPinClick = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      activatePage();
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
    }
  };

  mainPinButton.addEventListener('mousedown', onMainPinClick);
  mainPinButton.addEventListener('keydown', onMainPinEnterPress);

  window.page = {
    disableFields: disableFields,
  };

})();
