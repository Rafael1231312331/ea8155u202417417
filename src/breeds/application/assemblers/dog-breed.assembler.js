/**
 * DogBreed Assembler
 * @author Rafael André Barrenechea Bustamante
 */
import { DogBreed } from '../../domain/model/dog-breed.entity';

export class DogBreedAssembler {

  static toEntitiesFromMessageMap(messageMap) {
    if (!messageMap || typeof messageMap !== 'object') return [];
    return Object.keys(messageMap).map(breedName => {
      return new DogBreed({
        name: breedName,
        subBreeds: messageMap[breedName]
      });
    });
  }
}
