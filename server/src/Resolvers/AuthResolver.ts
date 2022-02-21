import {
  Resolver, Query, Mutation, Arg, Ctx, UseMiddleware,
} from 'type-graphql';

// TODO: better hashing library??
// argon2 doesn't seem to work :/
import { hash, compare } from 'bcryptjs';
import User from '../entity/User';
import { LoginResponse, RegisterResponse } from './AuthResolver.types';
import { AppContext } from '../types';
import { GQLAuth } from '../middlewares/Auth';
import { createRefreshToken, createAccessToken, sendRefreshTokenCookie } from '../utils/utils';
import logger from '../utils/logger';

@Resolver()
export default class UserResolver {
  @Query(() => String)
  hello() {
    // test query to check if apollo is up and running or not
    return 'test';
  }

  @Query(() => String)
  @UseMiddleware(GQLAuth)
  authHello(
    @Ctx() { user } : AppContext,
  ) {
    // test query to check GQLAuth middleware
    return `hi ${user.email}`;
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) : Promise<RegisterResponse> {
    // User registration
    // @param email : unique email to sign up with, for a user
    // @param password : password that would be stored as bcryptjs encrypted password
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
      return { status: 'success', description: 'Successfully registered' };
    } catch (err) {
      logger.warn(err);
      return { status: 'error', description: String(err) };
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: AppContext,
  ): Promise<LoginResponse> {
    // User Login
    // @param email : unique email with which user signed up with
    // @param password : password that is be stored as bcryptjs encrypted password
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Couldn't find user");
    }

    if (!(await compare(password, user.password))) {
      throw new Error('Wrong password');
    }

    // Check Ban
    if (user.ban) {
      throw new Error('User Banned');
    }

    // Update Last Login
    await User.createQueryBuilder().update({ lastLogin: new Date() }).where({
      id: user.id,
    }).execute();

    sendRefreshTokenCookie(res, createRefreshToken(user.id));

    return {
      status: 'success',
      accessToken: createAccessToken(user.id),
    };
  }

  // Test, shouldn't go in production
  @Query(() => [User])
  users() {
    return User.find();
  }
}
