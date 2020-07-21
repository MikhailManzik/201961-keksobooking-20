'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');

  var onUpdatePins = function () {
    window.card.closePopup();
    window.pin.removePins();

    var filterTypeHousing = function (selectedValue, arraysValue) {
      return selectedValue === 'any' || arraysValue === selectedValue;
    };

    var filteredArray = window.filter.arrayPins.filter(function (e) {
      return filterTypeHousing(housingType.value, e.offer.type);
    });

    window.pin.renderPins(filteredArray);
  };

  formFilters.addEventListener('change', onUpdatePins);

  var onSuccessLoad = function (data) {
    window.filter.arrayPins = data;
    window.pin.renderPins(window.filter.arrayPins);
  };

  window.filter = {
    onSuccessLoad: onSuccessLoad,
  };

})();
