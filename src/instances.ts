import { Type } from './types/type';

export class Instances {
    private readonly instances = new Map<Type, any>();

    addInstance(type: Type, ins: any) {
        this.instances.set(type, ins);
    }

    getInstance(type: Type): any {
        return this.instances.get(type);
    }
}