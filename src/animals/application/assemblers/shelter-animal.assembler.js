/**
 * @summary Transforms raw animal resources into domain ShelterAnimal entities
 * @author Rafael André Barrenechea Bustamante
 */
import { ShelterAnimal } from '../../domain/model/shelter-animal.entity';

export class ShelterAnimalAssembler {

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


  static toEntitiesFromResources(resources) {
    if (!Array.isArray(resources)) return [];
    return resources.map(res => this.toEntityFromResource(res));
  }
}
