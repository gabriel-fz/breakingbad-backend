import { uuid } from 'uuidv4';
import Character from '@modules/characters/infra/typeorm/entities/Character';

import ICharactersRepository from '@modules/characters/repositories/ICharactersRepository';
import ICreateCharacterDTO from '@modules/characters/dtos/ICreateCharacterDTO';

class FakeCharactersRepository implements ICharactersRepository {
  private characters: Character[] = [];

  public async create({ name }: ICreateCharacterDTO): Promise<Character> {
    const character = new Character();

    Object.assign(character, { id: uuid(), name });

    this.characters.push(character);

    return character;
  }

  public async save(character: Character): Promise<Character> {
    const findIndex = this.characters.findIndex(
      findCharacter => findCharacter.id === character.id,
    );

    this.characters[findIndex] = character;

    return character;
  }

  public async remove(character: Character): Promise<Character> {
    const findIndex = this.characters.findIndex(
      findCharacter => findCharacter.id === character.id,
    );

    this.characters[findIndex].deleted_at = new Date();

    return this.characters[findIndex];
  }

  public async findById(id: string): Promise<Character | undefined> {
    const character = this.characters.find(
      characterStored => characterStored.id === id,
    );
    return character;
  }

  public async findByName(name: string): Promise<Character | undefined> {
    const character = this.characters.find(
      characterStored => characterStored.name === name,
    );

    return character;
  }
}

export default FakeCharactersRepository;
