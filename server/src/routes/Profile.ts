import { Router } from 'express';
import { ResetPassword } from '../controllers/Profile';
import { RESTAuth } from '../middlewares/Auth';

const ProfileRouter = Router();

ProfileRouter.patch('/profile/password', RESTAuth, ResetPassword);

export default ProfileRouter;
