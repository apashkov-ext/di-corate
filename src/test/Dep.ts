import Injectable from '../decorators/injectable';
import Inject from '../decorators/parameter-inject';
import { Dep2 } from './Dep2';


@Injectable()
export class Dep {
    constructor(@Inject(Dep2) srv: Dep2) { }
}