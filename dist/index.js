'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./utils'),
    createAnimate = _require.createAnimate,
    createPoints = _require.createPoints;

var refreshDuration = 10000;
var refreshTimeout;
var id;

function setPoints(topLeftX, topLeftY, bottomLeftX, bottomLeftY, bottomRightX, bottomRightY) {
  return topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' + bottomLeftY + ' ' + bottomRightX + ',' + bottomRightY;
}

var Triangulation = function () {
  function Triangulation(id) {
    _classCallCheck(this, Triangulation);

    this.element = document.getElementById(id);
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', window.innerWidth);
    this.svg.setAttribute('height', window.innerHeight);
    this.element.appendChild(this.svg);
    this.calculateDims();
    this.genarate();
  }

  _createClass(Triangulation, [{
    key: 'calculateDims',
    value: function calculateDims() {
      var _element$getBoundingC = this.element.getBoundingClientRect(),
          width = _element$getBoundingC.width,
          height = _element$getBoundingC.height;

      this.unitSize = (width + height) / 20;

      this.numPointsX = Math.ceil(width / this.unitSize) + 1;
      this.numPointsY = Math.ceil(height / this.unitSize) + 1;
      this.unitWidth = Math.ceil(width / (this.numPointsX - 1));
      this.unitHeight = Math.ceil(height / (this.numPointsY - 1));
      this.points = createPoints(this.numPointsX, this.numPointsY, this.unitHeight, this.unitWidth);
    }
  }, {
    key: 'genarate',
    value: function genarate() {
      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].originX != this.unitWidth * (this.numPointsX - 1) && this.points[i].originY != this.unitHeight * (this.numPointsY - 1)) {
          var topLeftX = this.points[i].x;
          var topLeftY = this.points[i].y;
          var topRightX = this.points[i + 1].x;
          var topRightY = this.points[i + 1].y;
          var bottomLeftX = this.points[i + this.numPointsX].x;
          var bottomLeftY = this.points[i + this.numPointsX].y;
          var bottomRightX = this.points[i + this.numPointsX + 1].x;
          var bottomRightY = this.points[i + this.numPointsX + 1].y;

          var rando = Math.floor(Math.random() * 2);

          for (var n = 0; n < 2; n++) {
            var polygon = document.createElementNS(this.svg.namespaceURI, 'polygon');

            if (rando == 0) {
              if (n == 0) {
                polygon.point1 = i;
                polygon.point2 = i + this.numPointsX;
                polygon.point3 = i + this.numPointsX + 1;
                polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' + bottomLeftY + ' ' + bottomRightX + ',' + bottomRightY);
              } else if (n == 1) {
                polygon.point1 = i;
                polygon.point2 = i + 1;
                polygon.point3 = i + this.numPointsX + 1;
                polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + topRightX + ',' + topRightY + ' ' + bottomRightX + ',' + bottomRightY);
              }
            } else if (rando == 1) {
              if (n == 0) {
                polygon.point1 = i;
                polygon.point2 = i + this.numPointsX;
                polygon.point3 = i + 1;
                polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' + bottomLeftY + ' ' + topRightX + ',' + topRightY);
              } else if (n == 1) {
                polygon.point1 = i + this.numPointsX;
                polygon.point2 = i + 1;
                polygon.point3 = i + this.numPointsX + 1;
                polygon.setAttribute('points', bottomLeftX + ',' + bottomLeftY + ' ' + topRightX + ',' + topRightY + ' ' + bottomRightX + ',' + bottomRightY);
              }
            }
            polygon.setAttribute('fill', 'rgba(0,0,0,' + Math.random() / 3 + ')');
            polygon.appendChild(createAnimate(refreshDuration));
            this.svg.appendChild(polygon);
          }
        }
      }
    }
  }, {
    key: 'randomize',
    value: function randomize() {
      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].originX != 0 && this.points[i].originX != this.unitWidth * (this.numPointsX - 1)) {
          this.points[i].x = this.points[i].originX + Math.random() * this.unitWidth - this.unitWidth / 2;
        }
        if (this.points[i].originY != 0 && this.points[i].originY != this.unitHeight * (this.numPointsY - 1)) {
          this.points[i].y = this.points[i].originY + Math.random() * this.unitHeight - this.unitHeight / 2;
        }
      }
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var _this = this;

      this.randomize();
      for (var i = 0; i < this.svg.childNodes.length; i++) {
        var polygon = this.svg.childNodes[i];
        var animate = polygon.childNodes[0];
        if (animate.getAttribute('to')) {
          animate.setAttribute('from', animate.getAttribute('to'));
        }
        animate.setAttribute('to', this.points[polygon.point1].x + ',' + this.points[polygon.point1].y + ' ' + this.points[polygon.point2].x + ',' + this.points[polygon.point2].y + ' ' + this.points[polygon.point3].x + ',' + this.points[polygon.point3].y);
        animate.beginElement();
      }
      refreshTimeout = setTimeout(function () {
        _this.refresh();
      }, refreshDuration);
    }
  }]);

  return Triangulation;
}();

module.exports = Triangulation;