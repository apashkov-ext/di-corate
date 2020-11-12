export class List<T> extends Array<T> {
    private _first: T;
    get first() {
        return this._first;
    }

    private _last: T;
    get last() {
        return this._last;
    }

    constructor(items: T[] = []) {
        super(...items);
        this.setFirstLast();
    }

    private setFirstLast() {
        if (this.length) {
            this._first = this[0];
            this._last = this[this.length - 1];
        }
    }
}
