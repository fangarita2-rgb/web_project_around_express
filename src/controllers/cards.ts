import type { Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';

// Construcción segura de la ruta absoluta usando import.meta.dirname y path.join
const cardsPath = path.join(import.meta.dirname, '..', '..', 'data', 'cards.json');

export const getCards = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(cardsPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: 'An error has ocurred on the server' });
  }
};