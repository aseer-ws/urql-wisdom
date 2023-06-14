import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";

enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

registerEnumType(SortDirection, {
  name: "SortDirection", // this one is mandatory
  description: "Sort direction parameter for list query", // this one is optional
});

@InputType()
export class PaginationParams {
  @Field(() => SortDirection, { defaultValue: SortDirection.DESC })
  sortDirection: SortDirection;

  @Field({ defaultValue: "createdAt" })
  sortField: string;

  @Field({ defaultValue: 0 })
  offset: number;

  @Field()
  limit: number;
}

@ObjectType()
export class User {
  @Field()
  name: string;

  @Field()
  token: string;
}
