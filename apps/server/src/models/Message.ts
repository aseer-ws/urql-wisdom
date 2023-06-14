import { prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import Base from "./Base";

@ObjectType()
export class Message extends Base {
  @Field()
  @prop()
  name: string;

  @Field()
  @prop()
  text: string;
}

export const MessageModal = getModelForClass(Message, {
  schemaOptions: { timestamps: true },
});
