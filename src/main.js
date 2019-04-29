import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bulma from 'bulma'
import Buefy from 'buefy'
import Tooltip from 'bulma-tooltip'

import {Field} from 'buefy/dist/components/field'
import {RadioButton} from 'buefy/dist/components/radio'

import 'bulma-divider/dist/css/bulma-divider.min.css'

Vue.config.productionTip = false;
Vue.use(Bulma);
Vue.use(Tooltip);
Vue.use(Buefy);
Vue.component('b-field', Field);
Vue.component('b-radio-button', RadioButton);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
