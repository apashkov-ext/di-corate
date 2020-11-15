import { addDependency } from '../registry'
import { Constructor } from '../types';

/**
 * Injects instance into the constructor argument.
 * @param c Type of required instance.
 */
export function Inject(c: Constructor): ParameterDecorator {
  return (target, key, index) => {  
    if (typeof target === 'function') {
      if (c === undefined) {
        throw new Error(`Dependency injector: Type is undefined or circular dependency detected in type [${target.name}]`);
      }   
      addDependency(target, c, index);
    }
  };
}
