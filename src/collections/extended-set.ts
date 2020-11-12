export class ExtendedSet<T> extends Set<T> {
    constructor(iterable?: Iterable<T>) {
        super(iterable);
    }

    find(predicate: (current: T) => boolean): T | undefined {
        for (let value of this) {
            if (predicate(value)) {
                return value;
            }
        }
        return undefined;
    }
}
