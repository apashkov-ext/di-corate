import 'mocha';
import { expect } from 'chai';
import { Injectable } from '../../decorators/injectable';
import { DependencyRegistry } from '../../startup';

describe('injectable decorator: add target to registry', () => {

    it('should return true', () => {
        @Injectable() class Service {}
        expect(DependencyRegistry.has(Service)).eq(true);
    });

});
