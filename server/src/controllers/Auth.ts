import { Request, Response, NextFunction } from 'express';
import {
  verifyRefreshToken, createAccessToken, createRefreshToken, sendRefreshTokenCookie,
} from '../utils/utils';
import { PayloadType, UserOAuth } from '../types';
import User from '../entity/User';
import logger from '../utils/logger';

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

export async function OAuthController(req: Request, res: Response) {
  // If user doesn't exist, sign him up with password field ''
  // A primitive way to show in database that the person signed up using OAuth2
  // (Should be changed later ig when we have more integration)
  // If user exists, check if the person initially signed up with OAuth2 or not
  // If not, return to a specific frontend page with error (banner?) (TODO)
  // If yes, return refreshToken

  const reqUser = (req.user as UserOAuth); // define the type

  const user = await User.findOne({ where: { email: reqUser.email } });
  if (!user) {
    // User is not registered
    try {
      await User.insert({
        email: reqUser.email,
        password: '',
        firstName: reqUser.name,
      });
      const newUser = await User.findOne({ where: { email: reqUser.email } });
      sendRefreshTokenCookie(res, createRefreshToken(newUser.id));
      res.redirect(process.env.FE_ROOT);
    } catch (err) {
      // TODO: error page
      logger.log(err);
      res.redirect(process.env.FE_ROOT);
    }
  } else {
    // User is registered
    const existingUser = await User.findOne({ where: { email: reqUser.email } });

    // Check Ban
    if (user.ban) {
      res.status(400).json({ status: 'User Banned' });
    }

    // Update Last Login
    await User.createQueryBuilder().update({ lastLogin: new Date() }).where({
      id: existingUser.id,
    }).execute();

    sendRefreshTokenCookie(res, createRefreshToken(existingUser.id));
    res.redirect(process.env.FE_ROOT);
  }
}
