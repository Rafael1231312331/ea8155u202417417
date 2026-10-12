
/**

 * ShelterAnimal Assembler

 * @summary Transforms raw animal resources into domain ShelterAnimal entities

 * @author Rafael André Barrenechea Bustamante

 */

import { ShelterAnimal } from '../../domain/model/shelter-animal.entity';



export class ShelterAnimalAssembler {

 /**

  * Converts a single raw animal object to a ShelterAnimal entity

  * @param {Object} resource

  * @returns {ShelterAnimal}

  */

 static toEntityFromResource(resource) {

  if (!resource) return new ShelterAnimal();

  return new ShelterAnimal({

   id: resource.id,

   locationId: resource.locationId,

   dogBreed: resource.dogBreed,

   petName: resource.petName,

   registeredAt: resource.registeredAt

  });

 }



 /**

  * Converts an array of raw animal objects to ShelterAnimal entities

  * @param {Array<Object>} resources

  * @returns {ShelterAnimal[]}

  */

 static toEntitiesFromResources(resources) {

  if (!Array.isArray(resources)) return [];

  return resources.map(res => this.toEntityFromResource(res));

 }

}

