import express from 'express';
import type { Request, Response } from 'express';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});