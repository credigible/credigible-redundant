import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { validate } from 'class-validator';
import logger from '../utils/logger';
import { ComingSoon } from '../entity/Analytics';

/* eslint-disable import/prefer-default-export */
export const ComingSoonAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // await ComingSoon.insert({ email: req.body.email });
    const test = new ComingSoon();
    test.email = req.body.email;
    const errors = await validate(test);
    if (errors.length > 0) {
      throw new Error(String(errors));
    } else {
      getManager().save(test);
      res.status(200).json({ status: 'success', description: 'email added' });
    }
  } catch (err) {
    logger.log(err);
    res.status(500).json({ status: 'error', description: 'problem' });
  }
};
/* eslint-enable import/prefer-default-export */
