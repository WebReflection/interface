/*! Copyright (c) 2017, Andrea Giammarchi, @WebReflection */
(function (F, O, R) {'use strict';

  if ('implements' in F) return;

  var
    dPs = O.defineProperties,
    gOPDs = O.getOwnPropertyDescriptors,
    ownKeys = R.ownKeys
  ;

// ES5 patch
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

  function Interface() {}
  Interface.prototype = O.create(null);

  function augmentFunction(target, implementable) {
    var descriptors = gOPDs(implementable);
    if (typeof implementable === 'function') {
      delete descriptors.prototype;
      dPs(target, descriptors);
      dPs(target.prototype, gOPDs(implementable.prototype));
    } else {
      augmentObject(target.prototype, implementable, descriptors);
    }
  }

  function augmentObject(target, implementable) {
    if (implementable instanceof Interface) {
      dPs(target, gOPDs(implementable));
    } else {
      for (var
        descriptors = gOPDs(implementable),
        keys = ownKeys(descriptors),
        i = 0, length = keys.length; i < length; i++
      ) {
        descriptors[keys[i]].enumerable = false;
      }
      dPs(target, descriptors);
    }
  }

  function classInterface() {
    for (var
      iFace = Class(Interface),
      i = 0, length = arguments.length; i < length;
      augmentFunction(iFace, arguments[i++])
    );
    return iFace;
  }

  function objectInterface() {
    for (var
      iFace = new Interface,
      i = 0, length = arguments.length; i < length;
      augmentObject(iFace, arguments[i++])
    );
    return iFace;
  }

  O.defineProperty(
    F, 'implements',
    {
      configurable: true,
        value: function () {
          for (var
            isObject = this === O,
            target = isObject ? {} : Class(this),
            descriptors = isObject ? target : target.prototype,
            i = 0, l = arguments.length; i < l; i++
          ) {
            dPs(descriptors, gOPDs(arguments[i]));
          }
          return target;
      }
    }
  );

  O.defineProperty(
    F, 'interface',
    {
      configurable: true,
      value: function () {
        return typeof arguments[arguments.length - 1] === 'function' ?
          classInterface.apply(this, arguments) :
          objectInterface.apply(this, arguments);
      }
    }
  );

}(Function.prototype, Object, Reflect));
