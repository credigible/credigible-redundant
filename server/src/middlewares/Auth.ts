import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppContext, PayloadType } from '../types';
import User from '../entity/User';
import logger from '../utils/logger';

export const GQLAuth: MiddlewareFn<AppContext> = async ({ context }, next) => {
  const header = context.req.headers.authorization;
  if (!header) {
    throw new Error('No Authorization Header');
  }

  try {
    const token = header.split('Bearer ')[1];
    const payload = verify(token, process.env.JWT_SECRET_KEY) as PayloadType;
    context.user = await User.findOne({ id: payload.userID });
  } catch (err) {
    logger.warn(err);
    throw new Error('Bad Authorization Header');
  }
  return next();
};

export const RESTAuth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ status: 'error', message: 'No Authorization Header' });
    return next();
  }

  try {
    const token = header.split('Bearer ')[1];
    const payload = verify(token, process.env.JWT_SECRET_KEY) as PayloadType;
    req.user = await User.findOne({ id: payload.userID });
  } catch (err) {
    logger.warn(err);
    // TODO: unify error messages
    res.status(401).json({ status: 'Error', message: 'Bad Token' });
  }
  return next();
};
