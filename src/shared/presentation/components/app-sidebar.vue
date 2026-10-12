<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:visible']);

const { locale, t } = useI18n();
const router = useRouter();

const languageOptions = ref([
  { label: 'EN', value: 'en' },
  { label: 'ES', value: 'es' }
]);

const currentLocale = ref(locale.value);

const onLanguageChange = () => {
  locale.value = currentLocale.value;
};

const navigateTo = (routeName) => {
  emit('update:visible', false);
  router.push({ name: routeName });
};
</script>

<template>
  <pv-sidebar
    :visible="visible"
    @update:visible="(val) => \$emit('update:visible', val)"
    header="Paws & Claws"
    class="w-20rem flex flex-column justify-content-between"
    role="navigation"
    aria-label="Sidebar Navigation"
  >
    <div class="flex flex-column gap-2 mt-3">
      <pv-button
        :label="t('sidebar.home')"
        icon="pi pi-home"
        text
        severity="secondary"
        @click="navigateTo('home')"
        class="justify-content-start w-full text-left font-semibold"
      />
      <pv-button
        :label="t('sidebar.newAnimalIntake')"
        icon="pi pi-plus"
        text
        severity="secondary"
        @click="navigateTo('new-animal-intake')"
        class="justify-content-start w-full text-left font-semibold"
      />
    </div>

    <template #footer>
      <div class="border-top-1 surface-border pt-3 mt-auto flex flex-column gap-2">
        <span class="text-xs text-600 font-semibold uppercase tracking-wider">Language</span>
        <pv-select-button
          v-model="currentLocale"
          :options="languageOptions"
          optionLabel="label"
          optionValue="value"
          :allowEmpty="false"
          @change="onLanguageChange"
          class="w-full"
          aria-label="Language Selector"
        />
      </div>
    </template>
  </pv-sidebar>
</template>
