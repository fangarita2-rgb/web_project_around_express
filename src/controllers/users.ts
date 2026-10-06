import type { Request, Response } from 'express';
import User from '../models/user.js';

// GET /users — Devuelve todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find({});
  res.json({ data: users });
};

// GET /users/me — Devuelve el usuario actual
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;

  if (!userId) {
    throw Object.assign(new Error('No autorizado: ID de usuario no presente'), {
      statusCode: 401,
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    throw Object.assign(new Error('No se encontró el usuario actual'), {
      statusCode: 404,
    });
  }

  res.json({ data: user });
};

// GET /users/:id — Devuelve un usuario por su _id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw Object.assign(new Error('No se encontró ningún usuario con ese id'), {
      statusCode: 404,
    });
  }

  res.json({ data: user });
};

// POST /users — Crea un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, about, avatar } = req.body;
  const user = await User.create({ name, about, avatar });

  res.status(201).json({ data: user });
};

// PATCH /users/me — Actualiza el perfil del usuario actual
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw Object.assign(new Error('No se encontró el usuario actual'), {
      statusCode: 404,
    });
  }

  res.json({ data: user });
};

// PATCH /users/me/avatar — Actualiza el avatar del usuario actual
export const updateAvatar = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw Object.assign(new Error('No se encontró el usuario actual'), {
      statusCode: 404,
    });
  }

  res.json({ data: user });
};