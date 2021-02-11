import { Providers } from './providers';
import { Type } from './types/type';

export class Container {
    constructor(private readonly providers: Providers) {}

    provide(type: Type): void;
    provide(type: Type, useClass: Type): void;
    provide(type: Type, useClass?: Type): void {
        this.providers.provide(type, useClass);
    }
}