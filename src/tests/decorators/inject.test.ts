import 'mocha';
import { expect } from 'chai';
import { DependencyRegistry } from '../../startup';
import { Inject } from '../../decorators/inject';

describe('parameter inject decorator: add target to registry', () => {

    it('should return true', () => {
        class Dependency {}
        class Service {
            constructor(@Inject(Dependency) srv: Dependency) { }
        }
        
        expect(DependencyRegistry.has(Service)).to.eq(true);
    });

    it('should throw error', () => {
        expect(Inject(undefined)).to.throw();
    });
    
});
