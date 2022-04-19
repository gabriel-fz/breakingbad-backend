/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import Character from '../infra/typeorm/entities/Character';

interface IRequest {
  character_id: string;
}

@injectable()
class RemoveCharacterService {
  private charactersRepository: ICharactersRepository;

  constructor(
    @inject('CharactersRepository')
    charactersRepository: ICharactersRepository,
  ) {
    this.charactersRepository = charactersRepository;
  }

  public async execute({ character_id }: IRequest): Promise<Character> {
    const character = await this.charactersRepository.findById(character_id);

    if (!character) {
      throw new AppError('Character not found');
    }

    const characterRemoved = await this.charactersRepository.remove(character);

    return characterRemoved;
  }
}

export default RemoveCharacterService;
