const createAnimate = (refreshDuration) => {
  const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  animate.setAttribute('fill', 'freeze');
  animate.setAttribute('attributeName', 'points');
  animate.setAttribute('dur', refreshDuration + 'ms');
  animate.setAttribute('calcMode', 'linear');
  return animate;
};
const createPoints = (numPointsX, numPointsY, unitHeight, unitWidth) => {
  let points = [];

  for (let y = 0; y < numPointsY; y++) {
    for (let x = 0; x < numPointsX; x++) {
      points.push({
        x: unitWidth * x,
        y: unitHeight * y,
        originX: unitWidth * x,
        originY: unitHeight * y
      });
    }
  }
  return points;
};

module.exports = {
  createAnimate,
  createPoints
};
