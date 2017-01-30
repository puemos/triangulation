const { createAnimate, createPoints } = require('./utils');

class Triangulation {

  constructor(id) {
    this.element = document.getElementById(id);
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', window.innerWidth);
    this.svg.setAttribute('height', window.innerHeight);
    this.element.appendChild(this.svg);
    this.refreshDuration = 10000;
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
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i].originX != this.unitWidth * (this.numPointsX - 1) && this.points[i].originY !=
        this.unitHeight * (
          this.numPointsY - 1)) {
        let topLeftX = this.points[i].x;
        let topLeftY = this.points[i].y;
        let topRightX = this.points[i + 1].x;
        let topRightY = this.points[i + 1].y;
        let bottomLeftX = this.points[i + this.numPointsX].x;
        let bottomLeftY = this.points[i + this.numPointsX].y;
        let bottomRightX = this.points[i + this.numPointsX + 1].x;
        let bottomRightY = this.points[i + this.numPointsX + 1].y;

        var rando = Math.floor(Math.random() * 2);

        for (let n = 0; n < 2; n++) {
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
          polygon.appendChild(createAnimate(this.refreshDuration));
          this.svg.appendChild(polygon);
        }
      }
    }
  }
  randomize() {
    for (let i = 0; i < this.points.length; i++) {
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
  animate() {
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
    this.refreshTimeout = setTimeout(() => { this.refresh(); }, this.refreshDuration);
  }
}

module.exports = Triangulation;
