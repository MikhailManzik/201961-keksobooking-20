'use strict';

(function () {
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var ROOM_CAPACITY = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var SYSTEM_OF_NUMERATION = 10;
  var titleFormOffer = document.querySelector('#title');
  var priceFormOffer = document.querySelector('#price');
  var typeFormHousingOffer = document.querySelector('#type');
  var timeInFormOffer = document.querySelector('#timein');
  var timeOutFormOffer = document.querySelector('#timeout');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var inputAvatar = document.querySelector('#avatar');
  var imgAvatar = document.querySelector('.ad-form-header__preview img');
  var inputImages = document.querySelector('#images');
  var imgApartament = document.querySelector('.ad-form__photo');
  var adForm = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content;
  var mainBlock = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content;
  var errorButton = document.querySelector('.error__button');
  var ESC_KEY_CODE = 'Escape';
  var resetButton = document.querySelector('.ad-form__reset');

  var validateRoomsAndGuests = function () {
    var roomNumber = roomNumberSelect.value;
    var capacityNumber = parseInt(capacitySelect.value, SYSTEM_OF_NUMERATION);
    capacitySelect.setCustomValidity(ROOM_CAPACITY[roomNumber].includes(capacityNumber) ? '' : 'Количество гостей больше чем комнат');
  };

  var onPriceChange = function (evt) {
    var value = evt.target.value;
    switch (value) {
      case 'bungalo':
        priceFormOffer.min = 0;
        priceFormOffer.placeholder = 0;
        break;
      case 'flat':
        priceFormOffer.min = 1000;
        priceFormOffer.placeholder = 1000;
        break;
      case 'house':
        priceFormOffer.min = 5000;
        priceFormOffer.placeholder = 5000;
        break;
      case 'palace':
        priceFormOffer.min = 10000;
        priceFormOffer.placeholder = 10000;
        break;
    }
  };

  var onTimeChange = function (sourceElement, targetElement) {
    if (sourceElement.value !== targetElement.value) {
      targetElement.value = sourceElement.value;
    }
  };

  var addPicture = function (fileChooser, isPreview, preview) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
    }

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {

        if (isPreview) {
          preview.src = reader.result;
        } else {
          var newPreview = document.createElement('img');
          newPreview.src = reader.result;
          newPreview.width = 70;
          newPreview.height = 70;
          newPreview.style = 'object-fit: cover; margin-bottom: 8px; margin-right: 10px; border-radius: 5px';
          newPreview.alt = 'Превью';
          preview.insertBefore(newPreview, preview.children[preview.children.length - 1]);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  function showSuccessMessage() {
    var successMessage = successTemplate.cloneNode(true);
    mainBlock.appendChild(successMessage);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscPress);

    window.page.deactivationPage();
  }

  function showErrorMessage() {
    var errorMessage = errorTemplate.cloneNode(true);
    mainBlock.appendChild(errorMessage);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscPress);
  }

  var closeMessage = function () {
    var successMessagePopup = document.querySelector('.success');
    var errorMessagePopup = document.querySelector('.error');

    if (successMessagePopup) {
      successMessagePopup.remove();
    }

    if (errorMessagePopup) {
      errorMessagePopup.remove();
    }

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscPress);
  };

  var onDocumentClick = function () {
    closeMessage();
  };

  var onDocumentEscPress = function (evt) {
    if (evt.key === ESC_KEY_CODE || evt.key === errorButton) {
      closeMessage();
    }
  };

  validateRoomsAndGuests();

  titleFormOffer.addEventListener('invalid', function () {
    if (titleFormOffer.validity.tooShort) {
      titleFormOffer.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (titleFormOffer.validity.tooLong) {
      titleFormOffer.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (titleFormOffer.validity.valueMissing) {
      titleFormOffer.setCustomValidity('Обязательное поле');
    } else {
      titleFormOffer.setCustomValidity('');
    }
  });

  priceFormOffer.addEventListener('invalid', function () {
    if (priceFormOffer.validity.rangeUnderflow) {
      priceFormOffer.setCustomValidity('Жилье не может стоить меньше 1000 рублей');
    } else if (priceFormOffer.validity.rangeOverflow) {
      priceFormOffer.setCustomValidity('Жилье не может стоить больше 1 000 000 рублей');
    } else if (priceFormOffer.validity.valueMissing) {
      priceFormOffer.setCustomValidity('Обязательное поле');
    } else {
      priceFormOffer.setCustomValidity('');
    }
  });

  roomNumberSelect.addEventListener('change', function () {
    validateRoomsAndGuests();
  });
  capacitySelect.addEventListener('change', function () {
    validateRoomsAndGuests();
  });

  typeFormHousingOffer.addEventListener('change', onPriceChange);

  timeInFormOffer.addEventListener('change', onTimeChange.bind(null, timeInFormOffer, timeOutFormOffer));
  timeOutFormOffer.addEventListener('change', onTimeChange.bind(null, timeOutFormOffer, timeInFormOffer));

  inputAvatar.addEventListener('change', function () {
    addPicture(inputAvatar, true, imgAvatar);
  });

  inputImages.addEventListener('change', function () {
    addPicture(inputImages, false, imgApartament);
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), showSuccessMessage, showErrorMessage);
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.page.deactivationPage();
  });

  window.form = {
    validateRoomsAndGuests: validateRoomsAndGuests,
  };

})();
