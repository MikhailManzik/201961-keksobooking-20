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
// var cardTemplate = document.querySelector('#card').content;
// var mapCard = cardTemplate.querySelector('.map__card');
// var mapFilter = document.querySelector('.map__filters-container');
// var TYPES_OF_HOUSING = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало'
// };
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

var elements = getPoolElements(LIST_AVATARS, LIST_TITLES, LIST_TYPES, LIST_TIME, LIST_FEATURES, LIST_PHOTOS);

var createPin = function (value) {
  var pin = mapPin.cloneNode(true);
  var pinImage = pin.querySelector('img');
  pin.style.left = value.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = value.location.y - PIN_HEIGHT + 'px';
  pinImage.src = value.author.avatar;
  pinImage.alt = value.offer.title;

  return pin;
};

var renderPin = function (element) {
  var fragment = document.createDocumentFragment();

  element.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });

  mapPins.appendChild(fragment);
};

// var renderFeatures = function (items, container) {
//   container.innerHTML = '';
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < items.length; i++) {
//     var element = document.createElement('li');
//     element.className = 'popup__feature popup__feature--' + items[i];
//     fragment.appendChild(element);
//   }
//   container.appendChild(fragment);
// };

// var renderPhotos = function (items, container) {
//   var photoItem = container.querySelector('.popup__photo');
//   container.innerHTML = '';
//   var fragment = document.createDocumentFragment();

//   for (var a = 0; a < items.length; a++) {
//     var photo = photoItem.cloneNode(true);
//     photo.src = items[a];
//     fragment.appendChild(photo);
//   }

//   container.appendChild(fragment);
// };

// var renderCard = function (element) {
//   var card = mapCard.cloneNode(true);
//   var popupFeatures = card.querySelector('.popup__features');
//   var popupPhotos = card.querySelector('.popup__photos');

//   card.querySelector('.popup__title').textContent = element.offer.title;
//   card.querySelector('.popup__text--address').textContent = element.offer.address;
//   card.querySelector('.popup__text--price').textContent = element.offer.price + ' ₽/ночь';
//   card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[element.offer.type];
//   card.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
//   card.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ',' + ' выезд до ' + element.offer.checkout;
//   renderFeatures(element.offer.features, popupFeatures);
//   card.querySelector('.popup__description').textContent = element.offer.description;
//   renderPhotos(element.offer.photos, popupPhotos);

//   map.insertBefore(card, mapFilter);
// };

// renderCard(elements[0]);

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
  renderPin(elements);
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

