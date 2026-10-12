/**
 * ShelterAnimal Domain Entity
 * @summary Domain entity representing an individual rescued pet intake
 * @author Rafael André Barrenechea Bustamante
 */
export class ShelterAnimal {
  /**
   * @param {Object} params
   * @param {number|null} [params.id]
   * @param {number} params.locationId
   * @param {string} params.dogBreed
   * @param {string} params.petName
   * @param {string} [params.registeredAt]
   */
  constructor({
    id = null,
    locationId = 0,
    dogBreed = '',
    petName = '',
    registeredAt = ''
  } = {}) {
    this.id = id ? Number(id) : null;
    this.locationId = Number(locationId);
    this.dogBreed = String(dogBreed).toLowerCase();
    this.petName = String(petName).trim();
    this.registeredAt = registeredAt || new Date().toISOString();
  }
}
