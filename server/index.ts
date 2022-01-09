import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ Test: 'Credigible' });
});

app.listen(port, () => {
});
