import { addDependency, Constructor } from '../registry'

/**
 * Injects instance into the constructor argument.
 * @param c Type of required instance.
 */
export default function Inject(c: Constructor): ParameterDecorator {
  return (target, key, index) => {     
    if (typeof target === 'function') {
      addDependency(target, c, index);
    }
  };
}
