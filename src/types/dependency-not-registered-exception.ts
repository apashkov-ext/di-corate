export class DependencyNotRegisteredException extends Error {
    constructor(typeName: string) {
        super(`Dependency injector: Type [${typeName}] is not registered`);
    }
}