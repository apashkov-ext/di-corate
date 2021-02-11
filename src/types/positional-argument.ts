import { InjectableType } from './injectable-type';

export interface PositionalArgument {
    type: InjectableType;
    index?: number;
}
