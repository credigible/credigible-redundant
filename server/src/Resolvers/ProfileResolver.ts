import { hash } from 'bcryptjs';
import {
  Arg,
  Ctx, Mutation, Query, Resolver, UseMiddleware,
} from 'type-graphql';
import User from '../entity/User';
import { GQLAuth } from '../middlewares/Auth';
import { AppContext } from '../types';
import logger from '../utils/logger';
import PasswordResetResponse from './ProfileResolver.type';

@Resolver()
export default class ProfileResolver {
  @Query(() => String)
  profileHello() {
    return 'profileHello';
  }

  @Mutation(() => PasswordResetResponse)
  @UseMiddleware(GQLAuth)
  async updateUser(
  @Ctx() { user } : AppContext,
  @Arg('password', { nullable: true })password: string,
  @Arg('firstName', { nullable: true }) firstName: string,
  @Arg('lastName', { nullable: true }) lastName: string,
  @Arg('username', { nullable: true }) userName: string,
  @Arg('email', { nullable: true }) email: string,
  @Arg('educationalInstitute', { nullable: true }) educationalInstitute: string,
  @Arg('course', { nullable: true }) course: string,
  @Arg('state', { nullable: true }) state: string,
  @Arg('age', { nullable: true }) age: number,
  @Arg('gender', { nullable: true }) gender: number,
  @Arg('upi', { nullable: true }) upi: string,
  @Arg('credit', { nullable: true }) credit: string,
  @Arg('debit', { nullable: true }) debit: string,
  ):Promise<PasswordResetResponse> {
    try {
      if (password) {
        // console.log(email);
        const hashedPassword = await hash(password, 12);
        await User.createQueryBuilder().update({ password: hashedPassword }).where({
          // id: user.id,
          email: user.email,
        }).execute();
      }

      if (firstName) {
        await User.createQueryBuilder().update({ firstName }).where({
          id: user.id,
        }).execute();
      }

      if (lastName) {
        await User.createQueryBuilder().update({ lastName }).where({
          id: user.id,
        }).execute();
      }

      if (userName) {
        await User.createQueryBuilder().update({ username: userName }).where({
          id: user.id,
        }).execute();
      }

      if (email) {
        await User.createQueryBuilder().update({ email }).where({
          id: user.id,
        });
      }

      if (educationalInstitute) {
        await User.createQueryBuilder().update({ educationalInstitute }).where({
          // id: user.id,
          email: user.email,
        });
      }

      if (course) {
        await User.createQueryBuilder().update({ course }).where({
          id: user.id,
        });
      }

      if (state) {
        await User.createQueryBuilder().update({ state }).where({
          id: user.id,
        });
      }

      if (age) {
        await User.createQueryBuilder().update({ age }).where({
          id: user.id,
        });
      }

      if (gender) {
        await User.createQueryBuilder().update({ gender }).where({
          id: user.id,
        });
      }

      if (upi) {
        await User.createQueryBuilder().update({ upi }).where({
          id: user.id,
        });
      }

      if (debit) {
        await User.createQueryBuilder().update({ debit }).where({
          id: user.id,
        });
      }

      if (credit) {
        await User.createQueryBuilder().update({ gender }).where({
          id: user.id,
        });
      }
      return { status: 'success', description: 'Successfully changed details' };
    } catch (error) {
      logger.warn(error);
      return { status: 'error', description: String(error) };
    }
  }
}
