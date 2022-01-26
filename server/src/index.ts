import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser = require('cookie-parser');
import User from './entity/User';
import AuthResolver from './Resolvers/AuthResolver';
import AuthRouter from './routes/Auth';

require('dotenv').config();

// TODO: Implement a proper logger
const logger = console;

const app = express();
const port = 4000;

app.use(cookieParser());
app.use(AuthRouter);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ Credigible: 'Success' });
});

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
// createConnection().then(async (connection) => {
// console.log('Inserting a new user into the database...');
// const user = new User();
// user.firstName = 'Timber';
// user.lastName = 'Saw';
// user.age = 25;
// await connection.manager.save(user);
// console.log(`Saved a new user with id: ${user.id}`);

// console.log('Loading users from the database...');
// const users = await connection.manager.find(User);
// console.log('Loaded users: ', users);

// console.log('Here you can setup and run express/koa/any other framework.');
// }).catch((error) => console.log(error));
