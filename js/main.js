'use strict';

var SUM_OBJECTS = 8;
var listAvatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var listTitles = ['Большой дом', 'Хостел', 'Кробка из под телевизора', 'Просторная крвартира', 'Шалаш'];
var listTypes = ['palace', 'flat', 'house', 'bungalo'];
var listTime = ['12:00', '13:00', '14:00'];
var listFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var listPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinMap = document.querySelector('.tokyo__pin-map');

var getRandomNumber = function (num) {
  return Math.floor(Math.random() * num);
};

var getRandomRangeValue = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getItem = function (avatars, titels, types, time, options, images) {
  var newArr = [];

  for (var i = 0; i < SUM_OBJECTS; i++) {
    var item = {

      author: {
        avatar: avatars[getRandomNumber(avatars.length)]
      },

      offer: {
        title: titels[getRandomNumber(titels.length)],
        address: '600, 350',
        price: getRandomNumber(10000),
        type: types[getRandomNumber(types.length)],
        rooms: getRandomNumber(6),
        guests: getRandomNumber(10),
        checkin: time[getRandomNumber(time.length)],
        checkout: time[getRandomNumber(time.length)],
        features: options[getRandomNumber(options.length)],
        description: 'Строка с описанием',
        photos: images[getRandomNumber(images.length)],
      },

      location: {
        x: getRandomNumber(500),
        y: getRandomRangeValue(130, 630)
      }
    };

    newArr.push(item);
  }
  return newArr;
};

var elements = getItem(listAvatars, listTitles, listTypes, listTime, listFeatures, listPhotos);

map.classList.remove('map--faded');

var createPin = function (value) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = value.location.x + 'px';
  pin.style.top = value.location.y + 'px';
  pin.querySelector('img').src = value.author.avatar;
  pin.content.querySelector('img').alt = value.offer.title;
  return pin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < elements.length; i++) {
  fragment.appendChild(createPin(elements[i]));
}
pinMap.appendChild(fragment);

