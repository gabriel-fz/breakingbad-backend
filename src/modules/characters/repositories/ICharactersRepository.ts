import Character from '@modules/characters/infra/typeorm/entities/Character';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';
import IFilterCharactersDTO from '@modules/characters/dtos/IFilterCharactersDTO';

export default interface ICharactersRepository {
  findById(id: string): Promise<Character | undefined>;
  findByName(name: string): Promise<Character | undefined>;
  findByFilter(filter: IFilterCharactersDTO): Promise<Character[]>;
  create(data: ICreateCharacterDTO): Promise<Character>;
  save(character: Character): Promise<Character>;
  remove(character: Character): Promise<Character>;
}
