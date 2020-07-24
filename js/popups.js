'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;
  var mainBlock = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content;

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

    if (message) {
      textMessage.textContent = message;
      mainBlock.appendChild(errorMessage);
      var errorBlock = document.querySelector('.error');
      errorBlock.addEventListener('click', onDocumentClick);
      document.addEventListener('keydown', onDocumentEscPress);

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
    if (evt.key === window.constants.escKey) {
      closeMessage();
    }
  };

  window.popups = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
  };

})();
