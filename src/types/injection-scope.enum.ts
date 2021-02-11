export enum InjectionScopeEnum {
    /**
     * A single instance is shared across the entire application. 
     * Singleton scope is used by default.
     */
    Singletone = 1,

    /**
     * Each consumer will receive a new, dedicated instance.
     */
    Transient = 2
}