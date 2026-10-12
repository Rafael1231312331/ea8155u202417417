/**
 * DogBreed Assembler
 * @summary Transforms raw Dog CEO API responses into domain DogBreed entities
 * @author Rafael André Barrenechea Bustamante
 */
import { DogBreed } from '../../domain/model/dog-breed.entity';

export class DogBreedAssembler {
  /**
   * Converts the message dictionary from /breeds/list/all into an array of DogBreed entities
   * @param {Object} messageMap
   * @returns {DogBreed[]}
   */
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
