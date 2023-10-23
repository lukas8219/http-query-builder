import { Operators, SortDirection } from "./enumeration";
import { Field } from "./types";

export interface SelectField<T extends {} | never> {
    field: Field<T>;
    operator: Operators;
    value: string
}

export interface OrderByField<T extends {}> {
    'sort.order': SortDirection;
    'sort.attribute': Field<T>
}