import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

require('dotenv').config();

const app = express();
const port = 4000;

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/oauth/google',
  },
  ((accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    cb(null, { accessToken, refreshToken });
  }),
));

app.use(passport.initialize());

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ Test: 'Credigible' });
});

app.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

app.get(
  '/oauth/google',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google', failureMessage: true }),
  (req, res) => { res.redirect('/'); },
);

app.listen(port, () => {
});
