'use strict';

var pinCount = 8;
var map = document.querySelector('.map');
var mainPinButton = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formAndFilterFields = document.querySelectorAll('.map__features, select, fieldset');
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_HEIGHT_ACTIVE = 85;
var addressInput = document.querySelector('#address');
var LEFT_MOUSE_BUTTON = 0;
var ENTER_KEY = 'Enter';

var disableFields = function (value) {
  formAndFilterFields.forEach(function (item) {
    item.disabled = value;
  });
};

var getAddressOfMainPin = function (value) {
  var mainPinPositionX = mainPinButton.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
  var mainPinPositionY = value ? mainPinButton.offsetTop + MAIN_PIN_HEIGHT_ACTIVE : mainPinButton.offsetTop + Math.round(MAIN_PIN_HEIGHT / 2);

  addressInput.value = mainPinPositionX + ', ' + mainPinPositionY;
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  disableFields(false);
  window.pin.renderPins(window.data.getData(pinCount));
  getAddressOfMainPin(true);

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
  getAddressOfMainPin: getAddressOfMainPin,
};
