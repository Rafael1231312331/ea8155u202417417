
export class ShelterAnimal {

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
