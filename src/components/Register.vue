<template>
  <div class="register container p-0">
    <vue-headful v-bind:title="'Sign Up'"/>
    <h2 class="colored-text form-title">Sign Up</h2>
    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
        <div id="register_form" class="standard-box container-fluid ">
          <form method="post" class="text-left" @submit.prevent="submitForm">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="username" class="form-control-label">Username<span
                    class="text-danger">*</span></label>
                  <input type="text" class="form-control form-control-sm" id="username" name="username"
                         v-model="username"
                         required
                         maxlength="150" pattern="^[A-Za-z0-9_-]{4,150}$" @focus="usernameDesc = true"
                         @blur="usernameDesc = false">
                  <small v-show="usernameDesc">Only alphanumeric characters, "_" and "-", without spaces</small>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="form-group">
                  <label for="password" class="form-control-label">Password<span
                    class="text-danger">*</span></label>
                  <input type="password" class="form-control form-control-sm" id="password" name="password"
                         minlength="8"
                         v-model="password" required>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="form-group">
                  <label for="password" class="form-control-label">Repeat Password<span
                    class="text-danger">*</span></label>
                  <input type="password" class="form-control form-control-sm" id="repeat_password" minlength="8"
                         name="repeat_password"
                         v-model="repeatPassword" required>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="username" class="form-control-label">Email<span
                    class="text-danger">*</span></label>
                  <input type="email" class="form-control form-control-sm" id="email" name="email"
                         v-model="email"
                         required>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="form-group">
                  <label for="username" class="form-control-label">First Name</label>
                  <input type="text" class="form-control form-control-sm" id="first_name" name="first_name"
                         v-model="firstName"
                         maxlength="30" pattern="^[A-Za-z0-9]{2,30}$">
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="form-group">
                  <label for="username" class="form-control-label">Last Name
                  </label>
                  <input type="text" class="form-control form-control-sm" id="last_name" name="first_name"
                         v-model="lastName"
                         maxlength="150" pattern="^[A-Za-z0-9]{2,150}$">
                </div>
              </div>
            </div>

            <div class="text-danger" v-html="errors">

            </div>
            <div class="form-group text-center pt-2 mb-2">
              <button class="btn btn-custom" type="submit">SIGN UP</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>
<script>

  import {BASE_API_URL} from '../constants.js';
  import axios from 'axios';

  export default {
    name: 'Register',
    components: {},
    data() {
      return {
        username: null,
        usernameDesc: false,
        firstName: null,
        lastName: null,
        password: null,
        repeatPassword: null,
        errors: null,
        email: null,
      }
        ;
    },
    methods: {
      submitForm: function () {
        //first some validation:
        if (this.password != this.repeatPassword) {
          alert("The passwords are different. Please type them again.");
          return;
        }
        let self = this;
        let parameters = {
          is_superuser: false,
          password1: this.password,
          username: this.username,
          is_staff: 'false',
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password2: this.repeatPassword,
          is_active: 'false',
        };
        this.errors = null;
        axios.post(BASE_API_URL + "auth/registration/", parameters)
          .then(function (response) {
            console.log(response, response.data);
            if (response.status != 201) {
              self.errors = "";
              for (var property in response.data) {
                console.log(property, response.data[property]);
                if (response.data.hasOwnProperty(property)) {

                  self.errors += property + ": " + response.data[property][0] + "<br/>";
                }
              }

              return;
            }
            else {//approved
              self.errors = null;
              self.$router.push('/message?text=Thank you for registering. You will receive an e-mail shortly to confirm your address.');
            }

            //

          })
          .catch(function (error) {
            console.log(error.response);
            self.errors = "";
            for (var property in error.response.data) {
              console.log(property, error.response.data[property]);
              if (error.response.data.hasOwnProperty(property)) {

                self.errors += "<b>" + property + "</b>: " + error.response.data[property][0] + "<br/>";
              }
            }

          });
      }
    }
  };

</script>

<style scoped>
</style>
