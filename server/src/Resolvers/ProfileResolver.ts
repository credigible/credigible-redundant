import { hashSync } from 'bcryptjs';
import {
  Arg,
  Ctx, Mutation, Query, Resolver, UseMiddleware,
} from 'type-graphql';
import { getManager } from 'typeorm';
import User from '../entity/User';
import { GQLAuth, GQLAuthEventOrganiser } from '../middlewares/Auth';
import { AppContext, AppContextEventOrganiser } from '../types';
import logger from '../utils/logger';
import PasswordResetResponse from './ProfileResolver.type';
import EventOrganizer from '../entity/EventOrganiser';

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
  @Arg('password', { nullable: true }) password: string,
  @Arg('firstName', { nullable: true }) firstName: string,
  @Arg('lastName', { nullable: true }) lastName: string,
  @Arg('username', { nullable: true }) username: string,
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
      const responseObject = {
        password: password ? hashSync(password, 12) : undefined,
        firstName,
        lastName,
        username,
        email,
        educationalInstitute,
        course,
        state,
        age,
        gender,
        upi,
        credit,
        debit,
      };
      Object.keys(responseObject).forEach(
        (key) => (responseObject[key] === undefined ? delete responseObject[key] : {}),
      );
      getManager().update(User, { id: user.id }, responseObject);
      return { status: 'success', description: 'Successfully changed details' };
    } catch (error) {
      logger.warn(error);
      return { status: 'error', description: 'Something went wrong' };
    }
  }

  @Mutation(() => PasswordResetResponse)
  @UseMiddleware(GQLAuthEventOrganiser)
  async updateUserEventOrganiser(
  @Ctx() { user } : AppContextEventOrganiser,
  @Arg('password', { nullable: true }) password: string,
  @Arg('organizationName', { nullable: true }) organizationName: string,
  @Arg('address', { nullable: true }) address: string,
  @Arg('username', { nullable: true }) username: string,
  @Arg('email', { nullable: true }) email: string,
  @Arg('state', { nullable: true }) state: string,
  @Arg('age', { nullable: true }) age: number,
  @Arg('gender', { nullable: true }) gender: number,
  @Arg('upi', { nullable: true }) upi: string,
  @Arg('credit', { nullable: true }) credit: string,
  @Arg('debit', { nullable: true }) debit: string,
  ):Promise<PasswordResetResponse> {
    try {
      const responseObject = {
        password: password ? hashSync(password, 12) : undefined,
        organizationName,
        address,
        username,
        email,
        state,
        age,
        gender,
        upi,
        credit,
        debit,
      };
      Object.keys(responseObject).forEach(
        (key) => (responseObject[key] === undefined ? delete responseObject[key] : {}),
      );
      getManager().update(EventOrganizer, { id: user.id }, responseObject);
      return { status: 'success', description: 'Successfully changed details' };
    } catch (error) {
      logger.warn(error);
      return { status: 'error', description: 'Something went wrong' };
    }
  }
}
