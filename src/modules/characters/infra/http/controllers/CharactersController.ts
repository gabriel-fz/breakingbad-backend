import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCharacterService from '@modules/characters/services/CreateCharacterService';

class CharactersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCharacter = container.resolve(CreateCharacterService);

    const character = await createCharacter.execute({ name });

    return response.status(200).json(classToClass(character));
  }
}

export default CharactersController;
