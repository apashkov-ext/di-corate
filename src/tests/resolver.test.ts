import 'mocha';
import { expect } from 'chai';
import { DependencyResolver, Instances } from '../dependency-resolver';
import { IMock, Mock } from 'typemoq';
import { Registry } from '../registry';
import { TypeInfo } from '../types/type-info';
import { InjectionScopeEnum } from '../types/injection-scope.enum';
import { Providers } from '../providers';
import { DependencyNotRegisteredException } from '../types/dependency-not-registered-exception';

describe('dependency resolver', () => {

    describe('resolve registered type', () => {

        it('without custom provider, should returns instance', () => {
            class Service {};
            const info = { injectionScope: InjectionScopeEnum.Singletone, dependencies:[] } as TypeInfo;

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
            const info = { injectionScope: InjectionScopeEnum.Singletone, dependencies:[] } as TypeInfo;

            const registryMock: IMock<Registry> = Mock.ofType(Registry);
            registryMock.setup(x => x.getTypeInfo(Service)).returns(() => info);

            const providersMock: IMock<Providers> = Mock.ofType(Providers);
            providersMock.setup(x => x.getProvider(ServiceBase)).returns(() => Service);

            const instancesMock: IMock<Instances> = Mock.ofType(Instances);
            instancesMock.setup(x => x.getInstance(Service)).returns(() => undefined);

            const resolver = new DependencyResolver(registryMock.target, providersMock.target, instancesMock.target);

            expect(resolver.resolve(ServiceBase)).instanceOf(Service);
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
