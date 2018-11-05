<template>
  <div class="add-review container p-0">
    <vue-headful v-if="provider" v-bind:title="'Suggest Changes for '+provider.name"/>
    <div class="page-title">
      <router-link class="primary-link"
                   :to="{ path: '/'}">Home
      </router-link>
      »
      <a v-if="provider" class="primary-link"
         v-bind:href="'/'+ provider.category.code ">{{provider.category.name}}</a>
      »
      <router-link v-if="provider"
                   :to="{ path: '/health-provider', query: { id: provider.id,category:provider.category.code }}"
                   class="primary-link">{{(provider) ? provider.name : ''}}
      </router-link>
      » <span class="colored-text">Suggest Changes</span>
    </div>
    <h1 v-if="provider != null" class="colored-text form-title">Suggest Changes for {{provider.name}}</h1>
    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
        <div id="suggest_form" class="select-box container-fluid py-2">
          <form method="post" class="text-left" @submit.prevent="submitChanges">

            <div class="form-group">
              <label for="content" class="form-control-label">What would you add/change on this provider's information?<span
                class="text-danger">*</span></label>
              <textarea class="form-control form-control-sm" id="content" name="content" rows="6" required
                        v-model="content"></textarea>
            </div>


            <!--  <div class="form-group text-center" v-if="!this.$parent.authenticated">
                <template>
                  <vue-recaptcha sitekey="6Le_gFAUAAAAAC_9pa9cuahDw5oIf0Eaq3VBSYl2"
                                 @verify="onVerifyRecaptcha"></vue-recaptcha>
                </template>
              </div>-->
            <div class="text-danger" v-html="errors">
            </div>
            <div class="form-group text-center pt-2">
              <button class="btn btn-custom" type="submit">SUBMIT SUGGESTION</button>
            </div>
          </form>

        </div>
      </div>
    </div>

  </div>
</template>
<script>

  import {BASE_API_URL} from '../../constants.js';
  import {CATEGORIES} from '../../constants.js';
  import axios from 'axios';
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: 'SuggestProviderChanges',
    components: {

      'vue-recaptcha': VueRecaptcha,
    },
    data() {
      return {
        requiresAuth: true,
        notifySearchBarChanges: false,
        provider: null,
        content: null,
        author: null,
        errors: null,

      };
    },
    created() {
      let requestUrl = BASE_API_URL;
      if (this.$route.query.category === null || this.$route.query.id === null) {
        alert("Missing parameters on url!");
        return;
      }

      let category = this.getCategoryByCode(this.$route.query.category);

      requestUrl += category.specialDevinCode ? category.specialDevinCode : category.code + "/" + this.$route.query.id + "/";
      console.log(requestUrl);
      axios.get(requestUrl)
        .then((response) => {

          this.provider = response.data;
          this.provider.category = this.getCategoryById(this.provider.category);

        }, (error) => {
          console.log(error);

        });

//get user

      requestUrl = BASE_API_URL + "accounts/" + parseInt(localStorage.getItem('user_id')) + "/";
      let self = self;
      axios.get(requestUrl)
        .then((response) => {
          console.log(response);
          this.author = response.data;

        }, (error) => {
          console.log(error);

        });
    },
    mounted() {
      this.loadJs('https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', function () {
        //Stuff to do after someScript has loaded
      });
    },
    methods: {
      /**
       * Get corresponding category for the id
       * @param id string category id
       */
      getCategoryById: function (id) {
        for (let i = 0; i < CATEGORIES.length; i++) {
          if (CATEGORIES[i].id === id || (CATEGORIES[i].specialDevinCode && CATEGORIES[i].specialDevinCode == id)) {
            let cat = CATEGORIES[i];
            cat.index = i;
            return cat;
          }
        }
      },
      /**
       * Get corresponding category for the code
       * @param id string category id
       */
      getCategoryByCode: function (code) {
        for (let i = 0; i < CATEGORIES.length; i++) {
          if (CATEGORIES[i].code === code || (CATEGORIES[i].specialDevinCode && CATEGORIES[i].specialDevinCode == code)) {
            let cat = CATEGORIES[i];
            cat.index = i;
            return cat;
          }
        }
      },

      /**
       * Triggered by captcha
       * @param response string with some code
       */
      onVerifyRecaptcha: function (response) {
        this.captchaVerified = true;
        console.log('Verify: ' + response)
      },
      /**
       * packs the form in a POST request sent through Axios, validates previously
       */
      submitChanges: function () {
        /*   if (!this.captchaVerified && !this.$parent.authenticated) {
             alert("Please verify that you are a person clicking on the captcha at the end of the form");
             return;
           }*/

        let request = {

          content: this.content,
          provider: this.provider.id,
          reply_email: this.author.email,
          author: this.author.id,
          provider: this.provider.id,
          provider_category: this.provider.category.code,

        };
        console.log(request);

        let self = this;

        axios.post(BASE_API_URL + "suggestions/" /*+ this.provider.category.id + "/"*/, request)
          .then(function (response) {
            console.log(response);
            //store in a cookie the provider and review id
            self.$notify({
              group: 'notifications',
              /*  title: 'Success',*/
              text: 'Thank you for your suggestions. We will look at them soon.',
              type: 'success',
            });
            self.$router.push({
              path: '/health-provider',
              query: {id: self.provider.id, category: self.provider.category.code}
            });
          })
          .catch(function (error) {
            //  alert("There was an error connecting to the server. Please check your connection or try again later.");
            console.log(error.response.data);
            if (parseInt(error.response.status) == 401) {//not authorized
              localStorage.removeItem('login_token');
              localStorage.removeItem('user_id');
              this.authenticated = false;

              this.$router.push('/login');
            }
            self.errors = error.response.data;

          });

      },
      loadJs(url, callback) {
        jQuery.ajax({
          url: url,
          dataType: 'script',
          success: callback,
          async: true
        });
      }
    },
  }
</script>
<style scoped>


  .form-group label {
    display: inline;
    font-size: 0.8rem;
    text-align: left;
  }

  .form-group {
    margin-bottom: 0.9rem;
  }

  #suggest_form {
    padding-top: 1.5rem !important;
  }

  #suggest_form .radio-inline {
    /* line-height: 1.8rem;*/
    font-weight: normal;
    vertical-align: middle;

  }

  #suggest_form .radio-inline input {
    margin-top: 0.4rem;
  }

  #suggest_form input, #review_form textarea, #date_of_visit {
    margin-top: 0.1rem;

    font-size: 0.8rem;
  }

  .select-box {
    cursor: auto !important;
  }


</style>
