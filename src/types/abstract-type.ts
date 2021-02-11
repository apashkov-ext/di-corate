/**
 * Abstract type.
 */
export type AbstractType<T = any> = Function & { prototype: T };