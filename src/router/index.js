import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Search from '../components/Search.vue'
import Compare from '../components/Compare.vue'
import Provider from '../components/Provider.vue'
import Login from '../components/Login.vue'
import AddReview from '../components/AddReview.vue'
import {CATEGORIES} from '../constants.js';
import Favorites from '../components/user/Favorites.vue';
import Register from '../components/Register.vue';
import Message from '../components/Message.vue';
import VerifyEmail from '../components/VerifyEmail.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import ResetPassword from '../components/ResetPassword.vue';
import Reviews from '../components/user/Reviews.vue';
import Review from '../components/Review.vue';
import SuggestProviderChanges from '../components/user/SuggestProviderChanges.vue';

Vue.use(Router);

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/index',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Advanced Search',
    component: Search,
    meta: {
      title: 'Search Health Providers',
      metaTags: [
        {
          name: 'description',
          content: 'Advanced Search for Health Providers'
        },
      ]
    },
  },
  {
    "path": "/category/:main",
    "redirect": {
      "name": 'Advanced Search',
      "params": {
        "categories": ":main",
        "sub": "detail"
      }
    }
  },
  {
    path: "/city/:city",
    name: 'Advanced Search',
    component: Search,

  },
  {
    path: '/compare',
    name: 'Compare Listings',
    component: Compare
  },
  {
    path: '/health-provider',
    name: 'Healthcare Provider',
    component: Provider
  },
  {
    path: '/add-review',
    name: 'Add Review',
    component: AddReview
  },
  {
    path: '/update-review',
    name: 'Update Review',
    component: AddReview
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      metaTags: [
        {
          name: 'description',
          content: 'User Login'
        },
      ]
    },
  },
  {
    path: '/user/favorites',
    name: 'User Favorites',
    component: Favorites,
  },
  {
    path: '/user/my-reviews',
    name: 'My Reviews',
    component: Reviews,
  },
  {
    path: '/register',
    name: 'Sign Up',
    component: Register,
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
  },
  {
    path: '/verify-email/',
    name: 'Verify Email',
    component: VerifyEmail,
  },
  {
    path: '/password-recovery',
    name: 'Password Recovery',
    component: ForgotPassword,
  },
  {
    path: '/reset-password/',
    name: 'Reset Password',
    component: ResetPassword,
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
  },
  {
    path: '/user/suggest-provider-changes',
    name: 'Suggest Provider Changes',
    component: SuggestProviderChanges,
  },


];

let categoriesRoutes = [];
for (let i = 0; i < CATEGORIES.length; i++) {
  let category = CATEGORIES[i];
  categoriesRoutes.push({
    path: "/" + category.code,
    name: category.name,
    component: Search,
    params: {
      "categories": i,
      /*"sub": "detail"*/
    },
    props: {
      "mainCategory": i,
      /*"sub": "detail"*/
    }
  });
}

export default new Router({
  mode: 'history',
  routes: routes.concat(categoriesRoutes),
  /* base: '/dist/',*/
})

