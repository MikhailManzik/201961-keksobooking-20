'use strict';

var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelects = mapFilters.querySelectorAll('select');
var mapFeatures = mapFilters.querySelector('fieldset');
var mainPinButton = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_HEIGHT_ACTIVE = 85;
var addressInput = document.querySelector('#address');

var LEFT_MOUSE_BUTTON = 0;
var ENTER_KEY = 'Enter';

var disableElements = function (value) {
  mapFiltersSelects.forEach(function (item) {
    item.disabled = value;
  });

  adFormFieldsets.forEach(function (item) {
    item.disabled = value;
  });

  mapFeatures.disabled = value;
};

disableElements(true);

var getAddressOfMainPin = function (value) {
  var mainPinPositionX = mainPinButton.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
  var mainPinPositionY = value ? mainPinButton.offsetTop + MAIN_PIN_HEIGHT_ACTIVE : mainPinButton.offsetTop + Math.round(MAIN_PIN_HEIGHT / 2);

  addressInput.value = mainPinPositionX + ', ' + mainPinPositionY;
};

getAddressOfMainPin(false);

var activeMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  disableElements(false);
  window.pin.renderPins(window.data.objects);
  getAddressOfMainPin(true);
  window.form.validationRoomsAndGuests();

  mainPinButton.removeEventListener('mousedown', onMainPinClick);
  mainPinButton.removeEventListener('keydown', onMainPinEnterPress);

};

var onMainPinClick = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activeMap();
  }
};

var onMainPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activeMap();
  }
};

mainPinButton.addEventListener('mousedown', onMainPinClick);
mainPinButton.addEventListener('keydown', onMainPinEnterPress);
