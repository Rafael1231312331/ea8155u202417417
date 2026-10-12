
/**

 * DogBreed Domain Entity

 * @summary Domain entity representing a dog breed from Dog CEO API

 * @author Rafael André Barrenechea Bustamante

 */

export class DogBreed {

 /**

  * @param {Object} params

  * @param {string} params.name

  * @param {Array<string>} [params.subBreeds]

  */

 constructor({ name = '', subBreeds = [] } = {}) {

  this.name = String(name).toLowerCase();

  this.subBreeds = Array.isArray(subBreeds) ? subBreeds : [];

 }

}

