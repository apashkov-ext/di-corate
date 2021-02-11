import { DependencyProviders } from './startup';

export * from './decorators/injectable';
export * from './decorators/inject';
export * from './types/type';
export * from './types/injectable-type';
export * from './types/injection-options';
export * from './types/injection-scope.enum';

export const provide = DependencyProviders.provide;
