import { Operators } from "./enumeration";
import { SelectField } from "./field-types";

export type KeyAsParam<T> = Extract<T, string>;
export type Separator = Extract<'$', string>;
export type Field<T> = Paths<T>;
export type Filter<T, K extends Field<T>, Operator extends Operators> = `${KeyAsParam<K>}${Separator}${Operator}`;

export type SelectToFilter<T extends SelectField<T extends {} ? never : T>> = `${KeyAsParam<T['field']>}${Separator}${Extract<T['operator'], string>}`

export type ResultObject<T, V> = Record<T extends undefined ? KeyAsParam<T> : KeyAsParam<T>, V>

export type SingleSelectResult<R extends {}, T extends SelectField<R>> = Record<Filter<R, T['field'], T['operator']>, string>;

export type NestedValueOf<Obj, Key extends string> =
    Key extends keyof Obj
    ? Obj[Key]
    : Obj extends (infer T | undefined)[]
    ? Key extends keyof T | undefined
    ? T extends object | undefined ? T[Key] : never
    : never
    : Obj extends object | undefined
    ? Key extends `${infer Parent}.${infer Rest}`
    ? Parent extends keyof Obj | undefined
    ? NestedValueOf<Exclude<Obj[Parent], undefined>, Rest>
    : never
    : never
    : never;

type ExcludeFunctions<T> = T extends Function ? never : T;

type TypeFromArray<T> = T extends (infer U)[] ? U : T;

export type Paths<T> = T extends object ?
    T extends Array<infer U> ?
    U extends object ?
    {
        [K in keyof U]: ExcludeFunctions<U[K]> extends never
        ? never
        : `${K & string}${"" | `.${Paths<ExcludeFunctions<U[K]>>}`}`
    }[keyof U]
    : never
    : {
        [K in keyof T]: K extends keyof any[] ?
        ExcludeFunctions<T[K]> extends never
        ? never
        : `${K & string}${"" | `.${Paths<ExcludeFunctions<T[K]>>}`}`
        : ExcludeFunctions<T[K]> extends never
        ? never
        : `${K & string}${"" | `.${Paths<ExcludeFunctions<T[K]>>}`}`
    }[keyof T]
    : never;

export type ValueForOperator<Op extends Operators, T> = Op extends Operators.EQUAL | Operators.MATCH
    ? TypeFromArray<T>
    : Op extends Operators.IN | Operators.OR | Operators.NIN ? TypeFromArray<T>[]
    : [TypeFromArray<T>, TypeFromArray<T>];