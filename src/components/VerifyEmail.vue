<template>
  <div class="verify-email container p-0">
    <vue-headful v-bind:title="'Verify Email'"/>

    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
        <div class="text-center" v-if="loading">
          <br/>
          <icon
            name="spinner"
            class="arrow-icon fa-spin loading-icon"></icon>
        </div>
        <div class="text-danger">{{errors}}

        </div>
      </div>

    </div>
  </div>
</template>
<script>

  import {BASE_API_URL} from '../constants.js';
  import axios from 'axios';

  export default {
    name: 'VerifyEmail',

    components: {},
    data() {
      return {
        errors: null,
        loading: true,
      }
        ;
    },
    created() {
      let key = this.$route.query.key;
      let self = this;
      axios.post(BASE_API_URL + "/auth/registration/verify-email/", {key: key})
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            self.$router.push('/message?text=Your account has been activated. Please <a href="/login">login</a>.');
          }
          else {
            self.loading = false;
            self.errors = response.non_field_errors[0];
            return;
          }
          self.errors = null;

          //self.$router.push('/message?text=Your email ');

        })
        .catch(function (error) {
          self.loading = false;
          console.log(error.response.data.detail);
          if (error.response.data.detail)
            self.errors = "Error: "+error.response.data.detail+" Please verify your link.";
        });
    },
    methods: {}
  };

</script>

<style scoped>
</style>
