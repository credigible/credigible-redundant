import { Request, Response, NextFunction } from 'express';
import {
  verifyRefreshToken, createAccessToken, createRefreshToken, sendRefreshTokenCookie,
} from '../utils/utils';
import { PayloadType } from '../types';
import User from '../entity/User';

const logger = console;

/* eslint-disable import/prefer-default-export */
export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-underscore-dangle
  const token = req.cookies._crid;
  if (!token) {
    res.status(400).json({ status: 'No refreshToken' });
    return;
  }

  try {
    const payload = verifyRefreshToken(token) as PayloadType;
    const user = await User.findOne({ id: payload.userID });
    if (!user) {
      sendRefreshTokenCookie(res, createRefreshToken(user.id));
      res.status(401).json({ status: 'User not found' });
    }
    res.status(200).json({ accessToken: createAccessToken(payload.userID) });
  } catch (err) {
    logger.log(err);
    throw err;
  }
}
/* eslint-enable import/prefer-default-export */
