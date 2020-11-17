import 'mocha';
import { expect } from 'chai';
import { bind, resolveType } from '../../container';

describe('bind', () => {

    it('should return true', () => {
        interface Service {}
        class DefaultService implements Service {}
        bind('Service', DefaultService);
        const res = resolveType('Service');
        expect(res).is.a
    });

});
