import { InjectionOptions } from './injection-options';
import { InjectionScopeEnum } from './injection-scope.enum';

export class DefaultInjectionOptions implements InjectionOptions {
    injectionScope = InjectionScopeEnum.Singletone;
    multi = false;
}