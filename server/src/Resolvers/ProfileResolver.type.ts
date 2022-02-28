import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class PasswordResetResponse {
  @Field()
  // success or error
  status: string;

  @Field({ nullable: true })
  description?: string;
}
