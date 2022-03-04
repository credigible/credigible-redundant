import { Router } from 'express';
import passport from 'passport';
import { refreshToken, OAuthController, refreshTokenEventOrganiser } from '../controllers/Auth';

const AuthRouter = Router();

AuthRouter.post('/refreshToken', refreshToken);

AuthRouter.post('/refreshTokenEO', refreshTokenEventOrganiser);

AuthRouter.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

AuthRouter.get(
  '/oauth/google',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google', failureMessage: true }),
  OAuthController,
);

export default AuthRouter;
