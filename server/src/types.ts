import { Request, Response, NextFunction } from 'express';
import User from './entity/User';

export interface AppContext {
  req: Request;
  res: Response;
  next?: NextFunction;
  user?: User; // look into fixing this type
}

export interface PayloadType {
  userID: string;
  iat: number;
  exp: number;
}
