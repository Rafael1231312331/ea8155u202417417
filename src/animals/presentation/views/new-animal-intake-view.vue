<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { useAnimalsStore } from '../../application/store/animals.store';
import { BreedsService } from '../../../breeds/infrastructure/services/breeds.service';

const router = useRouter();
const toast = useToast();
const { t } = useI18n();
const animalsStore = useAnimalsStore();

const isSubmitting = ref(false);
const loadingBreeds = ref(false);
const allBreeds = ref([]);
const filteredBreeds = ref([]);
const breedImageUrl = ref('');
const loadingImage = ref(false);

const formData = reactive({
  locationId: null,
  dogBreed: '',
  petName: ''
});

const selectedLocation = computed(() => {
  if (!formData.locationId) return null;
  return animalsStore.locations.find(l => l.id === formData.locationId);
});

const availableCapacity = computed(() => {
  if (!formData.locationId) return 0;
  return animalsStore.getAvailableCapacity(formData.locationId);
});

const updateFilteredBreeds = () => {
  if (!selectedLocation.value || allBreeds.value.length === 0) {
    filteredBreeds.value = [];
    return;
  }
  const accepted = selectedLocation.value.getAcceptedBreeds();
  filteredBreeds.value = allBreeds.value.filter(breed => {
    return accepted.some(acc => breed.name.includes(acc) || acc.includes(breed.name));
  });
};

watch(() => formData.locationId, () => {
  formData.dogBreed = '';
  breedImageUrl.value = '';
  updateFilteredBreeds();
});

watch(() => formData.dogBreed, async (newBreed) => {
  if (!newBreed) {
    breedImageUrl.value = '';
    return;
  }
  loadingImage.value = true;
  try {
    breedImageUrl.value = await BreedsService.getRandomImageByBreed(newBreed);
  } catch (error) {
    console.error('Failed to load breed preview image:', error);
    breedImageUrl.value = '';
  } finally {
    loadingImage.value = false;
  }
});

const navigateHome = () => {
  router.push({ name: 'home' });
};

const onSubmit = async () => {
  if (!formData.locationId || !formData.dogBreed || !formData.petName.trim()) {
    toast.add({
      severity: 'error',
      summary: 'Validation',
      detail: t('newAnimalIntake.validationError'),
      life: 3000
    });
    return;
  }

  if (availableCapacity.value <= 0) {
    toast.add({
      severity: 'error',
      summary: 'Capacity Limit',
      detail: t('newAnimalIntake.capacityError'),
      life: 4000
    });
    return;
  }

  isSubmitting.value = true;
  try {
    await animalsStore.addAnimal({
      locationId: formData.locationId,
      dogBreed: formData.dogBreed,
      petName: formData.petName
    });

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: t('newAnimalIntake.successMessage'),
      life: 3000
    });

    router.push({ name: 'home' });
  } catch (error) {
    console.error('Failed to register animal intake:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to register animal intake.',
      life: 4000
    });
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  loadingBreeds.value = true;
  try {
    await Promise.all([
      animalsStore.loadAll(),
      BreedsService.getAllBreeds().then(res => { allBreeds.value = res; })
    ]);
  } catch (err) {
    console.error('Initialization error:', err);
  } finally {
    loadingBreeds.value = false;
  }
});
</script>

<template>
  <div class="card p-4 surface-card border-round shadow-1 max-w-40rem mx-auto" role="region" aria-label="New Animal Intake Form">
    <header class="mb-4">
      <h1 class="text-2xl font-bold text-900 m-0">{{ t('newAnimalIntake.title') }}</h1>
      <p class="text-600 text-sm m-0 mt-1">{{ t('newAnimalIntake.subtitle') }}</p>
    </header>

    <div class="grid">
      <div class="col-12 md:col-7">
        <form @submit.prevent="onSubmit" class="flex flex-column gap-3" role="form">
          <!-- Shelter Location -->
          <div class="flex flex-column gap-1">
            <label for="shelterLocation" class="font-medium text-700">{{ t('newAnimalIntake.shelterLocation') }} *</label>
            <pv-select
              id="shelterLocation"
              v-model="formData.locationId"
              :options="animalsStore.locations"
              optionLabel="name"
              optionValue="id"
              :placeholder="t('newAnimalIntake.selectLocation')"
              class="w-full"
              aria-label="Select Shelter Location"
            />
            <small v-if="selectedLocation" class="text-600">
              Capacity: <strong>{{ availableCapacity }}</strong> available slots remaining
            </small>
          </div>

          <!-- Dog Breed -->
          <div class="flex flex-column gap-1">
            <label for="dogBreed" class="font-medium text-700">{{ t('newAnimalIntake.dogBreed') }} *</label>
            <pv-select
              id="dogBreed"
              v-model="formData.dogBreed"
              :options="filteredBreeds"
              optionLabel="name"
              optionValue="name"
              :placeholder="t('newAnimalIntake.selectBreed')"
              :disabled="!formData.locationId || loadingBreeds"
              class="w-full capitalize"
              aria-label="Select Dog Breed"
            />
          </div>

          <!-- Pet Name -->
          <div class="flex flex-column gap-1">
            <label for="petName" class="font-medium text-700">{{ t('newAnimalIntake.petName') }} *</label>
            <pv-input-text
              id="petName"
              v-model="formData.petName"
              :placeholder="t('newAnimalIntake.enterPetName')"
              required
              class="w-full"
              aria-label="Pet Name"
            />
          </div>

          <!-- Actions -->
          <div class="flex gap-2 mt-2">
            <pv-button
              type="submit"
              :label="t('newAnimalIntake.createButton')"
              icon="pi pi-check"
              :loading="isSubmitting"
              class="flex-1"
            />
            <pv-button
              type="button"
              :label="t('newAnimalIntake.cancelButton')"
              severity="secondary"
              text
              @click="navigateHome"
            />
          </div>
        </form>
      </div>

      <!-- Image Preview Lateral -->
      <div class="col-12 md:col-5 flex flex-column align-items-center justify-content-center">
        <span class="text-xs font-bold text-600 mb-2 uppercase tracking-wider">{{ t('newAnimalIntake.imagePreview') }}</span>
        <div class="w-full border-round surface-200 overflow-hidden flex align-items-center justify-content-center shadow-1" style="height: 220px;">
          <div v-if="loadingImage" class="p-4 text-center">
            <i class="pi pi-spin pi-spinner text-3xl text-primary" />
          </div>
          <img
            v-else-if="breedImageUrl"
            :src="breedImageUrl"
            alt="Selected Breed Preview"
            class="w-full h-full"
            style="object-fit: cover;"
          />
          <div v-else class="text-400 text-center p-3">
            <i class="pi pi-image text-4xl mb-2 block" />
            <span class="text-xs">Select a breed to preview image</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
