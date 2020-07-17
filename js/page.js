'use strict';

(function () {
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
    window.backend.load(onSuccessLoad);
    window.pin.getAddressOfMainPin(true);

    mainPinButton.removeEventListener('mousedown', onMainPinClick);
    mainPinButton.removeEventListener('keydown', onMainPinEnterPress);
  };

  var deactivationPage = function () {
    adForm.reset();
    window.card.closePopup();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    disableFields(true);
    window.pin.removePins();
    window.pin.getAddressOfMainPin(true);

    mainPinButton.addEventListener('mousedown', onMainPinClick);
    mainPinButton.addEventListener('keydown', onMainPinEnterPress);
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

  function onSuccessLoad(data) {
    window.pin.renderPins(data);
  }

  mainPinButton.addEventListener('mousedown', onMainPinClick);
  mainPinButton.addEventListener('keydown', onMainPinEnterPress);

  window.page = {
    disableFields: disableFields,
    deactivationPage: deactivationPage,
  };

})();
