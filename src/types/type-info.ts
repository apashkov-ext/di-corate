import { InjectionScopeEnum } from './injection-scope.enum';
import { PositionalArgument } from './positional-argument';

export interface TypeInfo {
    dependencies: PositionalArgument[];
    scope: InjectionScopeEnum;
}