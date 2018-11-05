import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'  // Add this
import router from './router'       // Add this



//require("bootstrap");

Vue.use(VueRouter);         // Add this

// only import the icons you use to reduce bundle size
import 'vue-awesome/icons/map-marker'
import 'vue-awesome/icons/angle-down'
import 'vue-awesome/icons/angle-up'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/minus'
import 'vue-awesome/icons/spinner'
import 'vue-awesome/icons/map-marker'
import 'vue-awesome/icons/phone'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/tag'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/star'
import 'vue-awesome/icons/envelope'
import 'vue-awesome/icons/camera'
import 'vue-awesome/icons/share'
import 'vue-awesome/icons/bookmark'
import 'vue-awesome/icons/location-arrow'
import 'vue-awesome/icons/user-circle'
import 'vue-awesome/icons/link'
import 'vue-awesome/icons/comment'
import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/trash'
import 'vue-awesome/icons/pencil'
import 'vue-awesome/icons/get-pocket'
import Icon from 'vue-awesome/components/Icon';
import Notifications from 'vue-notification';

import Paginate from 'vuejs-paginate';

const VueScrollTo = require('vue-scrollto');


import {ImageRating} from 'vue-rate-it';
import {StarRating} from 'vue-rate-it';

import vueHeadful from 'vue-headful';


// globally (in your main .js file)
Vue.component('icon', Icon);

window.$ = window.jQuery = require('jquery');

Vue.component('image-rating', ImageRating);
Vue.component('star-rating', StarRating);
Vue.component('paginate', Paginate);
Vue.use(VueScrollTo);
Vue.component('vue-headful', vueHeadful);


var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

Vue.use(Notifications);


require('../node_modules/bootstrap/scss/bootstrap.scss');

require('../node_modules/bootstrap/dist/js/bootstrap.min');

require('./assets/css/main_style.scss');


Vue.config.productionTip = false;


var vueApp = new Vue({
  el: '#app',
  router,                           // Add this
  render: h => h(App)
});
