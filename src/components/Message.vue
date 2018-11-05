<template>
  <div class="message container p-0">


    <div class="row">
      <div class="col-12">
        <div id="message" class="standard-box container-fluid ">
          <p class="text-secondary mb-0" v-html="message">
          </p>
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
        message: null,
      }
        ;
    },
    created() {
      this.message = this.$route.query.text;
    },
    methods: {}
  };

</script>

<style scoped>
  #message {
    font-weight: bold;
  }
</style>
