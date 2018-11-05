<template>
  <div class="reviews container p-0">
    <vue-headful v-bind:title="'My Reviews'"/>

    <h2 class="colored-text form-title">My Reviews</h2>
    <div class="row">
      <div class="col-lg-10 offset-lg-1 col-md-12 col-xl-8 offset-xl-2 ">
        <div class="grey-box" id="reviews">
          <p v-if="reviews.length == 0">You have no reviews yet.</p>
          <div class="table-responsive  ">
            <table class="table " id="reviews_table">
              <tr class="review w-100" v-for="review in displayedReviews">
                <td>
                  <div class="container">
                    <div class="row ">
                      <div class="col">
                        <h4 class="colored-text mb-0">{{review.provider.name ? review.provider.name : "..."}}</h4>
                        <div class="review-date secondary-colored-text">{{review.date_of_visit}}</div>
                      </div>
                      <div class="col pr-0">
                        <div class="float-right">
                          <image-rating :src="'/static/star2.png'" :read-only="true"
                                        :rating="getAverageReviewScore(review)"
                                        :increment="1"
                                        :inline="true"
                                        :item-size="16" :show-rating="false"></image-rating>
                          <br/>
                          <div class="review-buttons-panel">
                            <button class="btn btn-custom btn-sm" title="View"
                                    @click="$router.push({ path: '/review', query: { id: review.id,category:review.provider_category  }})">
                              <icon
                                name="eye"
                                class=""></icon>
                            </button>
                            <button class="btn btn-outline-custom btn-sm" title="Edit"
                                    @click="$router.push({ path: '/update-review', query: { review_id: review.id,category:review.provider_category,id:review.provider.id  }})">
                              <icon
                                name="pencil"
                                class=""></icon>
                            </button>
                            <button class="btn btn-danger btn-sm" title="Delete"
                                    @click="deleteReview(review.id, review.provider.category.id)">
                              <icon
                                name="trash"
                                class=""></icon>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-2 review-text pb-3">
                      <div class="col pr-0">
                        {{review.content}}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="text-center">
            <button class="btn btn-custom btn-sm" v-on:click="showMoreReviews()"
                    v-if="(reviews.length > displayedReviews.length)">Show more
            </button>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>

  import {BASE_API_URL} from '../../constants.js';
  import axios from 'axios';
  import {RATING_CATEGORIES} from '../../constants.js';
  import {REVIEW_FIELDS} from '../../constants.js';
  import {CATEGORIES} from '../../constants.js';

  const INITIAL_REVIEWS_DISPLAYED = 5;
  var self = 'test';

  export default {
    name: 'Reviews',
    components: {},

    data() {
      return {
        requiresAuth: true,
        reviews: [],
        displayedReviews: [],
      }
        ;
    },
    created() {
      self = this;
     // console.log(localStorage.getItem('login_token'));
      axios.get(BASE_API_URL + "auth/user/", {headers: {Authorization: "Token " + localStorage.getItem('login_token')}})
        .then((response) => {
          this.reviews = response.data.authored_reviews;
          //Must still get the provider for each one when traspassing
          for (let i = 0; i < Math.min(INITIAL_REVIEWS_DISPLAYED, this.reviews.length); i++) {
            this.displayedReviews.push(this.reviews[i]);
            if (this.reviews[i].author != null && !isNaN(this.reviews[i].author)) {
              console.log(this.reviews[i]);
              axios.get(BASE_API_URL + this.reviews[i].provider_category + "/" + this.reviews[i].provider + "/", {headers: {Authorization: "Token " + localStorage.getItem('login_token')}})
                .then((response) => {
                  for (let i = 0; i < this.displayedReviews.length; i++) {
                    if (this.displayedReviews[i].provider == response.data.id) {
                      this.displayedReviews[i].provider = response.data;
                      this.displayedReviews[i].provider.category = this.getCategoryByCode(this.displayedReviews[i].provider_category);
                    }
                  }
                })
                .catch(function (error) {
                  console.log(error);
                  if (parseInt(error.response.status) == 401) {//not authorized
                    localStorage.removeItem('login_token');
                    localStorage.removeItem('user_id');
                    this.authenticated = false;
                    this.$router.push('/login');
                  }
                });
            }
          }

        })
        .catch(function (error) {
          console.log(error);
          if (parseInt(error.response.status) == 401) {//not authorized
            localStorage.removeItem('login_token');
            localStorage.removeItem('user_id');
            self.authenticated = false;

            self.$router.push('/login');
          }
        });

    },
    methods: {
      /**
       * Calculates average score in all types of scores for a review
       */
      getAverageReviewScore: function (review) {
        let sum = 0;
        for (let j = 0; j < RATING_CATEGORIES.length; j++) {
          // if (reviews[i].hasOwnProperty(property)) {
          sum += parseInt(review[RATING_CATEGORIES[j].id]);
          //  }
        }
        ;
        return Math.round(sum / RATING_CATEGORIES.length);
      },
      /**
       * Will delete the review
       * param id (int) review id
       */
      deleteReview: function (id, categoryId) {
        if (confirm("Are you sure you want to delete this review?")) {
          let requestUrl = BASE_API_URL + "reviews/" + id + "/";
          let self = this;
          axios.delete(requestUrl, {}).then((response) => {
            //remove from arrays
            for (let i = 0; i < self.reviews.length; i++) {
              if (self.reviews[i].id == id)
                self.reviews.splice(i, 1);
            }
            for (let i = 0; i < this.displayedReviews.length; i++) {
              if (self.displayedReviews[i].id == id) {
                self.$cookie.delete(self.displayedReviews[i].provider.category.id + "/" + self.displayedReviews[i].provider.id);
                self.displayedReviews.splice(i, 1);

              }
            }
            console.log(response);

            self.$notify({
              group: 'notifications',
              text: 'Your review was deleted',
              type: 'success',
            });

          }, (error) => {
            console.log(error);
            alert(error);
          });
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
       * Adds more reviews on display
       */
      showMoreReviews: function () {
        let originalLength = this.displayedReviews.length;
        for (let i = 0; i < Math.min(INITIAL_REVIEWS_DISPLAYED, this.reviews.length - this.displayedReviews.length); i++) {
          this.displayedReviews.push(this.reviews[originalLength + i]);
        }
      },
    },
  };
</script>
}
<style scoped>
  #reviews {
    font-size: 0.8rem;
  }

  .review {
    width: 100%;
  }

  .review-buttons-panel button {
    border-radius: 2px;
  }


</style>
