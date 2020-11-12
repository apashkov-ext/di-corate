import Injectable from '../decorators/injectable';
import Inject from '../decorators/parameter-inject';
import { Dep } from './Dep';
import { Dep2 } from './Dep2';
import { Dep3 } from './Dep3';


@Injectable()
export class HttpClient {
    constructor(
        @Inject(Dep) srv: Dep,
        @Inject(Dep2) srv2: Dep2,
        @Inject(Dep3) srv3: Dep3
        ) { }
}
