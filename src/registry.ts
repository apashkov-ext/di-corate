import { PositionalArgument, Constructor } from './types';

/**
 * Contains registered injectable types and its dependencies.
 */
const registry = new Map<Function, PositionalArgument[]>();
/**
 * Stores instances of resolved dependencies.
 */
const instances = new WeakMap<Constructor, any>();

export function register(constructor: Function) {
    if (!registry.has(constructor)) {
        registry.set(constructor, []);
    }
}

export function addDependency(target: Function, dep: Constructor, index: number) {
    const deps = registry.get(target) || [];
    const d = deps.find(f => f.constructor === dep);

    if (d) {
        d.index = index;
    } else {
        deps.push({ constructor: dep, index });
    }

    registry.set(target, deps);
}

export function get(constructor: Constructor): any {
    if (instances.has(constructor)) {
        return instances.get(constructor);
    }

    const dependencies = registry.get(constructor);
    if (!dependencies) {
        throw new Error(`Dependency injector: Type [${constructor.name}] is not registered`);
    }

    let instance = null;

    if (!dependencies.length) {
        instance = new constructor();
        instances.set(constructor, instance)
    } else {
        const args = Array.from(dependencies).sort((left, right) => left.index - right.index).map(m => get(m.constructor))
        instance = new constructor(...args);
    }

    return instance;
}
