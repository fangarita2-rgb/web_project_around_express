import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  // eslint-disable-next-line no-console
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión', err));

app.use(express.json());

// Middleware temporal de autorización
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6702d...', // Tu ID de prueba
  };
  next();
});

// Rutas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Manejo de ruta no encontrada (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

// Middleware centralizado de errores (DEBE IR AL FINAL)
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});