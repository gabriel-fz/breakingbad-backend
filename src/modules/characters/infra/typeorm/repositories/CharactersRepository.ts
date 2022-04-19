import { getRepository, Repository, Like } from 'typeorm';
import Character from '@modules/characters/infra/typeorm/entities/Character';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import IFilterCharactersDTO from '@modules/characters/dtos/IFilterCharactersDTO';

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

  public async findByFilter({
    name,
    order,
    limit,
    offset,
  }: IFilterCharactersDTO): Promise<Character[]> {
    const character = await this.ormRepository.find({
      where: { name: Like(`${name}%`) },
      order: {
        name: order,
      },
      take: limit,
      skip: (offset - 1) * limit,
    });

    return character;
  }
}

export default CharactersRepository;
