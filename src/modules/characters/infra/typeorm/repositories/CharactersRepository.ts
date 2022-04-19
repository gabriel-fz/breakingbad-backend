import { getRepository, Repository } from 'typeorm';
import Character from '@modules/characters/infra/typeorm/entities/Character';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';

class CharactersRepository implements ICharactersRepository {
  private ormRepository: Repository<Character>;

  constructor() {
    this.ormRepository = getRepository(Character);
  }

  public async create({ name }: ICreateCharacterDTO): Promise<Character> {
    const character = this.ormRepository.create({ name });

    return this.ormRepository.save(character);
  }

  public async save(character: Character): Promise<Character> {
    return this.ormRepository.save(character);
  }

  public async remove(character: Character): Promise<Character> {
    return this.ormRepository.softRemove(character);
  }

  public async findById(id: string): Promise<Character | undefined> {
    const character = await this.ormRepository.findOne(id);

    return character;
  }

  public async findByName(name: string): Promise<Character | undefined> {
    const character = await this.ormRepository.findOne({ where: { name } });

    return character;
  }
}

export default CharactersRepository;
