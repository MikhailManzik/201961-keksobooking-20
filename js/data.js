'use strict';

(function () {
  var POOL_OBJECTS = 8;
  var LIST_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var LIST_TITLES = ['Большой дом', 'Хостел', 'Кробка из под телевизора', 'Просторная крвартира', 'Шалаш', 'Бунгало', 'Квартира студия', 'Комната'];
  var LIST_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var LIST_TIME = ['12:00', '13:00', '14:00'];
  var LIST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var LIST_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var map = document.querySelector('.map');
  var mapBlockWidth = map.offsetWidth;

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

  var getPoolObjects = function (avatars, titles, types, time, options, images) {
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

  var ArraysObjects = getPoolObjects(LIST_AVATARS, LIST_TITLES, LIST_TYPES, LIST_TIME, LIST_FEATURES, LIST_PHOTOS);

  window.data = {
    objects: ArraysObjects,
  };
})();

