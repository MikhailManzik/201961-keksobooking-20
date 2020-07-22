'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFilters = document.querySelector('.map__filters');
  var PriceRange = {
    type: {
      MIDDLE: 'middle',
      LOW: 'low',
      HIGH: 'high'
    },
    value: {
      MIN: 10000,
      MAX: 50000
    }
  };

  var onUpdatePins = function () {
    window.card.closePopup();
    window.pin.removePins();

    var filterFields = function (selectedValue, pinValue) {
      return selectedValue === 'any' || pinValue === selectedValue;
    };

    var filterHousingPrice = function (selectedValue, pinValue) {
      switch (selectedValue) {
        case PriceRange.type.MIDDLE:
          return pinValue >= PriceRange.value.MIN && pinValue <= PriceRange.value.MAX;
        case PriceRange.type.LOW:
          return pinValue <= PriceRange.value.MIN;
        case PriceRange.type.HIGH:
          return pinValue >= PriceRange.value.MAX;
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

    var filteredDataArray = window.filter.arrayPins.filter(function (pin) {
      return filterFields(housingType.value, pin.offer.type)
      && filterHousingPrice(housingPrice.value, pin.offer.price)
      && filterFields(housingRooms.value, pin.offer.rooms.toString())
      && filterFields(housingGuests.value, pin.offer.guests.toString())
      && filterHousingFeatures(pin);
    });

    window.pin.renderPins(filteredDataArray);
  };

  var onSuccessLoad = function (data) {
    window.filter.arrayPins = data;
    window.pin.renderPins(window.filter.arrayPins);
  };

  formFilters.addEventListener('change', onUpdatePins);

  window.filter = {
    onSuccessLoad: onSuccessLoad,
  };

})();
