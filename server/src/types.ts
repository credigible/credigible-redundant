import { Request, Response, NextFunction } from 'express';
import User from './entity/User';
import EventOrganizer from './entity/EventOrganiser';

export interface AppContext {
  req: Request;
  res: Response;
  next?: NextFunction;
  user?: User; // look into fixing this type
}

export interface AppContextEventOrganiser {
  req: Request;
  res: Response;
  next?: NextFunction;
  user?: EventOrganizer; // look into fixing this type
}

export interface PayloadType {
  userID: string;
  iat: number;
  exp: number;
}

export interface UserOAuth {
  email: string;
  name: string;
}
