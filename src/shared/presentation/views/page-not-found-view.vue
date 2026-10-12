<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const navigateHome = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center py-8 text-center" role="alert" aria-label="Page Not Found">
    <i class="pi pi-exclamation-triangle text-6xl text-orange-500 mb-3" />
    <h1 class="text-3xl font-bold text-900 mb-2">{{ t('notFound.title') }}</h1>
    <p class="text-600 text-lg mb-4">{{ t('notFound.message', { path: route.path }) }}</p>
    <pv-button
      :label="t('notFound.backHome')"
      icon="pi pi-home"
      @click="navigateHome"
      aria-label="Return to Home"
    />
  </div>
</template>
