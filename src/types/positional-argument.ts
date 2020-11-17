import { Token } from './token';

export interface PositionalArgument {
    constructor: Token;
    index: number;
}
