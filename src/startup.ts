import { Container } from './container';
import { DependencyResolver, Instances } from './dependency-resolver';
import { Providers } from './providers';
import { Registry } from './registry';

const registry = new Registry();
const providers = new Providers()
const instances = new Instances();
const resolver = new DependencyResolver(registry, providers, instances);
const container = new Container(providers);

export { 
    resolver as DependencyResolver, 
    registry as DependencyRegistry,
    container as DependencyContainer,
    providers as DependencyProviders
}