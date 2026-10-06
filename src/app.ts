import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  // eslint-disable-next-line no-console
  .then(() => console.log('Conectado a MongoDB'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error('Error de conexión', err));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
  _id: '6ac56f89e8da1ecf01b5e88e',
  };
  next();
});

app.use(router);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});