import { Router } from 'express';
import { refreshToken } from '../controllers/Auth';

const AuthRouter = Router();

AuthRouter.post('/refreshToken', refreshToken);

export default AuthRouter;
