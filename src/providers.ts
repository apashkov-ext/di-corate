import { InjectableType } from './types/injectable-type';
import { Type } from './types/type';

export class Providers {
    private readonly providers = new Map<InjectableType, Type>();

    /**
     * Configures Dependency Resolver to return on instance of `useClass` instead of `type`;
     * @param type Abstract or non abstract class.
     * @param useClass Non abstract class.
     */
    provide(type: InjectableType, useClass: Type) {
        if (!this.providers.has(type)) {
            this.providers.set(type, useClass);
        }
    }

    getProvider(type: InjectableType): Type {
        return this.providers.get(type);
    }
}