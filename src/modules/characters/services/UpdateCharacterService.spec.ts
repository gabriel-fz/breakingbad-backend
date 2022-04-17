import AppError from '@shared/errors/AppError';

import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import UpdateCharacterService from '@modules/characters/services/UpdateCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let updateCharacterService: UpdateCharacterService;

describe('CreateCharacter', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();

    updateCharacterService = new UpdateCharacterService(
      fakeCharactersRepository,
    );
  });

  it('should be able to update character', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Walter White',
    });

    await updateCharacterService.execute({
      character_id: character.id,
      new_name: 'Jesse Pinkman',
    });

    expect(character.name).toBe('Jesse Pinkman');
  });

  it('should not be able to update a non-existing character', async () => {
    await expect(
      updateCharacterService.execute({
        character_id: '123',
        new_name: 'Walter White',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update a character with an name already taken', async () => {
    const characterName = 'Jesse Pinkman';

    const character = await fakeCharactersRepository.create({
      name: 'Walter White',
    });

    await fakeCharactersRepository.create({
      name: characterName,
    });

    await expect(
      updateCharacterService.execute({
        character_id: character.id,
        new_name: characterName,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
