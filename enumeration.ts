export enum Operators {
    MATCH = 'match',
    EQUAL = 'eq',
    IN = 'in',
    NIN = 'nin',
    OR = 'or',
    BETWEEN = 'between',
    GREATER_THAN = 'gt',
    GREATER_THAN_EQUAL = 'gte',
    LESS_THAN = 'lt',
    LESS_THAN_EQUAL = 'lte',
}

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc'
}

export type OperatorAsParam = Extract<Operators, string>;