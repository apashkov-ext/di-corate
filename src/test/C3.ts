import Inject from '../decorators/parameter-inject';
import { C4 } from "./C4";




export class C3 {
    constructor(@Inject(C4) srv: C4) { }
}
