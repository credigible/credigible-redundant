import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser = require('cookie-parser');
import User from './entity/User';
import AuthResolver from './Resolvers/AuthResolver';
import AuthRouter from './routes/Auth';
import { RESTAuth } from './middlewares/Auth';

require('dotenv').config();

// TODO: Implement a proper logger
const logger = console;

const app = express();
const port = 4000;

app.use(cookieParser());
app.use(AuthRouter);

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
