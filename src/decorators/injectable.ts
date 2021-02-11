import { DependencyRegistry, DependencyResolver } from '../startup';
import { Type } from '../types/type';
import { InjectionOptions } from '../types/injection-options';
import { Literals } from '../literals';

/**
 * Makes the class providable and available for injection.
 * @param options Injection options.
 */
export function Injectable(options?: Partial<InjectionOptions>) {
    return (target: Type) => {
        const original = target;
        const f: any = function (...args: any[]) {
            return DependencyResolver.resolve(original);
        };

        Object.defineProperty(f, Literals.WrapperObject, { value: undefined });
        f.prototype = original.prototype;

        DependencyRegistry.register(original as any, options);
        DependencyRegistry.register(f as any, options);
        return f;
    };
}
