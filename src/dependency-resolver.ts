import { PositionalArgument } from './types/positional-argument';
import { Type } from './types/type';
import { Registry } from './registry';
import { InjectionScopeEnum } from './types/injection-scope.enum';
import { Providers } from './providers';
import { InjectableType } from './types/injectable-type';
import { Literals } from './literals';

export class DependencyResolver {
    private readonly instances = new Map<Type, any>();

    constructor(private readonly registry: Registry, private readonly providers: Providers) {}
    
    resolve(type: InjectableType): any {
        const providedType = (this.providers.getProvider(type) || type) as Type;
        const info = this.registry.getTypeInfo(providedType);
        const ctr = this.getOriginalConstructor(providedType);
        if (!info) {
            throw new Error(`Dependency injector: Type [${type.name}] is not registered`);
        }

        switch (info.injectionScope) {
            case InjectionScopeEnum.Transient: return this.instantiate(providedType, info.dependencies)
            default: return this.createAndGetSingletone(providedType, info.dependencies);
        }
    }

    private createAndGetSingletone(type: Type, deps: PositionalArgument[]): any {
        if (this.instances.has(type)) {
            return this.instances.get(type);
        }

        const instance = this.instantiate(type, deps);
        this.instances.set(type, instance);

        return instance;
    }

    private instantiate(type: Type, dependencies: PositionalArgument[]): any {
        if (!dependencies.length) {
           return new type();
        }
        const args = Array.from(dependencies).sort((left, right) => left.index - right.index).map(m => this.resolve(m.type));
        return new type(...args);  
    }

    private getOriginalConstructor(type: Type): Function {
        if (!Object.getOwnPropertySymbols(type).includes(Literals.WrapperObject)) {
            return type.constructor;
        }
        return this.getOriginalConstructor(type.prototype);
    }
}

