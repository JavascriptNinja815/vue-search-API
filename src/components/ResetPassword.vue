<template>
  <div class="reset-password container p-0">
    <vue-headful v-bind:title="'Reset Password'"/>

    <h2 class="colored-text form-title">Reset Password</h2>
    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
        <div id="password_recovery_form" class="standard-box container-fluid py-2">
          <p>Enter your new password</p>
          <form method="post" class="text-left" @submit.prevent="submitData">
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
            <div class="text-danger">{{errors}}

            </div>
            <div class="form-group text-center pt-2">
              <button class="btn btn-custom" type="submit">UPDATE</button>
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
    name: 'Reset Password',
    components: {},
    data() {
      return {
        password: null,
        repeatPassword: null,
        uid: null,
        token: null,
        errors: null,
      }
        ;
    },
    created() {
      this.uid = this.$route.query.uid;
      this.token = this.$route.query.token;
    },
    methods: {
      /**
       * Tries to login and redirects or shows error on page if rejected
       */
      submitData: function () {
        let self = this;
        let parameters = {
          uid: this.uid,
          token: this.token,
          new_password1: this.password,
          new_password2: this.repeatPassword
        };

        axios.post(BASE_API_URL + "/auth/password/reset/confirm/", parameters)
          .then(function (response) {
            console.log(response.data);
            if (response.status != 200) {
              this.errors = response.data.detail;
              return;
            }
            self.errors = null;

            self.$router.push('/message?text=' + response.data.detail);

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


</style>
