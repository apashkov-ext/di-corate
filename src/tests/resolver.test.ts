import 'mocha';
import { expect } from 'chai';
import { DependencyResolver } from '../dependency-resolver';
import { IMock, Mock } from 'typemoq';
import { Registry } from '../registry';
import { TypeInfo } from '../types/type-info';
import { InjectionScopeEnum } from '../types/injection-scope.enum';
import { Providers } from '../providers';
import { DependencyNotRegisteredException } from '../types/dependency-not-registered-exception';
import { Instances } from '../instances';
import { PositionalArgument } from '../types/positional-argument';

describe('dependency resolver', () => {

    describe('resolve registered type', () => {

        it('without custom provider, should returns instance', () => {
            class Service {};
            const info = { scope: InjectionScopeEnum.Singletone, dependencies:[] } as TypeInfo;

            const registryMock: IMock<Registry> = Mock.ofType(Registry);
            registryMock.setup(x => x.getTypeInfo(Service)).returns(() => info);

            const providersMock: IMock<Providers> = Mock.ofType(Providers);
            providersMock.setup(x => x.getProvider(Service)).returns(() => undefined);

            const instancesMock: IMock<Instances> = Mock.ofType(Instances);
            instancesMock.setup(x => x.getInstance(Service)).returns(() => undefined);

            const resolver = new DependencyResolver(registryMock.target, providersMock.target, instancesMock.target);

            expect(resolver.resolve(Service)).instanceOf(Service);
        });

        it('with custom provider, should returns instance', () => {
            abstract class ServiceBase {};
            class Service implements Service {};
            const info = { scope: InjectionScopeEnum.Singletone, dependencies:[] } as TypeInfo;

            const registryMock: IMock<Registry> = Mock.ofType(Registry);
            registryMock.setup(x => x.getTypeInfo(Service)).returns(() => info);

            const providersMock: IMock<Providers> = Mock.ofType(Providers);
            providersMock.setup(x => x.getProvider(ServiceBase)).returns(() => Service);

            const instancesMock: IMock<Instances> = Mock.ofType(Instances);
            instancesMock.setup(x => x.getInstance(Service)).returns(() => undefined);

            const resolver = new DependencyResolver(registryMock.target, providersMock.target, instancesMock.target);

            expect(resolver.resolve(ServiceBase)).instanceOf(Service);
        });

        it('resolve singletone', () => {
            class Service {
                id: string;
            };
            const orig = new Service();
            const info = { scope: InjectionScopeEnum.Singletone, dependencies:[] } as TypeInfo;

            const registryMock: IMock<Registry> = Mock.ofType(Registry);
            registryMock.setup(x => x.getTypeInfo(Service)).returns(() => info);

            const providersMock: IMock<Providers> = Mock.ofType(Providers);
            providersMock.setup(x => x.getProvider(Service)).returns(() => undefined);

            const instancesMock: IMock<Instances> = Mock.ofType(Instances);
            instancesMock.setup(x => x.getInstance(Service)).returns(() => orig);

            const resolver = new DependencyResolver(registryMock.target, providersMock.target, instancesMock.target);

            const inst1 = resolver.resolve(Service);
            const inst2 = resolver.resolve(Service);

            expect(inst1).eq(inst2).eq(orig);
        });

        it('resolve transient', () => {
            class Service {
                id: string;
            };
            const orig = new Service();
            const info = { scope: InjectionScopeEnum.Transient, dependencies:[] } as TypeInfo;

            const registryMock: IMock<Registry> = Mock.ofType(Registry);
            registryMock.setup(x => x.getTypeInfo(Service)).returns(() => info);

            const providersMock: IMock<Providers> = Mock.ofType(Providers);
            providersMock.setup(x => x.getProvider(Service)).returns(() => undefined);

            const instancesMock: IMock<Instances> = Mock.ofType(Instances);
            instancesMock.setup(x => x.getInstance(Service)).returns(() => orig);

            const resolver = new DependencyResolver(registryMock.target, providersMock.target, instancesMock.target);

            const inst1 = resolver.resolve(Service);
            const inst2 = resolver.resolve(Service);

            expect(inst1).not.eq(inst2).not.eq(orig);
        });

        it('resolve with dependencies', () => {
            class Dependency {}
            class Service {
                dep: Dependency;
                constructor(dep: Dependency) {
                    this.dep = dep;
                }
            };

            const depInfo = { 
                scope: InjectionScopeEnum.Transient, 
                dependencies: [] 
            } as TypeInfo;

            const serviceInfo = { 
                scope: InjectionScopeEnum.Transient, 
                dependencies: [ { type: Dependency, index: 0 } as PositionalArgument ] 
            } as TypeInfo;

            const registryMock: IMock<Registry> = Mock.ofType(Registry);
            registryMock.setup(x => x.getTypeInfo(Service)).returns(() => serviceInfo);
            registryMock.setup(x => x.getTypeInfo(Dependency)).returns(() => depInfo);

            const providersMock: IMock<Providers> = Mock.ofType(Providers);
            providersMock.setup(x => x.getProvider(Service)).returns(() => undefined);

            const instancesMock: IMock<Instances> = Mock.ofType(Instances);
            instancesMock.setup(x => x.getInstance(Service)).returns(() => undefined);

            const resolver = new DependencyResolver(registryMock.target, providersMock.target, instancesMock.target);
            const inst = resolver.resolve(Service);

            expect(inst).instanceOf(Service).property('dep').instanceOf(Dependency);
        });

    })

    describe('resolve not registered type', () => {

        it('should throw exception', () => {
            class Service {};

            const registryMock: IMock<Registry> = Mock.ofType(Registry);
            registryMock.setup(x => x.getTypeInfo(Service)).returns(() => undefined);

            const providersMock: IMock<Providers> = Mock.ofType(Providers);
            providersMock.setup(x => x.getProvider(Service)).returns(() => undefined);

            const instancesMock: IMock<Instances> = Mock.ofType(Instances);
            instancesMock.setup(x => x.getInstance(Service)).returns(() => undefined);

            const resolver = new DependencyResolver(registryMock.target, providersMock.target, instancesMock.target);

            expect(() => resolver.resolve(Service)).to.throw(DependencyNotRegisteredException);
        });

    })

});
