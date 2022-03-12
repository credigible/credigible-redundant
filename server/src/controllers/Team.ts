import { Request, Response, NextFunction } from 'express';
import { getManager, getConnection } from 'typeorm';
import logger from '../utils/logger';
import Team from '../entity/Team';
import { UserTeam } from '../entity/ManytoMany';
import User from '../entity/User';

// TODO: need a captain/leader to make sure that not just anyone can add stuff

export async function createTeam(req: Request, res: Response, next: NextFunction) {
  // Create Team
  try {
    const reqUser = (req.user as User);
    const team = new Team();
    team.teamName = req.body.teamName;
    await getManager().save(team);

    const userteam = new UserTeam();
    userteam.user = reqUser;
    userteam.team = team;
    await getManager().save(userteam);
    res.status(200).json({ status: 'success', teamID: team.id });
  } catch (err) {
    logger.warn(err);
    res.status(500).json({ status: 'error', description: '' });
  }
}

export async function deleteTeam(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: We have to implement cascade deletion properly
    const members = await getConnection().createQueryBuilder().select('userteam').from(UserTeam, 'userteam')
      .where('userteam.teamID = :teamID', { teamID: req.body.teamID })
      .getMany();
    members.forEach((member) => {
      // all these gymnastics to delete synchronously
      // TODO: use alternative delete function using QueryBuilder to delete synchronously
      const deleteMember = async () => {
        await getManager().delete(UserTeam, member.id);
      };
      deleteMember();
    });
    await getManager().delete(Team, req.body.teamID);
    res.status(200).json({ status: 'success', description: 'successful deletion' });
  } catch (err) {
    logger.warn(err);
    res.status(500).json({ status: 'error', description: '' });
  }
}

export async function editTeam(req: Request, res: Response, next: NextFunction) {
  // Edit team details
  try {
    const responseObject = {
      teamName: req.body.teamName,
    };
    Object.keys(responseObject).forEach(
      (key) => (responseObject[key] === undefined ? delete responseObject[key] : {}),
    );
    getManager().update(Team, { id: req.body.teamID }, responseObject);
    res.status(200).json({ status: 'success', description: 'successful editing' });
  } catch (err) {
    logger.warn(err);
    res.status(500).json({ status: 'error', description: '' });
  }
}

export async function addMembers(req: Request, res: Response, next: NextFunction) {
  // Add Members
  try {
    const userteam = new UserTeam();
    const team = await Team.findOne({ id: req.body.teamID });
    const member = await User.findOne({ id: req.body.teamID });
    userteam.user = member;
    userteam.team = team;
    await getManager().save(userteam);
    res.status(200).json({ status: 'success', description: 'successful addition of new member' });
  } catch (err) {
    logger.warn(err);
    res.status(500).json({ status: 'error', description: '' });
  }
}
