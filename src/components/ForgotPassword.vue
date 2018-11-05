<template>
  <div class="forgot-password container p-0">
    <vue-headful v-bind:title="'Password Recovery'"/>

    <h2 class="colored-text form-title">Recover Password</h2>
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-md-10 offset-md-1">
        <div id="password_recovery_form" class="standard-box container-fluid py-2">
          <p>Enter your email and you will receive a link to set a new password and a username reminder.</p>
          <form method="post" class="text-left" @submit.prevent="submitData">
            <div class="form-group">
              <label for="email" class="form-control-label">Email<span
                class="text-danger">*</span></label>
              <input type="email" class="form-control form-control-sm" id="email" name="email" v-model="email"
                     required >
            </div>

            <div class="text-danger">{{errors}}

            </div>
            <div class="form-group text-center pt-2">
              <button class="btn btn-custom" type="submit">SUBMIT</button>
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
    name: 'Password Recovery',
    components: {},
    data() {
      return {
        email: null,
        errors: null,
      }
        ;
    },
    methods: {
      /**
       * Tries to login and redirects or shows error on page if rejected
       */
      submitData: function () {
        let self = this;
        let parameters = { email: this.email};
        /*  if (this.username.includes("@"))
            parameters.email = this.username;//user entered email
          else
            parameters.username = this.username;//entered name*/
        axios.post(BASE_API_URL + "/auth/password/reset/", parameters)
          .then(function (response) {
            console.log(response.data);
            if (response.status != 200) {
              this.errors = response.detail;
              return;
            }
            self.errors = null;

            self.$router.push('/message?text=The mail has been sent. Please check your inbox and spam folder.');

          })
          .catch(function (error) {
            console.log(error.response);
            if (error.response.data.non_field_errors)
              self.errors = error.response.data.non_field_errors[0];
          });

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
