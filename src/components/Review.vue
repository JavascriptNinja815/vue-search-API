<template>
  <div class="review container p-0">
    <vue-headful v-if="provider" v-bind:title="'Review for '+provider.name"/>
    <div class="page-title">
      <router-link class="primary-link"
                   :to="{ path: '/'}">Home
      </router-link>
      »
      <a v-if="category" class="primary-link"
         v-bind:href="'/'+ category.code ">{{category.name}}</a>
      »
      <router-link v-if="provider"
                   :to="{ path: '/health-provider', query: { id: provider.id,category:category.code }}"
                   class="primary-link">{{(provider) ? provider.name : ''}}
      </router-link>
      » <span class="colored-text">Read Review</span>
    </div>
    <h1 v-if="provider != null" class="colored-text form-title">Review for {{provider.name}}</h1>
    <div class="row">
      <div class="col-lg-10 offset-lg-1 col-md-12 col-xl-8 offset-xl-2 ">
        <div class="grey-box" id="review" v-if="review">
          <div id="author_panel" v-if="authorMode">
            <button class="btn btn-custom btn-sm"
                    @click="$router.push({ path: '/update-review/', query: { id: provider.id,category:category.code,review_id: review.id  }})">
              <icon
                name="pencil"
                class=""></icon>
              Edit
            </button>
            <button class="btn btn-danger btn-sm"
                    @click="this.delete">
              <icon
                name="trash"
                class=""></icon>
              Delete
            </button>
          </div>
          <div class="container-fluid" id="user_data">
            <div class="row">
              <div class="col-sm-1 col-2 text-left pl-0 pr-0" id="user_icon">
                <icon class="colored-text"
                      name="user-circle" scale="3"
                ></icon>
              </div>
              <div class="col-sm-11 col-10 pr-0">
                <h4 class="colored-text mb-0">{{review.pseudonym ? review.pseudonym : author.username}}</h4>
                <div class="review-date secondary-colored-text" v-if="review.date_of_visit">{{review.date_of_visit}}
                </div>
              </div>
            </div>
          </div>
          <p v-if="review" class="description">{{review.content}}</p>
          <div id="averages_table" class="row">
            <div class="col-sm-6 pr-0">
              <div v-for="(ratingCategory,index) in RATING_CATEGORIES.slice(0,RATING_CATEGORIES.length/2)"
                   class="text-left">
                <image-rating v-if="provider" :src="'/static/star2.png'" :read-only="true"
                              :rating="parseInt(review[ratingCategory.id])"
                              :increment="1"
                              :inline="true"
                              :item-size="16" :show-rating="false"></image-rating>

                <b>{{ratingCategory.name}}</b>


              </div>
            </div>
            <div class="col-sm-6">
              <div
                v-for="(ratingCategory,index2) in RATING_CATEGORIES.slice(RATING_CATEGORIES.length/2,RATING_CATEGORIES.length)"
                class="text-left">

                <image-rating v-if="provider" :src="'/static/star2.png'" :read-only="true"
                              :rating="parseInt(review[ratingCategory.id])"
                              :increment="1"
                              :inline="true"
                              :item-size="16" :show-rating="false"></image-rating>

                <b>{{ratingCategory.name}}</b>


              </div>
            </div>


          </div>
          <p id="extra_details">
            <b>Review on Behalf of: </b> {{review.on_behalf_of}}<br/>
            <b>Based on a Visit within: </b> {{review.last_visit_within}}<br/>
            <b>Visits to this Health Provider: </b> {{review.num_of_visits}}<br/>
            <b>Would Recommend: </b> {{review.does_recommend ? "Yes" : "No"}}<br/>
          </p>
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


  export default {
    name: 'Review',
    components: {},
    data() {
      return {

        provider: null,
        review: null,
        category: null,
        RATING_CATEGORIES: RATING_CATEGORIES,
        authorMode: false,
        author: null,
      };
    },
    created() {
      let requestUrl = BASE_API_URL;
      if (this.$route.query.id === null || this.$route.query.category === null) {
        alert("Missing parameters on url!");
        return;
      }
      let reviewId = this.$route.query.id;
      for (let i = 0; i < CATEGORIES.length; i++) {
        if (CATEGORIES[i].code == this.$route.query.category) {
          this.category = CATEGORIES[i];
          break;
        }
      }

      requestUrl += "reviews/" + reviewId + "/";
      console.log(requestUrl);
      axios.get(requestUrl)
        .then((response) => {
          console.log(response);

          this.review = response.data;
          //now must get provider
          let requestUrl = BASE_API_URL + (this.category.specialDevinCode ? this.category.specialDevinCode : this.category.code) + "/" + response.data.provider + "/";

          axios.get(requestUrl)
            .then((response) => {
              console.log(response);
              /* this.provider = response.data.provider;
                this.provider.category = this.getCategoryById(this.provider.category);*/
              this.provider = response.data;
              // self.provider.category = self.getCategoryById(self.provider.category);
              console.log(this.$cookie.get(this.category.id + "/" + this.provider.id), response.data.id);
              if (parseInt(localStorage.getItem('user_id', response.data.id)) == parseInt(response.data.author))
                this.authorMode = true;
              else if (parseInt(this.review.id) === parseInt(this.$cookie.get(this.category.id + "/" + this.provider.id)))
                this.authorMode = true;

            }, (error) => {
              console.log(error);
              alert(error);
            });
          if (this.review.author != null) {

            let requestUrl = BASE_API_URL + "accounts/" + this.review.author + "/";
            let self = self;
            axios.get(requestUrl)
              .then((response) => {
                console.log(response);
                this.author = response.data;

              }, (error) => {
                console.log(error);
                alert(error);
              });
          }

        }, (error) => {
          console.log(error);
          alert(error);
        });
      /* for (let i = 0; i < RATING_CATEGORIES.length; i++) {
         this.ratingCategories.push({
           id: RATING_CATEGORIES[i].id,
           name: RATING_CATEGORIES[i].name,
           rate: 0,
         })
       }*/
      //get short code of category:
      /* let categoryId = null;
       for (let i = 0; i < CATEGORIES.length; i++) {
         if (CATEGORIES[i].code == this.$route.query.category) {
           categoryId = CATEGORIES[i].id;
           break;
         }
       }*/


    },
    mounted() {

    },
    methods: {
      /**
       * Get corresponding category code for the id
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
       * Will delete the current review
       */
      delete: function () {
        if (confirm("Are you sure you want to delete this review?")) {
          let requestUrl = BASE_API_URL + "reviews/" + this.review.id + "/";
          let self = this;
          axios.delete(requestUrl, {}).then((response) => {
            console.log(response);
            self.$cookie.delete(self.category.id + "/" + self.provider.id);
            self.$notify({
              group: 'notifications',
              /*  title: 'Success',*/
              text: 'Your review was deleted',
              type: 'success',
            });
            self.$router.push({
              path: '/health-provider',
              query: {id: self.provider.id, category: self.category.code}
            });

          }, (error) => {
            console.log(error);
            alert(error);
          });
        }
      },

    },
  }
</script>
<style scoped>
  #user_data {
    margin-bottom: 0.4rem;
  }

  #review {
    font-size: 0.8rem;
  }

  #author_panel {
    margin-bottom: 0.6rem;
  }

  #author_panel button {
    border-radius: 0.2rem;
    margin-right: 0.2rem;
    margin-bottom: 0.4rem;
  }

  #averages_table {

    margin-bottom: 0.6rem;

  }

  .review-date {
    font-size: 0.7rem;
    font-weight: bold;
  }

  h4 {
    font-size: 1.2rem;
  }

  @media (max-width: 720px) {
    #averages_table {
      font-size: 0.7rem;
      margin-bottom: 0.6rem;

    }
  }

</style>
