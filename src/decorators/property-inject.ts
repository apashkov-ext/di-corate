import { Constructor, get } from '../registry'

/**
 * Injects instance into the property.
 * @param c Type of required instance.
 */
export function Inject(c: Constructor): PropertyDecorator {
  return (target, key) => {    
    if (typeof target !== 'function') {
      Object.defineProperty(target, key, {
        get: function () { return get(c); },
        enumerable: true,
        configurable: false
      });
    } 
  };
}
