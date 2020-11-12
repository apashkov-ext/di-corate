
import { performance } from 'perf_hooks';
import PropInject from '../decorators/property-inject';
import { Service } from './Service';


class Component {
    @PropInject(Service) private readonly srv: Service;
    constructor() {
        
    }

    run() {
        this.srv.go();
    }
}

var c = new Component();
const start = performance.now();
c.run();
const end = performance.now();
console.log(`${end - start} ms`);


// const g = new Map<number, number[]>();

// g.set(0, [1]);
// g.set(1, [2,3,4]);
// g.set(2, [3]);
// g.set(3, [4]);
// g.set(4, [2, 5]);
// g.set(5, []);

// var a = new DependenciesAnalyzer(g);
// console.log(`Cyclical: ${a.isCyclical}`);
// a.cycle;
