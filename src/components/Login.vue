<template>
  <div class="login container p-0">
    <vue-headful v-bind:title="'Login'"/>

    <h2 class="colored-text form-title">Login</h2>
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-md-10 offset-md-1">
        <div id="login_form" class="standard-box container-fluid py-2">
          <form method="post" class="text-left" @submit.prevent="submitLogin">
            <div class="form-group">
              <label for="username" class="form-control-label">Username<span
                class="text-danger">*</span></label>
              <input type="text" class="form-control form-control-sm" id="username" name="username" v-model="username"
                     required maxlength="150">
            </div>
            <div class="form-group">
              <label for="password" class="form-control-label">Password<span class="text-danger">*</span></label>
              <input type="password" class="form-control form-control-sm" id="password" name="password"
                     v-model="password"
                     required>
            </div>
            <div class="text-danger">{{errors}}

            </div>
            <div class="form-group text-center pt-2">
              <button class="btn btn-custom" type="submit">LOGIN</button>
            </div>
            <div class="text-center">
              <router-link class="nav-link" :to="{ path: '/password-recovery'}">Forgot your Username or Password?
              </router-link>
              Not registered?
              <router-link class="" :to="{ path: '/register'}">Sign Up
              </router-link>
              <!--   or proceed with your Facebook account:<br/>
                 <a href="javascript:void(0)" @click="openFbLoginDialog" id="facebook_login"><img
                   src="/static/facebook login.png"/></a>-->
            </div>
          </form>
        </div>
      </div>
    </div>
    <br/>
    <br/>
  </div>
</template>
<script>

  import {BASE_API_URL} from '../constants.js';
  import axios from 'axios';

  export default {
    name: 'Login',
    components: {},
    data() {
      return {
        username: null,
        password: null,
        errors: null,
      }
        ;
    },
    methods: {
      /**
       * Tries to login and redirects or shows error on page if rejected
       */
      submitLogin: function () {
        let self = this;
        let parameters = {password: this.password, username: this.username, email: ''};
        /*  if (this.username.includes("@"))
            parameters.email = this.username;//user entered email
          else
            parameters.username = this.username;//entered name*/
        axios.post(BASE_API_URL + "auth/login/", parameters)
          .then(function (response) {
            console.log(response.data);
            if (response.non_field_errors) {
              this.errors = response.non_field_errors[0];
              return;
            }
            self.errors = null;
            localStorage.setItem('login_token', response.data.key); // to store the token
            self.$parent.authenticated = true;
            axios.get(BASE_API_URL + "auth/user/", {headers: {Authorization: "Token " + localStorage.getItem('login_token')}})
              .then(function (response) {

                localStorage.setItem('user_id', response.data.id); // to store the token
                  self.$router.push('/user/favorites');
              })
              .catch(function (error) {
                console.log(error);

                self.errors = "Error contacting the server. Please try again later.";
              });


          })
          .catch(function (error) {
            console.log(error.response);
            if (error.response.data.non_field_errors)
              self.errors = error.response.data.non_field_errors[0];
          });

      },
      openFbLoginDialog() {
        FB.login(function (response) {
          console.log(response);
        }, {scope: 'email'})
      },


    },
  };
</script>
}
<style scoped>
  #login_form {
    cursor: auto;
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;

  }

  #facebook_login img {
    text-align: center;
    max-width: 100%;
    width: 220px;
    margin-top: 16px;
  }

  @media (max-width: 575px) {
    #login_form {

      padding-top: 1.2rem !important;
      padding-bottom: 1.2rem !important;

    }
  }


</style>
