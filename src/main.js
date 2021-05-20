import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueToastify from "vue-toastify";
import VueCookies from 'vue-cookies';

Vue.use(VueToastify);
Vue.use(VueCookies);
/*import './assets/tailwind.css';*/


Vue.config.productionTip = false;
/*Vue.config.devtools = false
Vue.config.debug = false
Vue.config.silent = true*/
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
