# interface
Simple interfaces for modern JavaScript.

```js
require('@webreflection/interface');

// an interface is just an object
// carrying some definition that can be implemented
// through other objects or classes
const EventListener = Object.interface({
  handleEvent(e) { this['on' + e.type](e); }
});

// but it can be defined through a class too
// in such case you can even new EventListener
// or directly extends EventListener
const EventListener = Function.interface(class {
  handleEvent(e) { this['on' + e.type](e); }
});

// a simple clicker class (it could even extends EventListener)
class Clicker {
  constructor() { super(); this.clicks = 0; }
  onclick(e) {
    e.preventDefault();
    console.log(`You clicked me ${++this.clicks} times`);
  }
}

// a BasicClicker that extends Clicker and implements EventListener
class BasicClicker extends Clicker.implements(EventListener) {
  constructor(node) {
    super();
    node.addEventListener('click', this);
  }
}

new BasicClicker(document.documentElement);
```