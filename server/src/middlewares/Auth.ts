import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { AppContext, PayloadType } from '../types';
import User from '../entity/User';

// TODO: better logger
const logger = console;

export const GQLAuth: MiddlewareFn<AppContext> = async ({ context }, next) => {
  // Authorization header (or any header) can be string[]?
  // Intellisense and tsc showed that, weird huh?
  // TODO: Look into it more, code looks weird af
  const header = context.req.headers.authorization;
  if (!header) {
    throw new Error('No Authorization Header');
  }

  try {
    const token = header.split('Bearer ')[1];
    const payload = verify(token, process.env.JWT_SECRET_KEY) as PayloadType;
    context.user = await User.findOne({ id: payload.userID });
    // context.user = payload;
  } catch (err) {
    logger.warn(err);
    throw new Error('Bad Authorization Header');
  }
  return next();
};

export const RESTAuth = async (req, res, next) => {

};
