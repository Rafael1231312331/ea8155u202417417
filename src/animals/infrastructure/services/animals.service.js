
/**

 * Animals Infrastructure Service

 * @summary Communicates with backend endpoints for shelter locations and animal intakes

 * @author Rafael André Barrenechea Bustamante

 */

import http from '../../../shared/infrastructure/services/http-common';

import { ShelterLocation } from '../../domain/model/shelter-location.entity';

import { ShelterAnimalAssembler } from '../../application/assemblers/shelter-animal.assembler';



export class AnimalsService {

 /**

  * Retrieves all shelter locations

  * @returns {Promise<ShelterLocation[]>}

  */

 static async getShelterLocations() {

  const response = await http.get('/shelter-locations');

  return response.data.map(item => new ShelterLocation(item));

 }



 /**

  * Retrieves all rescued shelter animals

  * @returns {Promise<import('../../domain/model/shelter-animal.entity').ShelterAnimal[]>}

  */

 static async getShelterAnimals() {

  const response = await http.get('/shelter-animals');

  return ShelterAnimalAssembler.toEntitiesFromResources(response.data);

 }



 /**

  * Registers a new rescued animal intake

  * @param {import('../../domain/model/shelter-animal.entity').ShelterAnimal|Object} animalData

  * @returns {Promise<import('../../domain/model/shelter-animal.entity').ShelterAnimal>}

  */

 static async createShelterAnimal(animalData) {

  const payload = {

   locationId: Number(animalData.locationId),

   dogBreed: String(animalData.dogBreed).toLowerCase(),

   petName: String(animalData.petName).trim(),

   registeredAt: animalData.registeredAt || new Date().toISOString()

  };

  const response = await http.post('/shelter-animals', payload);

  return ShelterAnimalAssembler.toEntityFromResource(response.data);

 }

}

