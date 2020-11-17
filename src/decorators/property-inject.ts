import { get } from '../registry'
import { Token } from '../types/token';

/**
 * Injects instance into the property.
 * @param c Type of required instance.
 */
export function PropInject(c: Token): PropertyDecorator {
  return (target: any, key) => { 
    if (c === undefined) {
      throw new Error(`Dependency injector: Type is undefined or circular dependency detected in type [${target.name}]`);
    }   
    Object.defineProperty(target, key, {
      get: function () { return get(c); },
      enumerable: true,
      configurable: false
    });
  };
}
