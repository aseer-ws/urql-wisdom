import { ID } from "graphql-ws";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default abstract class Base {
  @Field()
  _id: ID;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
