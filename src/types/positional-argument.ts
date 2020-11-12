import { Constructor } from './constructor';

export interface PositionalArgument {
    constructor: Constructor;
    index: number;
}
