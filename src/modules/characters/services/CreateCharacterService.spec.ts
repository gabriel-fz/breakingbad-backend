import AppError from '@shared/errors/AppError';

import FakeCharactersRepository from '@modules/characters/repositories/fakes/FakeCharactersRepository';
import CreateCharacterService from '@modules/characters/services/CreateCharacterService';

let fakeCharactersRepository: FakeCharactersRepository;
let createCharacterService: CreateCharacterService;

describe('CreateCharacter', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();

    createCharacterService = new CreateCharacterService(
      fakeCharactersRepository,
    );
  });

  it('should be able to create a new character', async () => {
    const character = await createCharacterService.execute({
      name: 'Walter White',
    });

    expect(character).toHaveProperty('id');
  });

  it('should not create a character with an name already taken', async () => {
    await createCharacterService.execute({
      name: 'Walter White',
    });

    await expect(
      createCharacterService.execute({
        name: 'Walter White',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
