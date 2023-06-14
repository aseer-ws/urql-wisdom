import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  Publisher,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Message, MessageModal } from "../models/Message";
import { PaginationParams, User } from "../schema";
import { signToken } from "../utils";
import { GraphQLError } from "graphql";

@Resolver(Message)
export class MessageResolver {
  @Query(() => [Message])
  messages(
    @Arg("params") { offset, limit, sortDirection, sortField }: PaginationParams
  ): Promise<Message[]> {
    console.log(sortDirection, sortField);
    return MessageModal.find()
      .sort({ [sortField]: sortDirection })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() ctx: { name: string }) {
    return ctx.name ? ctx : null;
  }

  @Mutation(() => User)
  login(@Arg("name") name: string): User {
    const token = signToken({ name });
    return { name, token };
  }

  @Mutation(() => Message)
  async addMessage(
    @Arg("text") text: string,
    @Ctx() ctx: { name?: string },
    @PubSub("NEW_MESSAGE") publish: Publisher<Message>
  ): Promise<Message> {
    if (!ctx.name) throw new GraphQLError("Not authenticated");
    const message = await MessageModal.create({ text, name: ctx.name });
    await publish(message.toJSON());
    return message.toJSON();
  }

  @Subscription({ topics: "NEW_MESSAGE" })
  newMessage(@Root() messagePayload: Message): Message {
    console.log(messagePayload);
    return messagePayload;
  }
}
