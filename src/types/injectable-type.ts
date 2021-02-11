import { AbstractType } from './abstract-type';
import { Type } from './type';

export type InjectableType<T = any> = Type<T> | AbstractType<T>;