import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import Character from '../infra/typeorm/entities/Character';

interface IRequest {
  name: string;
}

@injectable()
class CreateCharacterService {
  private charactersRepository: ICharactersRepository;

  constructor(
    @inject('CharactersRepository')
    charactersRepository: ICharactersRepository,
  ) {
    this.charactersRepository = charactersRepository;
  }

  public async execute({ name }: IRequest): Promise<Character> {
    if (await this.charactersRepository.findByName(name)) {
      throw new AppError('Email address already used.');
    }

    const character = await this.charactersRepository.create({
      name,
    });

    return character;
  }
}

export default CreateCharacterService;
