'use strict';

var POOL_OBJECTS = 8;
var LIST_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var LIST_TITLES = ['Большой дом', 'Хостел', 'Кробка из под телевизора', 'Просторная крвартира', 'Шалаш', 'Бунгало', 'Квартира студия', 'Комната'];
var LIST_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var LIST_TIME = ['12:00', '13:00', '14:00'];
var LIST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LIST_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content;
var mapPin = pinTemplate.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapBlockWidth = map.offsetWidth;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var cardTemplate = document.querySelector('#card').content;
var mapCard = cardTemplate.querySelector('.map__card');
var mapFilter = document.querySelector('.map__filters-container');
var TYPES_OF_HOUSING = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelects = mapFilters.querySelectorAll('select');
var mapFeatures = mapFilters.querySelector('fieldset');
var mainPinButton = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_HEIGHT_ACTIVE = 85;
var addressInput = document.querySelector('#address');
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var ROOM_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};
var SYSTEM_OF_NUMERATION = 10;
var LEFT_MOUSE_BUTTON = 0;
var ENTER_KEY = 'Enter';
var ESC_KEY_CODE = 'Escape';
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

var getRandomNumber = function (num) {
  return Math.floor(Math.random() * num);
};

var getRandomRangeValue = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomValueArray = function (array) {
  var randomValue = getRandomNumber(array.length);
  return array[randomValue];
};

var getArrayRandomLength = function (array) {
  var newArray = array.slice(getRandomRangeValue(0, array.length));
  return newArray;
};

var getPoolElements = function (avatars, titles, types, time, options, images) {
  var newArray = [];

  for (var i = 0; i < POOL_OBJECTS; i++) {

    var locationX = getRandomNumber(mapBlockWidth);
    var locationY = getRandomRangeValue(130, 630);

    var item = {

      author: {
        avatar: avatars[i],
      },

      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(10000),
        type: getRandomValueArray(types),
        rooms: getRandomRangeValue(1, 6),
        guests: getRandomRangeValue(1, 10),
        checkin: getRandomValueArray(time),
        checkout: getRandomValueArray(time),
        features: getArrayRandomLength(options),
        description: 'Строка с описанием',
        photos: getArrayRandomLength(images),
      },

      location: {
        x: locationX,
        y: locationY,
      }
    };

    newArray.push(item);
  }
  return newArray;
};

var objects = getPoolElements(LIST_AVATARS, LIST_TITLES, LIST_TYPES, LIST_TIME, LIST_FEATURES, LIST_PHOTOS);

var renderPin = function (offer) {
  var pin = mapPin.cloneNode(true);
  var pinImage = pin.querySelector('img');
  pin.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = offer.location.y - PIN_HEIGHT + 'px';
  pinImage.src = offer.author.avatar;
  pinImage.alt = offer.offer.title;

  pin.addEventListener('click', function () {
    var popup = document.querySelector('.popup');

    if (popup) {
      popup.remove();
    }
    renderCard(offer);
    pin.classList.add('map__pin--active');
  });

  return pin;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();

  offers.forEach(function (offer) {
    fragment.appendChild(renderPin(offer));
  });

  mapPins.appendChild(fragment);
};

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

var disableElements = function (value) {
  mapFiltersSelects.forEach(function (item) {
    item.disabled = value;
  });

  adFormFieldsets.forEach(function (item) {
    item.disabled = value;
  });

  mapFeatures.disabled = value;
};

disableElements(true);

var getAddressOfMainPin = function (value) {
  var mainPinPositionX = mainPinButton.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
  var mainPinPositionY = value ? mainPinButton.offsetTop + MAIN_PIN_HEIGHT_ACTIVE : mainPinButton.offsetTop + Math.round(MAIN_PIN_HEIGHT / 2);

  addressInput.value = mainPinPositionX + ', ' + mainPinPositionY;
};

getAddressOfMainPin(false);

var activeMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  disableElements(false);
  renderPins(objects);
  getAddressOfMainPin(true);
  validationRoomsAndGuests();

  mainPinButton.removeEventListener('mousedown', onMainPinClick);
  mainPinButton.removeEventListener('keydown', onMainPinEnterPress);

};

var onMainPinClick = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activeMap();
  }
};

var onMainPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activeMap();
  }
};

mainPinButton.addEventListener('mousedown', onMainPinClick);
mainPinButton.addEventListener('keydown', onMainPinEnterPress);

var validationRoomsAndGuests = function () {
  var roomNumber = roomNumberSelect.value;
  var capacityNumber = parseInt(capacitySelect.value, SYSTEM_OF_NUMERATION);
  capacitySelect.setCustomValidity(ROOM_CAPACITY[roomNumber].includes(capacityNumber) ? '' : 'Количество гостей больше чем комнат');
};

roomNumberSelect.addEventListener('change', validationRoomsAndGuests);
capacitySelect.addEventListener('change', validationRoomsAndGuests);

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

var getPriceFormOffer = function (evt) {
  var value = evt.target.value;
  switch (value) {
    case 'flat':
      priceFormOffer.min = 1000;
      priceFormOffer.placeholder = 1000;
      break;
    case 'bungalo':
      priceFormOffer.min = 0;
      priceFormOffer.placeholder = 0;
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

typeFormHousingOffer.addEventListener('change', getPriceFormOffer);


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

var onTimeChange = function (sourceElement, targetElement) {
  if (sourceElement.value !== targetElement.value) {
    targetElement.value = sourceElement.value;
  }
};

timeInFormOffer.addEventListener('change', onTimeChange.bind(null, timeInFormOffer, timeOutFormOffer));
timeOutFormOffer.addEventListener('change', onTimeChange.bind(null, timeOutFormOffer, timeInFormOffer));

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

inputAvatar.addEventListener('change', function () {
  addPicture(inputAvatar, true, imgAvatar);
});

inputImages.addEventListener('change', function () {
  addPicture(inputImages, false, imgApartament);
});

