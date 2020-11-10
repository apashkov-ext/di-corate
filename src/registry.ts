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

export interface CyclicalDependency<T> {
    firstNode: T;
    lastNode: T;
    nodes: T[];
}

export class DependenciesAnalyzer<T> {
    private readonly used = new Map<T, number>();
    private readonly _parents = new Map<T, T | undefined>();
    private _isCyclical = false;

    get isCyclical(): boolean {
        return this._isCyclical;
    }

    get parents() {
        return this._parents;
    }

    constructor(private readonly adjacencyList: Map<T, T[]>) {
        this.analyze();
    }

    private analyze() {
        this.parents.set(Array.from(this.adjacencyList)[0][0], undefined);
        for (let v of this.adjacencyList) {
            if (this.dfs(v[0])) {
                this._isCyclical = true;
                break;
            }
        }
    }

    private dfs(v: T): boolean {
        this.used.set(v, 1);
        for (let w of this.adjacencyList.get(v) || []) {
            if (!this.used.has(w)) {
                this._parents.set(w, v);
                if (this.dfs(w)) {
                    return true;
                }
            } else if (this.used.get(w) === 1) {
                return true;
            }
        }
        this.used.set(v, 2);
        
        return false;
    }

}