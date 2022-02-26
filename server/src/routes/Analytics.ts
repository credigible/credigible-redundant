import { Router } from 'express';
import { ComingSoonAnalytics } from '../controllers/Analytics';

const AnalyticsRouter = Router();

AnalyticsRouter.post('/email', ComingSoonAnalytics);

export default AnalyticsRouter;
