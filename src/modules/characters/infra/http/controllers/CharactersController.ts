/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCharacterService from '@modules/characters/services/CreateCharacterService';
import UpdateCharacterService from '@modules/characters/services/UpdateCharacterService';

class CharactersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCharacter = container.resolve(CreateCharacterService);

    const character = await createCharacter.execute({ name });

    return response.status(200).json(classToClass(character));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { character_id, new_name } = request.body;

    const updateCharacterService = container.resolve(UpdateCharacterService);

    const character = await updateCharacterService.execute({
      character_id,
      new_name,
    });

    return response.status(200).json(classToClass(character));
  }
}

export default CharactersController;
