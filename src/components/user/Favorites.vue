<template>
  <div class="favorites container p-0">
    <vue-headful v-bind:title="'My Bookmarks'"/>

    <h2 class="colored-text form-title">My Bookmarks</h2>
    <div class="row">

    </div>

  </div>
</template>
<script>

  import {BASE_API_URL} from '../../constants.js';
  import axios from 'axios';

  export default {
    name: 'Favorites',
    components: {},
    data() {
      return {
        requiresAuth: true,
      }
        ;
    },
    created() {
     /* if (localStorage.getItem('login_token') == null) //auth
        this.$router.push('/login');*/

    },
    methods: {},
  };
</script>
}
<style scoped>

</style>
