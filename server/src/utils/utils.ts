import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

export const createRefreshToken = (id) => sign({
  userID: id,
}, process.env.REFRESH_TOKEN_SECRET_KEY, {
  expiresIn: process.env.REFRESH_TOKEN_LIFE,
});

export const createAccessToken = (id) => sign({
  userID: id,
}, process.env.JWT_SECRET_KEY, {
  expiresIn: process.env.JWT_TOKEN_LIFE,
});

export const verifyRefreshToken = (token: string) => verify(
  token,
  process.env.REFRESH_TOKEN_SECRET_KEY,
);

export const verifyAccessToken = (token: string) => verify(
  token,
  process.env.JWT_SECRET_KEY,
);

export const sendRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('_crid', token, {
    httpOnly: true, // TODO: path and domain options
  });
};
