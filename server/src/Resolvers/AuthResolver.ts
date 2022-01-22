import {
  Resolver, Query, Mutation, Arg, Ctx, UseMiddleware,
} from 'type-graphql';

// TODO: better hashing library??
// argon2 doesn't seem to work :/
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../entity/User';
import { LoginResponse, RegisterResponse } from './AuthResolver.types';
import { AppContext } from '../types';
import { GQLAuth } from '../middlewares/Auth';

// TODO: Better logger
const logger = console;

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
      return { status: 'success' };
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

    // TODO: cleanup by making methods for tokens

    res.cookie('_crid', sign({
      userID: user.id,
    }, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    }), {
      httpOnly: true, // TODO: path and domain options
    });

    return {
      accessToken: sign({
        userID: user.id,
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_LIFE,
      }),
    };
  }

  @Query(() => [User])
  users() {
    return User.find();
  }
}
