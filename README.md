# triangulation

## Credit:

@zessx <http://codepen.io/zessx>

## Based on:

<http://codepen.io/zessx/pen/ZGBMXZ>

## install

```bash
npm install triangulation --save
```

## usage

```javascript
import triangulation from 'triangulation';
// OR
const triangulation = require('triangulation');

// Element in the DOM
const element = document.getElementById('triangulation');
triangulation(element);

```

## options

speed (Integer):

- 0 -> inf

easing (String):

- easeOutSine
- easeInOutSine
- easeInOutQuint

to (Integer | Element):

- DOM Element
- Integer
