import type { Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';

// Construcción segura de la ruta absoluta usando import.meta.dirname y path.join
const usersPath = path.join(import.meta.dirname, '..', '..', 'data', 'users.json');

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(usersPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(usersPath, 'utf-8');
    const users = JSON.parse(data);

    const user = users.find((u: { _id: string }) => u._id === id);

    if (!user) {
      return res.status(404).json({ message: 'ID de usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};