'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPinButton = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var filterAndNoticeFields = document.querySelectorAll('.map__features, select, fieldset');
  var LEFT_MOUSE_BUTTON = 0;
  var ENTER_KEY = 'Enter';
  var SERVER_URL = 'https://javascript.pages.academy/keksobooking';
  var SERVER_URL_DATA = SERVER_URL + '/data';
  var REQUEST_METHOD_GET = 'GET';
  var adFormPhoto = document.querySelector('.ad-form__photo');
  var DEFAULT_AVATAR_IMG = 'img/muffin-grey.svg';
  var adFormHeaderPreview = adForm.querySelector('.ad-form-header__preview img');

  var disableFields = function (value) {
    filterAndNoticeFields.forEach(function (item) {
      item.disabled = value;
    });
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    disableFields(false);
    window.backend.load(SERVER_URL_DATA, REQUEST_METHOD_GET, window.filter.onSuccessLoad, window.popups.showErrorMessage.bind(null, 'Ошибка загрузки данных с сервера'));
    window.pin.getAddressOfMainPin(true);

    mainPinButton.removeEventListener('mousedown', onMainPinClick);
    mainPinButton.removeEventListener('keydown', onMainPinEnterPress);
  };

  var deactivatePage = function () {
    var mapCard = document.querySelector('.map__card');
    var mapFilters = document.querySelector('.map__filters');
    if (mapCard) {
      mapCard.remove();
    }
    mapFilters.reset();
    adForm.reset();
    adFormHeaderPreview.src = DEFAULT_AVATAR_IMG;
    window.form.removePicture(adFormPhoto);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    disableFields(true);
    window.pin.removePins();
    window.pin.getAddressOfMainPin(false);
    window.pin.resetPositionPin();

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

  mainPinButton.addEventListener('mousedown', onMainPinClick);
  mainPinButton.addEventListener('keydown', onMainPinEnterPress);

  window.page = {
    disableFields: disableFields,
    deactivatePage: deactivatePage,
  };

})();
