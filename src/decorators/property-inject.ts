import { get } from '../registry'
import { Constructor } from '../types';

/**
 * Injects instance into the property.
 * @param c Type of required instance.
 */
export function PropInject(c: Constructor): PropertyDecorator {
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
