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

map.classList.remove('map--faded');

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

  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(createPin(element[i]));
  }
  mapPins.appendChild(fragment);
};

renderPin(elements);

var renderFeatures = function (items, template) {
  var containerFeatures = template.querySelector('.popup__features');
  var featureItem = containerFeatures.querySelectorAll('.popup__feature');

  for (var a = 0; a < featureItem.length; a++) {
    containerFeatures.removeChild(featureItem[a]);
  }
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < items.length; i++) {
    var element = document.createElement('li');
    element.className = 'popup__feature popup__feature--' + items[i];
    fragment.appendChild(element);
  }
  containerFeatures.appendChild(fragment);
};

var renderPhotos = function (items, template) {

  var containerPhotos = template.querySelector('.popup__photos');
  var photoItem = template.querySelector('.popup__photo');
  containerPhotos.removeChild(photoItem);
  var fragment = document.createDocumentFragment();

  for (var a = 0; a < items.length; a++) {
    var photo = photoItem.cloneNode(true);
    photo.src = items[a];
    fragment.appendChild(photo);
  }

  containerPhotos.appendChild(fragment);
};

var renderCard = function (poolElements) {
  var card = mapCard.cloneNode(true);

  card.querySelector('.popup__title').textContent = poolElements.offer.title;
  card.querySelector('.popup__text--address').textContent = poolElements.offer.address;
  card.querySelector('.popup__text--price').textContent = poolElements.offer.price + 'Р/ночь';
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[poolElements.offer.type];
  card.querySelector('.popup__text--capacity').textContent = poolElements.offer.rooms + ' комнаты для ' + poolElements.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + poolElements.offer.checkin + ',' + ' выезд до ' + poolElements.offer.checkout;
  renderFeatures(poolElements.offer.features, card);
  card.querySelector('.popup__description').textContent = poolElements.offer.description;
  renderPhotos(poolElements.offer.photos, card);

  map.insertBefore(card, mapFilter);
};

renderCard(elements[0]);
