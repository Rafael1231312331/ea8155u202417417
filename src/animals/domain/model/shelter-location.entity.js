/**
 * ShelterLocation Domain Entity
 * @summary Domain entity representing a Paws & Claws shelter location
 * @author Rafael André Barrenechea Bustamante
 */
export class ShelterLocation {
  /**
   * @param {Object} params
   * @param {number} params.id
   * @param {string} params.name
   * @param {string} params.dogBreeds
   * @param {number} params.maxCapacity
   */
  constructor({ id = 0, name = '', dogBreeds = '', maxCapacity = 0 } = {}) {
    this.id = Number(id);
    this.name = String(name);
    this.dogBreeds = String(dogBreeds);
    this.maxCapacity = Number(maxCapacity);
  }

  /**
   * Returns parsed list of accepted breeds for this location
   * @returns {string[]}
   */
  getAcceptedBreeds() {
    if (!this.dogBreeds) return [];
    return this.dogBreeds.split(',').map(b => b.trim().toLowerCase());
  }
}
