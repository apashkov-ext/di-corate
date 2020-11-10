import { DependenciesAnalyzer } from './registry';

var g = new Map<number, number[]>();

g.set(0, [1, 4]);
g.set(1, [2]);
g.set(2, []);
g.set(3, [0]);
g.set(4, [3]);

var a = new DependenciesAnalyzer<number>(g);
a.isCyclical;
