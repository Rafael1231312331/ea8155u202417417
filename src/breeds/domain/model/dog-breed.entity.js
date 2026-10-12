/**
 * DogBreed Domain Entity
 * @author Rafael André Barrenechea Bustamante
 */
export class DogBreed {

  constructor({ name = '', subBreeds = [] } = {}) {
    this.name = String(name).toLowerCase();
    this.subBreeds = Array.isArray(subBreeds) ? subBreeds : [];
  }
}
