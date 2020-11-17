import { bind, resolveType } from './container';
import { PositionalArgument } from './types/positional-argument';
import { Token } from './types/token';
import { Type } from './types/type';

const registry = new Map<Token, PositionalArgument[]>();
const instances = new Map<Token, any>();

export function register(constructor: any) {
    if (!registry.has(constructor)) {
        registry.set(constructor, []);
    }
}

export function addDependency(target: Token, dep: Token, index: number) {
    const deps = registry.get(target) || [];
    const d = deps.find(f => f.constructor === dep);

    if (d) {
        d.index = index;
    } else {
        deps.push({ constructor: dep, index });
    }

    registry.set(target, deps);
}

export function get(token: Token): any {
    if (instances.has(token)) {
        return instances.get(token);
    }

    const dependencies = registry.get(token);
    if (!dependencies) {
        throw new Error(`Dependency injector: Type [${typeof token === 'function' ? token.name : token}] is not registered`);
    }

    let instance = null;
    const ctor = getConstructor(token);

    if (!dependencies.length) {
        instance = new ctor();
        instances.set(token, instance)
    } else {
        const args = Array.from(dependencies).sort((left, right) => left.index - right.index).map(m => get(m.constructor))
        instance = new ctor(...args);
    }

    return instance;
}

function getConstructor(token: Token): Type {
    return typeof token === 'function' ? token : resolveType(token);
}

export function addSingletone(type: string, implementation: Type): void {
    bind(type, implementation);
    register(implementation);
}

export function has(t: Token): boolean {
    return registry.has(t);
}