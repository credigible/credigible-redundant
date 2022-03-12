import { Router } from 'express';
import { RESTAuth } from '../middlewares/Auth';
import { createTeam, deleteTeam } from '../controllers/Team';

const TeamRouter = Router();

TeamRouter.post('/team/create', RESTAuth, createTeam);
TeamRouter.delete('/team/delete', RESTAuth, deleteTeam);

export default TeamRouter;
