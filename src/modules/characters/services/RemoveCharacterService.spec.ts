import AppError from '@shared/errors/AppError';

import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import RemoveCharacterService from '@modules/characters/services/RemoveCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let removeCharacterService: RemoveCharacterService;

describe('RemoveCharacter', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();

    removeCharacterService = new RemoveCharacterService(
      fakeCharactersRepository,
    );
  });

  it('should be able to delete character', async () => {
    const character = await fakeCharactersRepository.create({
      name: 'Walter White',
    });

    const characterRemoved = await removeCharacterService.execute({
      character_id: character.id,
    });

    expect(characterRemoved).toHaveProperty('deleted_at');
  });

  it('should not be able to delete a non-existing character', async () => {
    await expect(
      removeCharacterService.execute({
        character_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
