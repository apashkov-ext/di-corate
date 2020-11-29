import 'mocha';
import { expect } from 'chai';
import { has } from '../../registry';
import { Inject } from '../../decorators/parameter-inject';

describe('parameter inject decorator: add target to registry', () => {

    it('should return true', () => {
        class Dependency {}
        class Service {
            constructor(@Inject(Dependency) srv: Dependency) { }
        }
        
        expect(has(Service)).to.eq(true);
    });

    it('should return true', () => {
        interface Dependency {}
        class Service {
            constructor(@Inject<Dependency>('Dependency') srv: Dependency) { }
        }
        
        expect(has(Service)).to.eq(true);
    });

    it('should throw error', () => {
        expect(Inject(undefined)).to.throw();
    });
    
});
