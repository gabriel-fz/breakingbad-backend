import { injectable, inject } from 'tsyringe';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import IFilterCharactersDTO from '@modules/characters/dtos/IFilterCharactersDTO';
import Character from '../infra/typeorm/entities/Character';

@injectable()
class ListCharacterService {
  private charactersRepository: ICharactersRepository;

  constructor(
    @inject('CharactersRepository')
    charactersRepository: ICharactersRepository,
  ) {
    this.charactersRepository = charactersRepository;
  }

  public async execute(filter: IFilterCharactersDTO): Promise<Character[]> {
    const characters = await this.charactersRepository.findByFilter(filter);

    return characters;
  }
}

export default ListCharacterService;
