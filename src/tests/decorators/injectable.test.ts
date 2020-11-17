import 'mocha';
import { expect } from 'chai';
import { Injectable } from '../../decorators/injectable';
import { has } from '../../registry';

describe('injectable decorator: add target to registry', () => {

    it('should return true', () => {
        @Injectable()
        class Service {}
        expect(has(Service)).to.eq(true);
    });

});
