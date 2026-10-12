
/**

 * Breeds Infrastructure Service

 * @summary Consumes external Dog CEO API for breed lists and random images

 * @author Rafael André Barrenechea Bustamante

 */

import axios from 'axios';

import { DogBreedAssembler } from '../../application/assemblers/dog-breed.assembler';



const dogCeoClient = axios.create({

 baseURL: import.meta.env.VITE_DOG_CEO_API_BASE_URL || 'https://dog.ceo/api'

});



export class BreedsService {

 /**

  * Fetches all breeds from Dog CEO API

  * @returns {Promise<import('../../domain/model/dog-breed.entity').DogBreed[]>}

  */

 static async getAllBreeds() {

  try {

   const response = await dogCeoClient.get('/breeds/list/all');

   return DogBreedAssembler.toEntitiesFromMessageMap(response.data.message);

  } catch (error) {

   console.error('Error fetching breeds from Dog CEO API:', error);

   throw error;

  }

 }



 /**

  * Fetches a random image URL for a specified breed

  * @param {string} breedName

  * @returns {Promise<string>}

  */

 static async getRandomImageByBreed(breedName) {

  try {

   const formatted = String(breedName).trim().toLowerCase();

   const response = await dogCeoClient.get(`/breed/${formatted}/images/random`);

   return response.data && response.data.message ? response.data.message : '';

  } catch (error) {

   console.error(`Error fetching random image for breed ${breedName}:`, error);

   return '';

  }

 }

}

