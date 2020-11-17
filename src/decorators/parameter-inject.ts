import { addDependency } from '../registry';
import { Token } from '../types/token';

/**
 * Injects instance into the constructor argument.
 * @param c Type of required instance.
 */
export function Inject(c: Token): ParameterDecorator {
  return (target: any, key, index) => {  
    if (c === undefined) {
      throw new Error(`Dependency injector: Type is undefined or circular dependency detected in type [${target.name}]`);
    }   
    addDependency(target, c, index);
  };
}
