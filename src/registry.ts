/**
 * Contains registered injectable types and its dependencies.
 */
const registry = new Map<Function, ExtendedSet<PositionalArgument>>();
/**
 * Stores instances of resolved dependencies.
 */
const instances = new WeakMap<Constructor, any>();

class ExtendedSet<T> extends Set<T> {
    constructor(iterable?: Iterable<T>) {
        super(iterable)
    }

    find(predicate: (current: T) => boolean): T | undefined {
        for(let value of this) {
            if (predicate(value)) {
                return value;
            }
        }
        return undefined;
    }
}

interface PositionalArgument {
    constructor: Constructor;
    index: number;
}

export type Constructor = { new (...args: any[]): any }

export function register(constructor: Function) {
    if (!registry.has(constructor)) {
        throw new Error(`Dependency injector: type ${constructor.name} already registered`);
    }
}

export function addDependency(target: Function, dep: Constructor, index: number) {
    const deps = registry.get(target) || new ExtendedSet();
    const d = deps.find(f => f.constructor === dep);

    if (d) {
        d.index = index;
    } else if (!hasCircularDependency(target, dep)) {
        deps.add({ constructor: dep, index });
    } else {
        throw new Error(`Dependency injector: circular dependency detected (${dep.name} <-> ${target.name})`);
    }

    registry.set(target, deps);
}

export function get(constructor: Constructor): any {
    if (instances.has(constructor)) {
        return instances.get(constructor);
    }

    const dependencies = registry.get(constructor);
    if (!dependencies) {
        throw new Error(`Dependency injector: type ${constructor.name} is not registered`);
    }

    let instance = null;

    if (!dependencies.size) {
        instance = new constructor();
        instances.set(constructor, instance)
    } else {
        const args = Array.from(dependencies).sort((left, right) => left.index - right.index).map(m => get(m.constructor))
        instance = new constructor(...args);
    }

    return instance;
}

function hasCircularDependency(constructor: Function, dep: Constructor): boolean {
    return Boolean(registry.get(dep)?.find(f => f.constructor === constructor));
}

// function hasCDep(): boolean {
//     const arr = Array.from(registry);
    

    
// }

// function hasCycle(v: number, p: number): boolean {
//     const used = new Map<Function, boolean>();
//     for (let w = 0; w < arr.length; w++) {
//         for (let)
//     }
// }