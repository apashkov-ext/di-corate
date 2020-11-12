import Injectable from '../decorators/injectable';
import Inject from '../decorators/parameter-inject';
import { Dep4 } from './Dep4';

@Injectable()
export class Dep3 {
    constructor(@Inject(Dep4) srv: Dep4) { }
}
