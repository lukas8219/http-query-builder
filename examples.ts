import { Operators, SortDirection } from "./enumeration";
import { QueryBuilder } from "./sql-builder";

interface StudentModel {
    id: number;
    name: string;
    address: {
        street: string;
        complement: {
            name: string;
        },
        additionalLocations: {
            complement: number;
        }[]
    };
    createdAt?: Date;
    updatedAt?: Date;
    contacts: { value: string }[]
    people: { value: number }[][]
}

const query = QueryBuilder
    .newBuilder<StudentModel>()
    .with('address.complement.name', Operators.EQUAL, 'dkPAOSDPK')
    .with('id', Operators.IN, [1,2,3,4,5])
    .with('id', Operators.MATCH, 1)
    .with('name', Operators.BETWEEN, ['1', '3'])
    .with('contacts.value', Operators.MATCH, 'something here boys')
    .with('address.additionalLocations.complement', Operators.BETWEEN, [1,2])
    .with('updatedAt', Operators.BETWEEN, [new Date(), new Date()])
    .orderBy('updatedAt', SortDirection.ASC)
    .toObject();


console.log(query);