import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CharactersController from '../controllers/CharactersController';

const appointmentsRouter = Router();
const charactersController = new CharactersController();

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  charactersController.create,
);

appointmentsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      character_id: Joi.string().required(),
      new_name: Joi.string().required(),
    },
  }),
  charactersController.update,
);

export default appointmentsRouter;
