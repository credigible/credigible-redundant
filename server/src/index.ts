import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser = require('cookie-parser');
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './entity/User';
import AuthResolver from './Resolvers/AuthResolver';
import AuthRouter from './routes/Auth';
import { RESTAuth } from './middlewares/Auth';
import logger from './utils/logger';
import ProfileRouter from './routes/Profile';

require('dotenv').config();

const app = express();
const port = 4000;

app.use(cookieParser());
app.use(AuthRouter);
app.use(ProfileRouter);

// passport google oauth
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_ROOT}/oauth/google`,
  },
  ((accessToken, refreshToken, profile, cb) => {
    const user = {
      email: profile.emails[0].value,
      // eslint-disable-next-line
      name: profile._json.name,
    };
    cb(null, user);
  }),
));
app.use(passport.initialize());

// Development Test endpoints //

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ Credigible: 'Success' });
});

app.get('/test', RESTAuth, async (req, res, next) => {
  res.status(200).json({ hi: (req.user as User).email });
});

// Development Test endpoints //

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthResolver,
      ],
    }),
    context: ({ req, res, next }) => ({ req, res, next }),
  });

  await createConnection();

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    logger.log('Express Server up!');
  });
};

main();
