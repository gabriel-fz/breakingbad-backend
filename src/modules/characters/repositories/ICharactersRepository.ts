import Character from '@modules/characters/infra/typeorm/entities/Character';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';

export default interface ICharactersRepository {
  findById(id: string): Promise<Character | undefined>;
  findByName(name: string): Promise<Character | undefined>;
  create(data: ICreateCharacterDTO): Promise<Character>;
  save(character: Character): Promise<Character>;
  remove(character: Character): Promise<Character>;
}
