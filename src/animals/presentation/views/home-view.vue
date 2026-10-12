<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAnimalsStore } from '../../application/store/animals.store';
import ShelterLocationSummary from '../components/shelter-location-summary.vue';

const { t } = useI18n();
const animalsStore = useAnimalsStore();

onMounted(async () => {
  if (animalsStore.locations.length === 0) {
    await animalsStore.loadAll();
  }
});
</script>

<template>
  <div class="card p-4 surface-card border-round shadow-1" role="region" aria-label="Home View">
    <header class="mb-4">
      <h1 class="text-3xl font-bold text-900 mb-1">{{ t('home.title') }}</h1>
      <p class="text-600 text-lg font-italic m-0">{{ t('home.subtitle') }}</p>
    </header>

    <section aria-labelledby="shelter-intakes-heading" class="mt-4">
      <h2 id="shelter-intakes-heading" class="text-2xl font-semibold text-800 mb-4">
        {{ t('home.myShelterIntakes') }}
      </h2>

      <div v-if="animalsStore.loading" class="flex justify-content-center align-items-center py-8">
        <i class="pi pi-spin pi-spinner text-4xl text-primary" />
      </div>

      <div v-else class="grid">
        <div
          v-for="location in animalsStore.locationSummaries"
          :key="location.id"
          class="col-12 md:col-6 p-3"
        >
          <shelter-location-summary :location="location" />
        </div>
      </div>
    </section>
  </div>
</template>
