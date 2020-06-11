'use strict';

var SUM_OBJECTS = 8;
var listAvatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var listTitles = ['Большой дом', 'Хостел', 'Кробка из под телевизора', 'Просторная крвартира', 'Шалаш', 'Бунгало', 'Квартира студия', 'Комната'];
var listTypes = ['palace', 'flat', 'house', 'bungalo'];
var listTime = ['12:00', '13:00', '14:00'];
var listFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var listPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content;
var mapPin = pinTemplate.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapBlock = document.querySelector('.map__overlay').offsetWidth;

var getRandomNumber = function (num) {
  return Math.floor(Math.random() * num);
};

var getRandomRangeValue = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomValueArray = function (arr) {
  var number = getRandomNumber(arr.length);
  return arr[number];
};

var getArrayRandomLength = function (arr) {
  var value = getRandomNumber(arr.length - 1);
  var newArr = arr.slice(value);
  return newArr;
};

var getPoolElements = function (avatars, titels, types, time, options, images) {
  var newArr = [];

  for (var i = 0; i < SUM_OBJECTS; i++) {
    var item = {

      author: {
        avatar: avatars[i]
      },

      offer: {
        title: titels[i],
        address: '600, 350',
        price: getRandomNumber(10000),
        type: getRandomValueArray(types),
        rooms: getRandomNumber(6),
        guests: getRandomNumber(10),
        checkin: getRandomValueArray(time),
        checkout: getRandomValueArray(time),
        features: getArrayRandomLength(options),
        description: 'Строка с описанием',
        photos: getArrayRandomLength(images),
      },

      location: {
        x: getRandomNumber(mapBlock),
        y: getRandomRangeValue(130, 630),
      }
    };

    newArr.push(item);
  }
  return newArr;
};

var elements = getPoolElements(listAvatars, listTitles, listTypes, listTime, listFeatures, listPhotos);

map.classList.remove('map--faded');

var createPin = function (value) {
  var pin = mapPin.cloneNode(true);
  pin.style.left = value.location.x + mapPin.offsetWidth + 'px';
  pin.style.top = value.location.y + mapPin.offsetHeight + 'px';
  pin.querySelector('img').src = value.author.avatar;
  pin.querySelector('img').alt = value.offer.title;
  mapPins.appendChild(pin);
};

for (var i = 0; i < elements.length; i++) {
  createPin(elements[i]);
}
