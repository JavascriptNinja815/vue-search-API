<template>
  <div class="add-review container p-0">
    <vue-headful v-if="provider" v-bind:title="(review==null?'Add':'Edit')+' review for '+provider.name"/>
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
      » <span class="colored-text">Write a Review</span>
    </div>
    <h1 v-if="provider != null" class="colored-text form-title">
      {{review == null ? 'Add' : 'Edit'}} Review for {{provider.name}}</h1>
    <div class="row">
      <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
        <div id="review_form" class="select-box container-fluid py-2">
          <form method="post" class="text-left" @submit.prevent="submitReview">
            <div class="form-group">
              <label for="name" class="form-control-label">Name<span class="text-danger"
                                                                     v-if="!this.$parent.authenticated">*</span></label>
              <input type="text" class="form-control form-control-sm" id="name" name="pseudonym" v-model="name"
                     v-bind:placeholder="this.$parent.authenticated?'Optional to be displayed instead of your name':'Will be posted publicly (can be a name or pseudonym)'"
                     :required="!this.$parent.authenticated" maxlength="50"
              >
            </div>
            <div class="form-group" v-if="!this.$parent.authenticated">
              <label for="email" class="form-control-label">Email<span class="text-danger">*</span></label>
              <input type="email" class="form-control form-control-sm" id="email" name="email" v-model="email"
                     placeholder="Won't be posted on this website" required maxlength="50"
              >
            </div>
            <div class="form-group">
              <label class="form-control-label" for="content">Comment<span class="text-danger">*</span></label>
              <textarea class="form-control form-control-sm" id="content" name="content" rows="4" required
                        v-model="comment"></textarea>
            </div>

            <div class="form-group ">
              <label class="form-control-label " for="on_behalf_of1">Who is this review on behalf of?<span
                class="text-danger">*</span></label>
              <br/>

              <label class="radio-inline ">
                <input type="radio" name="on_behalf_of" id="on_behalf_of1" value="Myself" required v-model="onBehalfOf">
                Self
              </label> &nbsp;
              <label class="radio-inline">
                <input type="radio" name="on_behalf_of" id="on_behalf_of2" value="Friend" v-model="onBehalfOf">
                Friend
              </label> &nbsp;
              <label class="radio-inline">
                <input type="radio" name="on_behalf_of" id="on_behalf_of3" value="Family Member"
                       v-model="onBehalfOf">
                Family Member
              </label> &nbsp;
              <label class="radio-inline">
                <input type="radio" name="on_behalf_of" id="on_behalf_of4" value="Client" v-model="onBehalfOf">
                Client
              </label>
            </div>

            <div class="form-group ">
              <label class="form-control-label" for="last_visit_within1">Review based on a visit to this provider within_<span
                class="text-danger">*</span></label>
              <br/>
              <label class="radio-inline ">
                <input type="radio" name="last_visit_within" id="last_visit_within1" value="1 week" required
                       v-model="visitWithin">
                1 week
              </label> &nbsp;
              <label class="radio-inline">
                <input type="radio" name="last_visit_within" id="last_visit_within2" value="1 month" required
                       v-model="visitWithin">
                1 month
              </label> &nbsp;
              <label class="radio-inline">
                <input type="radio" name="last_visit_within" id="last_visit_within3" value="3 months" required
                       v-model="visitWithin">
                3 months
              </label> &nbsp;
              <label class="radio-inline">
                <input type="radio" name="last_visit_within" id="last_visit_within4" value="6 months" required
                       v-model="visitWithin">
                6 months
              </label> &nbsp;
              <label class="radio-inline">
                <input type="radio" name="last_visit_within" id="last_visit_within5" value="more than 6 months ago "
                       required v-model="visitWithin">
                more than 6 months ago
              </label>
            </div>
            <div class="form-group">
              <label class="form-control-label" for="name">Date of the visit this review is based on</label>
              <datepicker name="date_of_visit" bootstrap-styling id="date_of_visit" format="yyyy-MM-dd"
                          @selected="changeDate" v-model="date"
                          input-class="form-control-sm"></datepicker>
            </div>
            <div class="form-group ">
              <label class="form-control-label "
                     for="times_visited1">How many times have you visited this provider?<span
                class="text-danger">*</span></label>
              <br/>
              <label class="radio-inline ">
                <input type="radio" name="times_visited" id="times_visited1" value="One time only" required
                       v-model="timesVisited">
                One time only
              </label> &nbsp;
              <label class="radio-inline ">
                <input type="radio" name="times_visited" id="times_visited2" value="A few different times" required
                       v-model="timesVisited">
                A few different times
              </label> &nbsp;
              <label class="radio-inline ">
                <input type="radio" name="times_visited" id="times_visited3" value="This is my regular provider"
                       required
                       v-model="timesVisited">
                This is my regular provider
              </label> &nbsp;
            </div>
            <div class="form-group ">
              <label class="form-control-label " for="on_behalf_of1">Would you recommend this provider to others?<span
                class="text-danger">*</span></label>
              <br/>

              <label class="radio-inline ">
                <input type="radio" name="does_recommend" id="does_recommend1" value="true" required
                       v-model="recommend">
                Yes
              </label> &nbsp;
              <label class="radio-inline">
                <input type="radio" name="does_recommend" id="does_recommend2" value="false" required
                       v-model="recommend">
                No
              </label>
            </div>
            <div class="form-group " v-for="(ratingCategory,index) in this.ratingCategories">
              <label class="form-control-label " for="on_behalf_of1">{{ratingCategory.name}}<span
                class="text-danger">*</span></label>
              <br/>

              <star-rating :item-size="18"
                           active-color="#008081"
                           :rating="ratingCategories[index].rate"
                           :increment="1"
                           :inline="true"
                           v-bind:id="'rating_'+ratingCategory.id"
                           :show-rating="false" @rating-selected="setCurrentRating($event, index)"></star-rating>
              <input type="hidden" v-bind:name="ratingCategory.id" :value="ratingCategory.rate"/>
            </div>

            <div class="form-group text-center" v-if="!this.$parent.authenticated">
              <template>
                <vue-recaptcha sitekey="6Le_gFAUAAAAAC_9pa9cuahDw5oIf0Eaq3VBSYl2"
                               @verify="onVerifyRecaptcha"></vue-recaptcha>
              </template>
            </div>
            <div class="text-danger" v-html="errors">
            </div>
            <div class="form-group text-center pt-2">
              <button class="btn btn-custom" type="submit">{{review ? 'UPDATE' : 'SUBMIT'}} REVIEW</button>
            </div>
          </form>

        </div>
      </div>
    </div>

  </div>
</template>
<script>

  import {BASE_API_URL} from '../constants.js';
  import {CATEGORIES} from '../constants.js';
  import {REVIEW_FIELDS} from '../constants.js';
  import {DAYS_WEEK} from '../constants.js';
  import {RATING_CATEGORIES} from '../constants.js';
  import {RATINGS} from '../constants.js';
  import {ImageRating} from 'vue-rate-it';
  import axios from 'axios';
  import Datepicker from 'vuejs-datepicker';
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: 'AddReview',
    components: {
      Datepicker,
      'vue-recaptcha': VueRecaptcha,
    },
    data() {
      return {
        notifySearchBarChanges: false,
        provider: null,
        ratingCategories: [],
        captchaVerified: false,
        name: null,
        email: null,
        comment: null,
        onBehalfOf: null,
        visitWithin: null,
        date: null,
        formattedDate: null,
        /*  times: null,*/
        recommend: null,
        timesVisited: null,
        review: null,
        errors: null,
      };
    },
    created() {
      let requestUrl = BASE_API_URL;
      if (this.$route.query.category === null || this.$route.query.id === null) {
        alert("Missing parameters on url!");
        return;
      }
      let reviewId = this.$route.query.review_id;
      let category = this.getCategoryByCode(this.$route.query.category);
      console.log(category);
      requestUrl += /*category.specialDevinCode ? category.specialDevinCode :*/ category.code + "/" + this.$route.query.id + "/";
      console.log(requestUrl);
      axios.get(requestUrl)
        .then((response) => {

          this.provider = response.data;
          this.provider.category = this.getCategoryById(this.provider.category);

        }, (error) => {
          console.log(error);
          alert(error);
        });
      for (let i = 0; i < RATING_CATEGORIES.length; i++) {
        this.ratingCategories.push({
          id: RATING_CATEGORIES[i].id,
          name: RATING_CATEGORIES[i].name,
          rate: 0,
        })
      }
      //get short code of category:
      let categoryId = null;
      for (let i = 0; i < CATEGORIES.length; i++) {
        if (CATEGORIES[i].code == this.$route.query.category) {
          categoryId = CATEGORIES[i].id;
          break;
        }
      }
      //if updating, retrieve the review:
      let self = this;
      if (reviewId) {
        requestUrl = BASE_API_URL + "reviews/" /*+ categoryId + "/"*/ + reviewId + "/";
        axios.get(requestUrl)
          .then((response) => {
            console.log(response);
            this.review = response.data;
            this.name = this.review.pseudonym;
            this.comment = this.review.content;
            this.onBehalfOf = this.review.on_behalf_of;
            this.visitWithin = this.review.last_visit_within;
            this.date = this.review.date_of_visit;
            this.timesVisited = this.review.num_of_visits;
            this.recommend = this.review.does_recommend;
            for (let i = 0; i < RATING_CATEGORIES.length; i++) {
              this.ratingCategories[i].rate = this.review[RATING_CATEGORIES[i].id];
            }

          }, (error) => {
            console.log(error);
            alert("There was an error retrieving the review. Please check your connection or try again later.");

          });
      }


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
       * Set score for a category
       * @param index integer position in array
       * @param rating integer (0-5)
       */
      setCurrentRating: function (rating, index) {
        this.ratingCategories[index].rate = rating;
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
      submitReview: function () {
        if (!this.captchaVerified && !this.$parent.authenticated) {
          alert("Please verify that you are a person clicking on the captcha at the end of the form");
          return;
        }
        let contentFields = {
          pseudonym: this.name ? /*this.$parent.authenticated ? null :*/ {value: this.name, type: "text"} : null,
          content: {value: this.comment, type: "text"},
          on_behalf_of: {
            value: this.onBehalfOf, "type": "radio",
            "options": [
              "Self",
              "Friend",
              "Family Member",
              "Client"
            ]
          },
          date_of_visit: {value: this.formattedDate, type: "date"},
          last_visit_within: {
            value: this.visitWithin, "options": [
              "1 week",
              "1 month",
              "3 months",
              "6 months",
              "more than 6 months ago "
            ]
          },
          num_of_visits: {
            value: this.timesVisited, "options": [
              "One time only",
              "A few different times",
              "This is my regular provider"
            ]
          },//@TODO: update whenever the API is set right
          does_recommend: {value: this.recommend, type: "boolean"},

          /*    email: this.$parent.authenticated ? null : this.email,*/
        };
        for (let i = 0; i < RATING_CATEGORIES.length; i++) {
          let ratingCategory = RATING_CATEGORIES[i];
          contentFields[ratingCategory.id] = {value: parseInt(this.ratingCategories[i].rate), type: "stars"};
        }

        let request = {
          provider: this.provider.id,
          review_json: JSON.stringify(contentFields),
          author: this.$parent.authenticated ? parseInt(localStorage.getItem('user_id')) : null,
          provider_category: this.provider.category.specialDevinCode ? this.provider.category.specialDevinCode : this.provider.category.code,
          is_approved: false,
          stay_is_verified: false,
        };
        console.log(request);


        let self = this;
        if (!this.review)
          axios.post(BASE_API_URL + "reviews/" /*+ this.provider.category.id + "/"*/, request)
            .then(function (response) {
              console.log(response);
              //store in a cookie the provider and review id
              self.$cookie.set(self.provider.category.id + "/" + self.provider.id, response.data.id, 730);
              self.$notify({
                group: 'notifications',
                /*  title: 'Success',*/
                text: 'Thank you for you review',
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
              self.errors = "";
              for (var property in error.response.data) {
                console.log(property, error.response.data[property]);
                if (error.response.data.hasOwnProperty(property)) {

                  self.errors += "<b>" + property + "</b>: " + error.response.data[property][0] + "<br/>";
                }
              }
            });
        else //update
          axios.put(BASE_API_URL + "reviews/" /*+ this.provider.category.id + "/" */ + this.review.id + "/", request)
            .then(function (response) {
              console.log(response);
              //store in a cookie the provider and review id
              self.$cookie.set(self.provider.category.id + "/" + self.provider.id, response.data.id, 730);
              self.$notify({
                group: 'notifications',
                /*  title: 'Success',*/
                text: 'Your review was updated',
                type: 'success',
              });
              self.$router.push({
                path: '/health-provider',
                query: {id: self.provider.id, category: self.provider.category.code}
              });
            })
            .catch(function (error) {
              //  alert("There was an error connecting to the server. Please check your connection or try again later.");
              self.errors = "";
              for (var property in error.response.data) {
                console.log(property, error.response.data[property]);
                if (error.response.data.hasOwnProperty(property)) {

                  self.errors += "<b>" + property + "</b>: " + error.response.data[property][0] + "<br/>";
                }
              }
              console.log(error.response.data);
            });
      },
      /**
       * Event called on date selected, converts and stores the date
       * @param newDate string
       */
      changeDate: function (newDate) {
        let date = new Date(newDate);

        this.formattedDate = "" + date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) + "-" + (date.getDate() > 9 ? '' : '0') + date.getDate();
        console.log(this.date);
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

  #review_form {

  }

  #review_form .radio-inline {
    /* line-height: 1.8rem;*/
    font-weight: normal;
    vertical-align: middle;
  }

  #review_form .radio-inline input {
    margin-top: 0.4rem;
  }

  #review_form input, #review_form textarea, #date_of_visit {
    margin-top: 0.1rem;

    font-size: 0.8rem;
  }

  .select-box {
    cursor: auto !important;
  }


</style>
