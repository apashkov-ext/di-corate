import Inject from '../decorators/parameter-inject';
import { C3 } from "./C3";




export class C2 {
    constructor(@Inject(C3) srv: C3) { }
}
