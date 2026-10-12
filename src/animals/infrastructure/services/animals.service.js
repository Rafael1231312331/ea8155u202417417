/**
 * Animals Infrastructure Service
 * @author Rafael André Barrenechea Bustamante
 */
import http from '../../../shared/infrastructure/services/http-common';
import { ShelterLocation } from '../../domain/model/shelter-location.entity';
import { ShelterAnimalAssembler } from '../../application/assemblers/shelter-animal.assembler';

export class AnimalsService {

  static async getShelterLocations() {
    const response = await http.get('/shelter-locations');
    return response.data.map(item => new ShelterLocation(item));
  }

 
  static async getShelterAnimals() {
    const response = await http.get('/shelter-animals');
    return ShelterAnimalAssembler.toEntitiesFromResources(response.data);
  }


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
