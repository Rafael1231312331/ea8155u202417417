
export class ShelterLocation {
  constructor({ id = 0, name = '', dogBreeds = '', maxCapacity = 0 } = {}) {
    this.id = Number(id);
    this.name = String(name);
    this.dogBreeds = String(dogBreeds);
    this.maxCapacity = Number(maxCapacity);
  }
  getAcceptedBreeds() {
    if (!this.dogBreeds) return [];
    return this.dogBreeds.split(',').map(b => b.trim().toLowerCase());
  }
}
