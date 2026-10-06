import type { Request, Response } from 'express';
import Card from '../models/card.js';

// GET /cards — Devuelve todas las tarjetas con isLiked
export const getCards = async (req: Request, res: Response): Promise<void> => {
  const cards = await Card.find({});
  const userId = req.user?._id;

  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  }));

  res.json({ data: cardsWithIsLiked });
};

// POST /cards — Crea una nueva tarjeta
export const createCard = async (req: Request, res: Response): Promise<void> => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  if (!owner) {
    throw Object.assign(new Error('No autorizado: ID de usuario no presente'), {
      statusCode: 401,
    });
  }

  const card = await Card.create({ name, link, owner });
  res.status(201).json({ data: card });
};

// DELETE /cards/:id — Elimina una tarjeta por su _id
export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const card = await Card.findByIdAndDelete(id);

  if (!card) {
    throw Object.assign(new Error('No se encontró ninguna tarjeta con ese id'), {
      statusCode: 404,
    });
  }

  res.json({ message: 'Tarjeta eliminada con éxito', data: card });
};

// PUT /cards/:id/likes — Da like a una tarjeta
export const likeCard = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;

  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: userId } },
    { new: true },
  );

  if (!card) {
    throw Object.assign(new Error('No se encontró ninguna tarjeta con ese id'), {
      statusCode: 404,
    });
  }

  res.json({
    data: {
      ...card.toObject(),
      isLiked: card.likes.some((id) => id.toString() === userId),
    },
  });
};

// DELETE /cards/:id/likes — Le quita el like a una tarjeta
export const dislikeCard = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;

  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: userId } },
    { new: true },
  );

  if (!card) {
    throw Object.assign(new Error('No se encontró ninguna tarjeta con ese id'), {
      statusCode: 404,
    });
  }

  res.json({
    data: {
      ...card.toObject(),
      isLiked: card.likes.some((id) => id.toString() === userId),
    },
  });
};