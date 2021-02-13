import { InjectionOptions } from './injection-options';
import { InjectionScopeEnum } from './injection-scope.enum';

export class DefaultInjectionOptions implements InjectionOptions {
    scope = InjectionScopeEnum.Singletone;
    multi = false;
}