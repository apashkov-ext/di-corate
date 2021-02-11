import { PositionalArgument } from './types/positional-argument';
import { Type } from './types/type';
import { Registry } from './registry';
import { InjectionScopeEnum } from './types/injection-scope.enum';
import { Providers } from './providers';
import { InjectableType } from './types/injectable-type';
import { Literals } from './literals';
import { DependencyNotRegisteredException } from './types/dependency-not-registered-exception';

export class Instances {
    private readonly instances = new Map<Type, any>();

    addInstance(type: Type, ins: any) {
        this.instances.set(type, ins);
    }

    getInstance(type: Type): any {
        return this.instances.get(type);
    }
}

export class DependencyResolver {
    constructor(
        private readonly registry: Registry, 
        private readonly providers: Providers,
        private readonly instances: Instances
        ) {}
    
    resolve(type: InjectableType): any {
        const providedType = (this.providers.getProvider(type) || type) as Type;
        const info = this.registry.getTypeInfo(providedType);
        
        if (!info) {
            const ctor = this.getOriginalConstructor(providedType);
            throw new DependencyNotRegisteredException(ctor.name);
        }

        switch (info.injectionScope) {
            case InjectionScopeEnum.Transient: return this.instantiate(providedType, info.dependencies)
            default: return this.createAndGetSingletone(providedType, info.dependencies);
        }
    }

    private createAndGetSingletone(type: Type, deps: PositionalArgument[]): any {
        let instance = this.instances.getInstance(type);

        if (!instance) {
            instance = this.instantiate(type, deps);
            this.instances.addInstance(type, instance);
        }

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

