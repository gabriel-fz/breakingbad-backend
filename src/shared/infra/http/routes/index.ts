import { Router } from 'express';
import charactersRouter from '@modules/characters/infra/http/routes/characters.routes';

const routes = Router();

routes.use('/character', charactersRouter);

export default routes;
