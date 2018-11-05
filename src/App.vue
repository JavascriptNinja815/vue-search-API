<template>
  <div id="app" v-bind:class="($route.path == '/')?'bg-secondary ':'bg-white'">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark  ">
      <div class="container">
        <a class="navbar-brand" href="/"><span class="logo-small">Patient Review</span><span
          class="logo-big">Network</span></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active" v-if="!authenticated">
              <router-link class="nav-link" :to="{ path: '/login'}">Log in
              </router-link>
            </li>
            <li class="nav-item" v-if="!authenticated">
              <button type="button" class="btn btn-outline-white d-none d-lg-block" @click=" $router.push('/register')">Sign up</button>
              <router-link class="nav-link d-block d-lg-none active" :to="{ path: '/register'}">Sign up
              </router-link>
            </li>
            <li class="nav-item active" v-if="authenticated">
              <router-link class="nav-link" :to="{ path: '/user/favorites'}">My Bookmarks
              </router-link>
            </li>
            <li class="nav-item active" v-if="authenticated">
              <router-link class="nav-link" :to="{ path: '/user/my-reviews'}">My reviews
              </router-link>
            </li>
            <li class="nav-item" v-if="authenticated">
              <button type="button" class="btn btn-outline-white d-none d-lg-block" v-on:click="logout">Log out</button>
              <a class="nav-link d-block d-lg-none active" href="#" v-on:click="logout">Log out
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    <div class="bg-secondary pb-3" v-if="$route.path != '/'">
      <div class="container">
        <search-bar :express="true" @update="onSearchBarUpdate" ref="SearchBar"></search-bar>
      </div>
    </div>
    <!--<img src="./assets/logo.png">-->
    <div class="container" id="main_container">
      <notifications group="notifications" position="top right"/>
      <router-view ref="MainView"></router-view>
    </div>
    <!-- Footer -->
    <footer class=" bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-4 d-none d-sm-block ">
            <div class="container d-flex h-100">
              <div class="row justify-content-center align-self-center">
                <a id="footer_logo" href="/"><span class="logo-small">Patient Review</span><span
                  class="logo-big">Network</span></a>
                <img src="/static/powered_by_google_on_non_white.png"/>
              </div>
            </div>

          </div>
          <div class="col-lg-3 col-md-3 col-sm-4 col-6">
            <h3>Quick Links</h3>
            <div class="underline"></div>
            <ul class="links-list">
              <li>
                <a href="">About Us</a>

              </li>
              <li>
                <a href="">Contact Us</a>

              </li>

            </ul>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-4 d-none d-md-block">
            <h3>About Us</h3>
            <div class="underline"></div>
            <p class="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed venenatis ligula. Proin id massa
              ligula. Pellentesque maximus, velit maximus finibus posuere, lacus nibh facilisis augue, id pellentesque
              tortor enim vitae risus. Ut a ante tempus, tempor arcu ut, euismod turpis. </p>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-4 col-6">
            <h3>Follow Us</h3>
            <div class="underline"></div>
            <a href=""><img src="./assets/img/iconmonstr-facebook-1-48.png" title="Facebook" alt="Facebook"
                            class="social-icon"/></a>
            <a href=""><img src="./assets/img/iconmonstr-twitter-1-48.png" title="Twitter" alt="Twitter"
                            class="social-icon"/></a>
            <a href=""><img src="./assets/img/iconmonstr-google-plus-1-48.png" title="Google Plus" alt="Google Plus"
                            class="social-icon"/></a>
            <a href=""><img src="./assets/img/iconmonstr-youtube-6-48.png" title="Youtube" alt="Youtube"
                            class="social-icon"/></a>
          </div>
        </div>
      </div>
      <!-- /.container -->
    </footer>
    <div id="copyright">
      Copyright 2016 Patient Review Network. All Rights Reserved. <img src="/static/powered_by_google_on_non_white.png"/>
    </div>

  </div>
</template>

<script>

  import SearchBar from './components/SearchBar.vue';
  import {BASE_API_URL} from './constants.js';
  import axios from 'axios';

  var application = null;



  export default {
    name: 'App',
    components: {
      'search-bar': SearchBar
    },
    data() {
      return {
        authenticated: false,
        userId: null,
        userName: null,
      }
    },
    props: {},
    created() {
      if (localStorage.getItem('login_token') != null) //auth
        this.authenticated = true;

      if (this.$props.mainCategory != null) {
        this.$refs.SearchBar.setMainCategory(this.$props.mainCategory);
        this.$refs.Search.categoryPage = true;
      }
      application = this;
   /*   FB.getLoginStatus(function(response) {
        console.log(response);
      });*/

    },
    mounted() {
      console.log(this.$refs.MainView.requiresAuth,this.authenticated);
      if (this.$refs.MainView.requiresAuth && !this.authenticated) //auth
        this.$router.push('/login');

    },
    updated() {
      if (this.$refs.MainView.requiresAuth && !this.authenticated) //auth
        this.$router.push('/login');
    },
    methods: {
      onSearchBarUpdate: function (value) {
        console.log(this.$refs.MainView);
        console.log('update from searchbar', value, this.$refs.MainView.notifySearchBarChanges);
        // var err = new Error();
        //   console.log( err.stack);
        if (this.$refs.MainView.notifySearchBarChanges) {
          console.log("app calling update from searchbar");
          this.$refs.MainView.getResults(/*value*/);
        }
      },
      logout: function () {
        console.log(localStorage.getItem('login_token'));
        let self = this;
        axios.post(BASE_API_URL + "auth/logout/", {}, {
          headers: {Authorization: "Token " + localStorage.getItem('login_token')}
        })
          .then(function (response) {
            console.log(response);
            localStorage.removeItem('login_token');
            localStorage.removeItem('user_id');
            self.authenticated = false;
          })
          .catch(function (error) {
            console.log(error);
            localStorage.removeItem('login_token');
            localStorage.removeItem('user_id');
            self.authenticated = false;
          });

      },
      checkLoginState: function (response) {
        if (response.status === 'connected') {
          FB.api('/me', {fields: 'name,email'}, function (profile) {
            console.log('Good to see you, ' + profile.name + '.');
          });
        } else if (response.status === 'not_authorized') {
          // the user is logged in to Facebook,
          // but has not authenticated your app
        } else {
          // the user isn't logged in to Facebook.
        }
      },
    }
  }
</script>

<style>


  #main_container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 26px;
  }

  @media only screen and (max-width: 720px) {
    #main_container {
      margin-top: 18px;
    }
  }
</style>
