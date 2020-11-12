import Injectable from '../decorators/injectable';
import Inject from '../decorators/parameter-inject';
import { HttpClient } from './HttpClient';

@Injectable()
export class Service {
    constructor(@Inject(HttpClient) private srv: HttpClient) { }

    go() {
        
    }
}
