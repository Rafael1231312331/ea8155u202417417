<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  location: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();
</script>

<template>
  <pv-card class="h-full shadow-2 border-round overflow-hidden flex flex-column justify-content-between" role="article" :aria-label="location.name">
    <template #header>
      <div class="surface-900 text-white px-4 py-3 border-top-2 border-primary">
        <h3 class="text-xl font-bold m-0">{{ location.name }}</h3>
        <span class="text-xs text-300 font-medium mt-1 block">
          Specialized in: {{ location.dogBreeds }}
        </span>
      </div>
    </template>

    <template #content>
      <div class="p-2">
        <div v-if="!location.animals || location.animals.length === 0" class="text-500 font-italic py-3 text-center">
          {{ t('home.noAnimals') }}
        </div>
        <ul v-else class="list-none p-0 m-0 flex flex-column gap-2">
          <li
            v-for="animal in location.animals"
            :key="animal.id"
            class="flex align-items-center justify-content-between border-bottom-1 surface-border pb-2"
          >
            <span class="font-bold text-800">
              {{ animal.petName }}
            </span>
            <span class="text-sm font-semibold text-primary capitalize white-space-nowrap">
              {{ animal.dogBreed }}
            </span>
          </li>
        </ul>
      </div>
    </template>

    <template #footer>
      <div class="border-top-1 surface-border pt-3 mt-2 flex justify-content-between text-sm">
        <div>
          <span class="text-600 font-medium block">{{ t('home.totalAnimals') }}:</span>
          <span class="text-lg font-bold text-900">{{ location.totalAnimals }}</span>
        </div>
        <div class="text-right">
          <span class="text-600 font-medium block">{{ t('home.availableCapacity') }}:</span>
          <span class="text-lg font-bold text-green-600">{{ location.availableCapacity }}</span>
        </div>
      </div>
    </template>
  </pv-card>
</template>
