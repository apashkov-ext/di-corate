import Injectable from '../decorators/injectable';
import Inject from '../decorators/parameter-inject';
import { C1 } from './C1';
import { C2 } from './C2';
import { C3 } from './C3';
import { C4 } from './C4';
import { C5 } from './C5';
import { Dep3 } from './Dep3';

@Injectable()
export class Dep2 {
    constructor(
        @Inject(Dep3) srv: Dep3,
        @Inject(C1) srv1: C1,
        @Inject(C2) srv2: C2,
        @Inject(C3) srv3: C3,
        @Inject(C4) srv4: C4,
        @Inject(C5) srv5: C5
        ) { }
}



