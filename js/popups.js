'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content;
  var mainBlock = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content;
  var errorButton = document.querySelector('.error__button');
  var ESC_KEY_CODE = 'Escape';
  var adForm = document.querySelector('.ad-form');

  var showSuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);
    mainBlock.appendChild(successMessage);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscPress);

    window.page.deactivatePage();
  };

  var showErrorMessage = function (error) {
    var buttonSubmit = adForm.querySelector('.ad-form__submit');

    if (buttonSubmit) {
      var errorMessage = errorTemplate.cloneNode(true);
      mainBlock.appendChild(errorMessage);

      document.addEventListener('click', onDocumentClick);
      document.addEventListener('keydown', onDocumentEscPress);
    }

    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
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
    if (evt.key === ESC_KEY_CODE || evt.key === errorButton) {
      closeMessage();
    }
  };

  window.popups = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
  };

})();
