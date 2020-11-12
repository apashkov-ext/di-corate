import Inject from '../decorators/parameter-inject';
import { C5 } from "./C5";




export class C4 {
    constructor(@Inject(C5) srv: C5) { }
}
