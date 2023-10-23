import { Operators, SortDirection } from "./enumeration";
import { OrderByField, SelectField } from "./field-types";
import { Field, KeyAsParam, NestedValueOf, Paths, SingleSelectResult, ValueForOperator } from "./types";

export class QueryBuilder<T extends {}> {

    private readonly filters: Array<SelectField<T>> = []
    private order: OrderByField<T> | undefined;
    private _page: number = 0;
    private _limit: number = 10;

    static newBuilder<T extends {}>(){
        return new QueryBuilder<T>();
    }

    orderBy(field: Field<T>, direction: SortDirection = SortDirection.ASC): this {
        this.order = {
            "sort.attribute": field,
            "sort.order": direction,
        }
        return this;
    }

    page(page: number): this {
        this._page = page;
        return this;
    }

    limit(limit: number): this {
        this._limit = limit;
        return this;
    }

    with<K extends Paths<T>>(field: K, operator: Operators, value: ValueForOperator<Operators, NestedValueOf<T, KeyAsParam<K>>>): this {
        this.filters.push({
            field,
            operator,
            value: this.#toValue(value),
        })
        return this;
    }

    build(): string {
        const filtersAsObject = this.toObject();
        return new URLSearchParams(filtersAsObject).toString();
    }

    toObject(): SingleSelectResult<T, SelectField<T>> & Partial<OrderByField<T>> & { page: number, limit: number }{
        const filters = this.filters.reduce((p,c) => ({ ...p, [`${c.field}$${c.operator}`]: c.value }), {} as SingleSelectResult<T, SelectField<T>>);
        return {
            ...(this.order || {}),
            ...filters,
            page: this._page,
            limit: this._limit,
        }
    }

    #toValue<V extends Paths<T>>(value: ValueForOperator<Operators, NestedValueOf<T, KeyAsParam<V>>>): string {
        if(Array.isArray(value)){
            return value.map(this.#toSingleValue).join(',');
        }
        return this.#toSingleValue(value);
    }

    #toSingleValue<V>(value:V): string {
        if(value instanceof Date){
            return value.toISOString();
        }
        if(typeof value === 'number'){
            return value.toString();
        }

        return value as string;
    }
}