import { Container } from './container';
import { DependencyResolver } from './dependency-resolver';
import { Providers } from './providers';
import { Registry } from './registry';

const registry = new Registry();
const providers = new Providers()
const resolver = new DependencyResolver(registry, providers);
const container = new Container(providers);

export { 
    resolver as DependencyResolver, 
    registry as DependencyRegistry,
    container as DependencyContainer,
    providers as DependencyProviders
}