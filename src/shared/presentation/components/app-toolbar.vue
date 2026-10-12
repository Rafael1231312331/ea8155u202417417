<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

defineEmits(['toggle-sidebar']);

const { t } = useI18n();
const router = useRouter();

const navigateHome = () => {
  router.push({ name: 'home' });
};

const logoUrl = `${import.meta.env.VITE_LOGO_DEV_BASE_URL}/${import.meta.env.VITE_CLIENT_DOMAIN}`;

const onLogoError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&auto=format&fit=crop&q=60';
};
</script>

<template>
  <pv-toolbar class="surface-card border-none shadow-2 px-4 py-2" role="banner" aria-label="Main Toolbar">
    <template #start>
      <div class="flex align-items-center">
        <pv-button
          icon="pi pi-bars"
          text
          severity="secondary"
          @click="\$emit('toggle-sidebar')"
          class="mr-2"
          aria-label="Open Navigation Sidebar"
        />
        <div class="flex align-items-center cursor-pointer" @click="navigateHome">
          <img
            :src="logoUrl"
            alt="Paws & Claws Logo"
            class="mr-3 border-round"
            style="width: 36px; height: 36px; object-fit: cover;"
            @error="onLogoError"
          />
          <span class="font-bold text-lg text-900 tracking-tight">{{ t('toolbar.tagline') }}</span>
        </div>
      </div>
    </template>
  </pv-toolbar>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
