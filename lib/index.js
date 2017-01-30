const { createAnimate, createPoints } = require('./utils');

var refreshDuration = 10000;
var refreshTimeout;
var id;

function setPoints(topLeftX, topLeftY, bottomLeftX, bottomLeftY, bottomRightX, bottomRightY) {
  return `${topLeftX},${topLeftY} ${bottomLeftX},${bottomLeftY} ${bottomRightX},${bottomRightY}`
}

class Triangulation {

  constructor(id) {
    this.element = document.getElementById(id);
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', window.innerWidth);
    this.svg.setAttribute('height', window.innerHeight);
    this.element.appendChild(this.svg);
    this.calculateDims();
    this.genarate();

  }
  calculateDims() {
    const { width, height } = this.element.getBoundingClientRect();
    this.unitSize = (width + height) / 20;

    this.numPointsX = Math.ceil(width / this.unitSize) + 1;
    this.numPointsY = Math.ceil(height / this.unitSize) + 1;
    this.unitWidth = Math.ceil(width / (this.numPointsX - 1));
    this.unitHeight = Math.ceil(height / (this.numPointsY - 1));
    this.points = createPoints(this.numPointsX, this.numPointsY, this.unitHeight, this.unitWidth);

  }
  genarate() {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].originX != this.unitWidth * (this.numPointsX - 1) && this.points[i].originY !=
        this.unitHeight * (
          this.numPointsY - 1)) {
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
              polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' +
                bottomLeftY + ' ' + bottomRightX + ',' + bottomRightY);
            } else if (n == 1) {
              polygon.point1 = i;
              polygon.point2 = i + 1;
              polygon.point3 = i + this.numPointsX + 1;
              polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + topRightX + ',' +
                topRightY + ' ' + bottomRightX + ',' + bottomRightY);
            }
          } else if (rando == 1) {
            if (n == 0) {
              polygon.point1 = i;
              polygon.point2 = i + this.numPointsX;
              polygon.point3 = i + 1;
              polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' +
                bottomLeftY + ' ' + topRightX + ',' + topRightY);
            } else if (n == 1) {
              polygon.point1 = i + this.numPointsX;
              polygon.point2 = i + 1;
              polygon.point3 = i + this.numPointsX + 1;
              polygon.setAttribute('points', bottomLeftX + ',' + bottomLeftY + ' ' + topRightX +
                ',' +
                topRightY + ' ' + bottomRightX + ',' + bottomRightY);
            }
          }
          polygon.setAttribute('fill', 'rgba(0,0,0,' + (Math.random() / 3) + ')');
          polygon.appendChild(createAnimate(refreshDuration));
          this.svg.appendChild(polygon);
        }
      }
    }
  }
  randomize() {
    for (var i = 0; i < this.points.length; i++) {
      if (this.points[i].originX != 0 && this.points[i].originX != this.unitWidth * (this.numPointsX -
          1)) {
        this.points[i].x = this.points[i].originX + Math.random() * this.unitWidth - this.unitWidth /
          2;
      }
      if (this.points[i].originY != 0 && this.points[i].originY != this.unitHeight * (this.numPointsY -
          1)) {
        this.points[i].y = this.points[i].originY + Math.random() * this.unitHeight - this.unitHeight /
          2;
      }
    }
  }
  refresh() {
    this.randomize();
    for (var i = 0; i < this.svg.childNodes.length; i++) {
      var polygon = this.svg.childNodes[i];
      var animate = polygon.childNodes[0];
      if (animate.getAttribute('to')) {
        animate.setAttribute('from', animate.getAttribute('to'));
      }
      animate.setAttribute('to', this.points[polygon.point1].x + ',' + this.points[polygon.point1]
        .y + ' ' +
        this.points[polygon.point2].x + ',' + this.points[polygon.point2].y + ' ' + this.points[
          polygon.point3]
        .x +
        ',' + this.points[polygon.point3].y);
      animate.beginElement();
    }
    refreshTimeout = setTimeout(() => { this.refresh(); }, refreshDuration);
  }
}

module.exports = Triangulation;
