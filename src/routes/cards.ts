import { Router } from 'express';
import { getCards } from '../controllers/cards.js';

const cardsRouter = Router();

cardsRouter.get('/', getCards);

export default cardsRouter;