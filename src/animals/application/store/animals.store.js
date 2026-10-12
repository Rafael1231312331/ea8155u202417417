
/**

 * Animals Pinia Store

 * @summary Centralized state management for shelter locations, animal intakes, and capacity metrics

 * @author Rafael André Barrenechea Bustamante

 */

import { defineStore } from 'pinia';

import { AnimalsService } from '../../infrastructure/services/animals.service';



export const useAnimalsStore = defineStore('animals', {

 state: () => ({

  locations: [],

  animals: [],

  loading: false,

  error: null

 }),



 getters: {

  /**

   * Calculates summary metrics for each shelter location

   * @returns {Array<Object>}

   */

  locationSummaries(state) {

   return state.locations.map(location => {

    const locationAnimals = state.animals.filter(a => a.locationId === location.id);

    const totalAnimals = locationAnimals.length;

    const availableCapacity = Math.max(0, location.maxCapacity - totalAnimals);



    return {

     id: location.id,

     name: location.name,

     dogBreeds: location.dogBreeds,

     maxCapacity: location.maxCapacity,

     animals: locationAnimals.map(a => ({

      id: a.id,

      petName: a.petName,

      dogBreed: a.dogBreed

     })),

     totalAnimals,

     availableCapacity

    };

   });

  },



  /**

   * Computes available capacity for a specific location

   * @returns {Function}

   */

  getAvailableCapacity(state) {

   return (locationId) => {

    const loc = state.locations.find(l => l.id === locationId);

    if (!loc) return 0;

    const totalCurrent = state.animals.filter(a => a.locationId === locationId).length;

    return Math.max(0, loc.maxCapacity - totalCurrent);

   };

  }

 },



 actions: {

  /**

   * Loads shelter locations and animals concurrently

   */

  async loadAll() {

   this.loading = true;

   this.error = null;

   try {

    const [locations, animals] = await Promise.all([

     AnimalsService.getShelterLocations(),

     AnimalsService.getShelterAnimals()

    ]);

    this.locations = locations;

    this.animals = animals;

   } catch (err) {

    console.error('Failed to load shelter data:', err);

    this.error = err;

   } finally {

    this.loading = false;

   }

  },



  /**

   * Persists a new shelter animal intake and updates store state

   * @param {Object} animalData

   */

  async addAnimal(animalData) {

   const created = await AnimalsService.createShelterAnimal(animalData);

   this.animals.push(created);

   return created;

  }

 }

});

