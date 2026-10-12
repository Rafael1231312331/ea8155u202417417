/**
 * Application Entry Point
 * @author Rafael André Barrenechea Bustamante
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Toolbar from 'primevue/toolbar';
import Card from 'primevue/card';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import Drawer from 'primevue/drawer';
import Toast from 'primevue/toast';
import Image from 'primevue/image';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false
    }
  }
});

app.use(ToastService);

// Component registration using pv- prefix
app.component('pv-toolbar', Toolbar);
app.component('pv-card', Card);
app.component('pv-button', Button);
app.component('pv-select-button', SelectButton);
app.component('pv-select', Select);
app.component('pv-input-text', InputText);
app.component('pv-sidebar', Drawer);
app.component('pv-drawer', Drawer);
app.component('pv-toast', Toast);
app.component('pv-image', Image);

app.mount('#app');
