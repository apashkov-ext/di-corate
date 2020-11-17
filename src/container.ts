import { Type } from './types/type';

const bindings = new Map<string, Type>();

export function bind(type: string, implementation: Type) { 
    bindings.set(type, implementation);
}

export function resolveType(type: string): Type {
    const b = bindings.get(type);
    if (!b) {
        throw new Error(`Dependency injector: Implementation for type [${type}] is not registered`);
    }
    return b;
}