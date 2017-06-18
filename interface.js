/*! Copyright (c) 2017, Andrea Giammarchi, @WebReflection */
var Interface = (function (O) {'use strict';

  var
    dPs = O.defineProperties,
    gOPDs = O.getOwnPropertyDescriptors,
    ownKeys = Reflect.ownKeys
  ;

  function Interface() {}
  Interface.prototype = O.create(null);

  function getTarget(any) {
    return typeof any === 'function' ? any.prototype : any;
  }

  function inspectInterface() {
    for (var
      target = {},
      descriptors = {},
      i = 0, length = arguments.length; i < length; i++
    ) {
      dPs(target, gOPDs(arguments[i]));
    }
    descriptors = gOPDs(target);
    return {
      implementedVia: function (any) {
        for (var
          key,
          itIs = true,
          sameValue = function (key) {
            return this[key] === descriptor[key];
          },
          source = gOPDs(getTarget(any)),
          keys = ownKeys(descriptors),
          i = 0, length = keys.length;
          itIs && i < length; i++
        ) {
          key = keys[i];
          descriptor = descriptors[key];
          itIs = ownKeys(descriptor).every(sameValue, source[key]);
        }
        return itIs;
      },
      via: function (any) {
        dPs(getTarget(any), descriptors);
        return any;
      }
    };
  }

  return (function (Super) {
    function Interface() {
      return (
        arguments[arguments.length - 1] instanceof Super ?
          inspectInterface :
          Interface.create
      ).apply(null, arguments);
    };
    Interface.prototype = Super.prototype;
    Interface.create = function create() {
      for (var
        descriptors, implemented,
        iFace = new Super,
        i = 0, length = arguments.length; i < length; i++
      ) {
        implemented = arguments[i];
        descriptors = gOPDs(implemented);
        if (implemented instanceof Super) {
          dPs(iFace, descriptors);
        } else {
          for (var
            keys = Reflect.ownKeys(descriptors),
            j = 0, len = keys.length; j < len; j++
          ) {
            descriptors[keys[j]].enumerable = false;
          }
          dPs(iFace, descriptors);
        }
      }
      return iFace;
    };
    return Interface;
  }(Interface));

}(Object));

try { module.exports = Interface; } catch(o_O) {}
