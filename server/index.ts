import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

require('dotenv').config();

const app = express();
const port = 4000;

app.listen(port, () => {
});
