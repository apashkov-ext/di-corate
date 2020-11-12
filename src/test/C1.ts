import Inject from '../decorators/parameter-inject';
import { C2 } from "./C2";




export class C1 {
    constructor(@Inject(C2) srv: C2) { }
}
