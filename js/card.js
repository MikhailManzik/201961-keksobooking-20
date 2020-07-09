'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content;
  var mapCard = cardTemplate.querySelector('.map__card');
  var mapFilter = document.querySelector('.map__filters-container');
  var TYPES_OF_HOUSING = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var ESC_KEY_CODE = 'Escape';

  var renderFeatures = function (items, container) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();

    items.forEach(function (item) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + item;
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
  };

  var renderPhotos = function (items, container) {
    var photoItem = container.querySelector('.popup__photo');
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();

    items.forEach(function (item) {
      var photo = photoItem.cloneNode(true);
      photo.src = item;
      fragment.appendChild(photo);
    });

    container.appendChild(fragment);
  };

  var renderCard = function (element) {
    var card = mapCard.cloneNode(true);
    var popupFeatures = card.querySelector('.popup__features');
    var popupPhotos = card.querySelector('.popup__photos');
    var popupClose = card.querySelector('.popup__close');

    card.querySelector('.popup__avatar').src = element.author.avatar;
    card.querySelector('.popup__title').textContent = element.offer.title;
    card.querySelector('.popup__text--address').textContent = element.offer.address;
    card.querySelector('.popup__text--price').textContent = element.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[element.offer.type];
    card.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ',' + ' выезд до ' + element.offer.checkout;
    renderFeatures(element.offer.features, popupFeatures);
    card.querySelector('.popup__description').textContent = element.offer.description;
    renderPhotos(element.offer.photos, popupPhotos);

    map.insertBefore(card, mapFilter);

    popupClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPinEscPress);
  };

  var closePopup = function () {
    var popup = document.querySelector('.popup');
    var pin = mapPins.querySelector('.map__pin--active');
    pin.classList.remove('map__pin--active');
    if (popup) {
      popup.remove();
    }
    document.removeEventListener('keydown', onPinEscPress);
  };

  var onPinEscPress = function (evt) {
    if (evt.key === ESC_KEY_CODE) {
      closePopup();
    }
  };

  window.card = {
    renderCard: renderCard,
  };

})();
