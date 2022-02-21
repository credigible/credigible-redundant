import {
  Field, ObjectType,
} from 'type-graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  status: string;
  @Field()
  accessToken: string;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  // success or error
  status: string;

  @Field({ nullable: true })
  description?: string;
}
