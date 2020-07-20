'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;
  var mainBlock = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content;
  var ESC_KEY_CODE = 'Escape';

  var showSuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);
    mainBlock.appendChild(successMessage);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscPress);

    window.page.deactivatePage();
  };

  var showErrorMessage = function (message) {
    var errorMessage = errorTemplate.cloneNode(true);
    var textMessage = errorMessage.querySelector('.error__message');
    var errorButton = errorMessage.querySelector('.error__button');

    if (message) {
      textMessage.textContent = message;
      errorButton.textContent = 'Перезагрузить страницу';
      mainBlock.appendChild(errorMessage);

      var errorBlock = document.querySelector('.error');
      errorBlock.addEventListener('click', onDocumentClick);
      document.addEventListener('keydown', onDocumentEscPress);

      errorButton.addEventListener('click', function () {
        document.location.reload(true);
      });
    } else {
      mainBlock.appendChild(errorMessage);
      document.addEventListener('click', onDocumentClick);
      document.addEventListener('keydown', onDocumentEscPress);
    }
  };

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
    if (evt.key === ESC_KEY_CODE) {
      closeMessage();
    }
  };

  window.popups = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
  };

})();
