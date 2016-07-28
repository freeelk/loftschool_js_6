'use strict';

/*
 Дз 2:
 Создать страницу с кнопкой. При клике на кнопку, на странице должен создаваться div произвольных размеров,
 в произвольном месте.
 Цвет фона div'а должен быть каждый раз случайным.
 Созданные div'ы можно перетаскивать мышкой (drag & drop)
 */

var dragObject = null;

var createDivBtn = document.getElementById('create-div-btn');

createDivBtn.addEventListener('click', function () {

    var MIN_WIDTH = 10;
    var MAX_WIDTH = 200;
    var MIN_HEIGHT = 10;
    var MAX_HEIGHT = 200;

    var height = getRandomInt(MIN_HEIGHT, MAX_HEIGHT);
    var width = getRandomInt(MIN_WIDTH, MAX_WIDTH);

    var top = getRandomInt(0, document.documentElement.clientHeight - height);
    var left = getRandomInt(0, document.documentElement.clientWidth - width);

    var backgroundColor = getRandomColor();

    var div = getDiv(width, height, top, left, backgroundColor);
    document.body.appendChild(div);

    function getDiv(width, height, top, left, backgroundColor) {
        var div = document.createElement('div');
        div.style.background = backgroundColor;
        div.style.position = 'absolute';
        div.style.width = width + 'px';
        div.style.height = height + 'px';
        div.style.top = top + 'px';
        div.style.left = left + 'px';
        return div;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
        //генерация hex-кода вида #000000-#FFFFFF		}
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
    }
});

document.addEventListener('mousedown', function (e) {
    if (e.which !== 1 || e.target.tagName !== 'DIV') {
        return;
    }

    dragObject = e.target;
    dragObject.oldX = e.pageX;
    dragObject.oldY = e.pageY;
});

document.addEventListener('mousemove', function (e) {
    if (!dragObject) {
        return;
    }

    var shiftX = dragObject.oldX - e.pageX;
    var shiftY = dragObject.oldY - e.pageY;

    dragObject.oldX = e.pageX;
    dragObject.oldY = e.pageY;

    var left = parseInt(dragObject.style.left, 10) - shiftX;
    var top = parseInt(dragObject.style.top, 10) - shiftY;

    var width = parseInt(dragObject.style.width, 10);
    var height = parseInt(dragObject.style.height, 10);

    var clientWidth = parseInt(document.documentElement.clientWidth, 10);
    var clientHeight = parseInt(document.documentElement.clientHeight, 10);

    left = left < 0 ? 0 : left + width > clientWidth ? clientWidth - width : left;
    top = top < 0 ? 0 : top + height > clientHeight ? clientHeight - height : top;

    dragObject.style.left = left + 'px';
    dragObject.style.top = top + 'px';
});

document.addEventListener('mouseup', function () {
    dragObject = null;
});