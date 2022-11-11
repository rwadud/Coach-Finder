import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import BaseCard from './components/UI/BaseCard.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./components/UI/BaseDialog.vue')
);

const app = createApp(App);

app.use(store);
app.use(router);

app.component('BaseCard', BaseCard);
app.component('BaseBadge', BaseBadge);
app.component('BaseButton', BaseButton);
app.component('BaseDialog', BaseDialog);
app.component('BaseSpinner', BaseSpinner);

app.mount('#app');
