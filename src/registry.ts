import { Type } from './types/type';
import { DefaultInjectionOptions } from './types/default-injection-options';
import { InjectionOptions } from './types/injection-options';
import { TypeInfo } from './types/type-info';
import { InjectableType } from './types/injectable-type';

export class Registry {
    private readonly registry = new Map<Type, TypeInfo>();

    register(type: Type, options: Partial<InjectionOptions>) {
        if (!this.registry.has(type)) {
            this.registry.set(type, { 
                dependencies: [], 
                scope: this.applyOptions(options).scope
            });
        }
    }

    addDependency(type: Type, dep: InjectableType, index: number) {
        const info = this.registry.get(type) || { dependencies: [], scope: this.applyOptions({}).scope };
        const d = info.dependencies.find(f => f.type === dep);

        if (d && d.index === undefined) {
            d.index = index;
        } else {
            info.dependencies.push({ type: dep, index });
        }

        this.registry.set(type, info);
    }

    getTypeInfo(target: Type): TypeInfo {
        return this.registry.get(target);
    }

    has(t: Type): boolean {
        return this.registry.has(t);
    }

    private applyOptions(opt: Partial<InjectionOptions>): InjectionOptions {
        return Object.assign(new DefaultInjectionOptions(), opt);
    }
}
