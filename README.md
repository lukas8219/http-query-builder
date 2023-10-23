# http-query-builder

QueryBuilder to consume a API

The API uses queryParams for dynamic SQl quering

It follows this standard

modelAttribute$operator=value

We can sort using the following

sort.attribute=modelAttribute&sort.order=ASC|DESC

## Typing

The API dynamically types the `with` method. You can only add values based upon the type interface.
Currently it does not support Union types.

It does support nested objects and array types.

This was built having JPA querying standards. So querying inside relationships didnt needed indexes.


### Examples

on `examples.ts` you have the following code

```typescript
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
```

It will log the following

```bash
{
  "sort.attribute": "updatedAt",
  "sort.order": "asc",
  "address.complement.name$eq": "dkPAOSDPK",
  id$in: "1,2,3,4,5",
  id$match: "1",
  name$between: "1,3",
  "contacts.value$match": "something here boys",
  "address.additionalLocations.complement$between": "1,2",
  updatedAt$between: "2023-10-23T00:19:45.637Z,2023-10-23T00:19:45.637Z",
  page: 0,
  limit: 10
}
```
