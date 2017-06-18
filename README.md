# interface
Simple interfaces for modern JavaScript.

```js
const Interface = require('@webreflection/interface');

// a generic interface can define anything shareable
// Interface.create(One, OrMore, Interface, {literal: 'definition'})
// You can define via Interface(...) directly too
const EventListener = Interface({
  handleEvent(e) { this['on' + e.type](e); }
});

// a simple clicker class
class Clicker {
  constructor() { this.clicks = 0; }
  onclick(e) { e.preventDefault(); this.clicks++; }
}

// a BasicClicker that extends Clicker and implements EventListener
class BasicClicker extends Interface(EventListener).via(Clicker) {
  constructor(node) {
    super();
    node.addEventListener('click', this);
  }
}

```