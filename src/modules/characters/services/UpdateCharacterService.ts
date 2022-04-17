/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import Character from '../infra/typeorm/entities/Character';

interface IRequest {
  character_id: string;
  new_name: string;
}

@injectable()
class UpdateCharacterService {
  private charactersRepository: ICharactersRepository;

  constructor(
    @inject('CharactersRepository')
    charactersRepository: ICharactersRepository,
  ) {
    this.charactersRepository = charactersRepository;
  }

  public async execute({
    character_id,
    new_name,
  }: IRequest): Promise<Character> {
    const character = await this.charactersRepository.findById(character_id);

    if (!character) {
      throw new AppError('Character not found');
    }

    const checkNameExists = await this.charactersRepository.findByName(
      new_name,
    );

    if (checkNameExists && checkNameExists.name !== character.name) {
      throw new AppError('Name already used.');
    }

    character.name = new_name;

    await this.charactersRepository.save(character);

    return character;
  }
}

export default UpdateCharacterService;
