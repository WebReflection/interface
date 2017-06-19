// this is an overly simplified approach
// if you need fully compatible extend
// use the non ES5 version and transpile it
function Class(Super) {
  function Interface() {
    return O.setPrototypeOf(
      Super.apply(this, arguments) || this,
      Interface.prototype
    );
  }
  O.setPrototypeOf(Interface.prototype, Super.prototype);
  return O.setPrototypeOf(Interface, Super);
}

const fs = require('fs');
fs.writeFileSync(
  'interface.es5.js',
  fs.readFileSync('interface.js').toString()
    .replace(/class\s+extends\s+(\S+)\s+\{\s*\}/g, 'Class($1)')
    .replace(
      /(\s+function Interface)/,
      '\n\n// ES5 patch\n' + Class + '$1'
    )
);