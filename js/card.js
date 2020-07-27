'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content;
  var mapCard = cardTemplate.querySelector('.map__card');
  var mapFilter = document.querySelector('.map__filters-container');
  var TypesOfHousing = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var renderFeatures = function (items, container) {
    if (items) {
      container.innerHTML = '';
      var fragment = document.createDocumentFragment();

      items.forEach(function (item) {
        var element = document.createElement('li');
        element.className = 'popup__feature popup__feature--' + item;
        fragment.appendChild(element);
      });

      container.appendChild(fragment);
    } else {
      container.classList.add('hidden');
    }

  };

  var renderPhotos = function (items, container) {
    if (items) {
      var photoItem = container.querySelector('.popup__photo');
      container.innerHTML = '';
      var fragment = document.createDocumentFragment();

      items.forEach(function (item) {
        var photo = photoItem.cloneNode(true);
        photo.src = item;
        fragment.appendChild(photo);
      });

      container.appendChild(fragment);
    } else {
      container.classList.add('hidden');
    }
  };

  var renderCard = function (element) {
    var card = mapCard.cloneNode(true);
    var popupFeatures = card.querySelector('.popup__features');
    var popupPhotos = card.querySelector('.popup__photos');
    var popupClose = card.querySelector('.popup__close');
    var popupDescription = card.querySelector('.popup__description');

    card.querySelector('.popup__avatar').src = element.author.avatar;
    card.querySelector('.popup__title').textContent = element.offer.title;
    card.querySelector('.popup__text--address').textContent = element.offer.address;
    card.querySelector('.popup__text--price').textContent = element.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = TypesOfHousing[element.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ',' + ' выезд до ' + element.offer.checkout;
    renderFeatures(element.offer.features, popupFeatures);

    if (element.offer.description !== 0) {
      popupDescription.textContent = element.offer.description;
    } else {
      popupDescription.classList.add('hidden');
    }

    renderPhotos(element.offer.photos, popupPhotos);

    map.insertBefore(card, mapFilter);

    popupClose.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onEscPress);
  };

  var closePopup = function () {
    var popup = document.querySelector('.popup');
    var pin = window.pin.pins.querySelector('.map__pin--active');
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
    if (popup) {
      popup.remove();
    }
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (evt.key === window.constants.escKey) {
      closePopup();
    }
  };

  window.card = {
    mainMap: map,
    render: renderCard,
    closePopup: closePopup,
  };

})();
