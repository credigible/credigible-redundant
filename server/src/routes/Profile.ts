import { Router } from 'express';
import { DeleteProfile, ResetPassword } from '../controllers/Profile';
import { RESTAuth } from '../middlewares/Auth';

const ProfileRouter = Router();

ProfileRouter.patch('/profile/password', RESTAuth, ResetPassword);
ProfileRouter.delete('/profile/delete', RESTAuth, DeleteProfile);

export default ProfileRouter;
