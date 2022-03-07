import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../entity/User';
import logger from '../utils/logger';
import EventOrganizer from '../entity/EventOrganiser';

export async function ResetPassword(req: Request, res: Response) {
  // defining the type
  const reqUser = (req.user as User);
  try {
    const hashedPassword = await hash(req.body.password, 12);
    await User.createQueryBuilder().update({ password: hashedPassword }).where({
      id: reqUser.id,
    }).execute();
    res.status(200).json({ status: 'success', description: 'Password changed successfully' });
  } catch (err) {
    logger.warn(err);
    res.status(500).json({ status: 'error', description: 'Something went wrong with password updation' });
  }
}

export async function ResetPasswordEventOrganiser(req: Request, res: Response) {
  // defining the type
  const reqUser = (req.user as EventOrganizer);
  try {
    const hashedPassword = await hash(req.body.password, 12);
    await User.createQueryBuilder().update({ password: hashedPassword }).where({
      id: reqUser.id,
    }).execute();
    res.status(200).json({ status: 'success', description: 'Password changed successfully' });
  } catch (err) {
    logger.warn(err);
    res.status(500).json({ status: 'error', description: 'Something went wrong with password updation' });
  }
}
