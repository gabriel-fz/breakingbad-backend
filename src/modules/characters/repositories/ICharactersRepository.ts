import Character from '@modules/characters/infra/typeorm/entities/Character';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';

export default interface ICharactersRepository {
  findByName(name: string): Promise<Character | undefined>;
  create(data: ICreateCharacterDTO): Promise<Character>;
  save(character: Character): Promise<Character>;
}
