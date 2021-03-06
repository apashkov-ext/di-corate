import { DependencyRegistry, DependencyResolver } from '../startup';
import { InjectableType } from '../types/injectable-type';

/**
 * Injects instance into the constructor argument or into the class property.
 * In parameter inject case all providers have been instantiated during its class instantiation.
 * In property inject case all providers have been instantiated 'by demand'. 
 * @param type Provider type.
 */
export function Inject(type: InjectableType) {
  return (target: any, key: string | symbol, index?: number) => {
    if (type === undefined) {
      throw new Error(`Dependency injector: Type is undefined or circular dependency detected in type [${target.name}]`);
    }
    if (index !== undefined) {
      DependencyRegistry.addDependency(target, type, index);
      return;
    }

    const k = Symbol(key.toString());

    Object.defineProperty(target, k, {
      value: undefined,
      writable: true
    });

    Object.defineProperty(target, key, {
      get: function () {
        let instance = this[k];
        if (!instance) {
          instance = DependencyResolver.resolve(type);
          this[k] = instance;
        }
        return instance;
      },
      enumerable: true
    });
  };
}