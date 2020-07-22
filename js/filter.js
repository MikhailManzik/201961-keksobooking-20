'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFilters = document.querySelector('.map__filters');
  var PRICE_TYPE = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };
  var PRICE_VALUE = {
    MIN: 10000,
    MAX: 50000
  };

  var filterFields = function (selectedValue, pinValue) {
    return selectedValue === 'any' || pinValue === selectedValue;
  };

  var filterHousingPrice = function (selectedValue, pinValue) {
    switch (selectedValue) {
      case PRICE_TYPE.MIDDLE:
        return pinValue >= PRICE_VALUE.MIN && pinValue <= PRICE_VALUE.MAX;
      case PRICE_TYPE.LOW:
        return pinValue <= PRICE_VALUE.MIN;
      case PRICE_TYPE.HIGH:
        return pinValue >= PRICE_VALUE.MAX;
      default:
        return true;
    }
  };

  var filterHousingFeatures = function (item) {
    var featuresItems = mapFilters.querySelectorAll('.map__checkbox:checked');
    return Array.from(featuresItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var updatePins = function () {
    window.card.closePopup();
    window.pin.removePins();

    var filteredDataArray = window.pin.arrayPins.filter(function (pin) {
      return filterFields(housingType.value, pin.offer.type)
      && filterHousingPrice(housingPrice.value, pin.offer.price)
      && filterFields(housingRooms.value, pin.offer.rooms.toString())
      && filterFields(housingGuests.value, pin.offer.guests.toString())
      && filterHousingFeatures(pin);
    });

    window.pin.renderPins(filteredDataArray);
  };

  var onHousingFilter = window.debounce(function () {
    updatePins();
  });

  formFilters.addEventListener('change', onHousingFilter);

})();
