<template>
  <div class="compare container p-0">
    <h1>Compare Listings</h1>
    <div class="table-responsive">
      <table id="comparison_table" class="table table-bordered table-hover ">
        <tr>
          <th>

          </th>
          <td v-for="(provider,index) in providers">
            <a href="javascript:;" v-on:click="providers.splice(index,1)" title="Remove provider">
              <icon
                name="times-circle"
                class="close-icon"></icon>
            </a>
            <br/>
            <img v-if="provider.photo" v-bind:src="provider.photo" v-bind:alt="provider.name+' photo' "
                 class="provider-photo img-fluid"/>
            <router-link :to="{ path: '/health-provider', query: { id: provider.id,category:provider.category.code }}"
            >
              <b>{{provider.name}}</b></router-link>
          </td>
        </tr>
        <tr>
          <th>
            Category
          </th>

          <td v-for="(provider,index) in providers" v-html="provider.category.name">

          </td>
        </tr>
        <tr>
          <th>
            Operation days/hours
          </th>

          <td v-for="(provider,index) in providers" v-html="getOpeningHoursString(provider)">

          </td>
        </tr>
        <tr v-for="(ratingCategory,ratingIndex) in RATING_CATEGORIES">
          <th>
            {{ratingCategory.name}}
          </th>

          <td v-for="(provider,index) in providers">
            <image-rating :src="'/static/star2.png'" :read-only="true" :rating="provider.scores[ratingIndex].score"
                          :increment="1"
                          :inline="true"
                          :item-size="16" :show-rating="false"></image-rating>
          </td>

        </tr>
        <tr>
          <th>
            Reviews
          </th>
          <td v-for="(provider,index) in providers">
            {{provider.reviews ? provider.reviews.length : 0}}
          </td>
        </tr>
        <tr>
          <th>
            Average score
          </th>
          <td v-for="(provider,index) in providers">
            <image-rating :src="'/static/star2.png'" :read-only="true"
                          :rating="provider.scores[RATING_CATEGORIES.length].score"
                          :increment="1"
                          :inline="true"
                          :item-size="16" :show-rating="false"></image-rating>
          </td>
        </tr>
        <tr>
          <th v-bind:colspan="(providers.length +1)">
            <b>Contact Info</b>
          </th>
        </tr>
        <tr>
          <th>
            Address
          </th>
          <td v-for="(provider,index) in providers">
            {{provider.street_address}}
          </td>
        </tr>
        <tr>
          <th>
            City
          </th>
          <td v-for="(provider,index) in providers">
            {{provider.city}}
          </td>
        </tr>
        <tr>
          <th>
            State
          </th>
          <td v-for="(provider,index) in providers">
            {{provider.state}}
          </td>
        </tr>
        <tr>
          <th>
            Zipcode
          </th>
          <td v-for="(provider,index) in providers">
            {{provider.zip_code}}
          </td>
        </tr>
        <tr>
          <th>
            Website Address
          </th>
          <td v-for="(provider,index) in providers">
            <span v-html="getWebsiteLink(provider)"></span>
          </td>
        </tr>
        <tr>
          <th>
            Phone Number
          </th>
          <td v-for="(provider,index) in providers">
            {{(provider.phone_number == null) ? "N/A" : provider.phone_number}}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

  import {BASE_API_URL} from '../constants.js';
  import {CATEGORIES} from '../constants.js';
  import {RATING_CATEGORIES} from '../constants.js';
  import {DAYS_WEEK} from '../constants.js';
  import axios from 'axios';
  import {ImageRating} from 'vue-rate-it';

  export default {
    name: 'Compare',
    components: {},
    data() {
      return {
        providers: [],
        RATING_CATEGORIES: RATING_CATEGORIES,

      }
    },
    created() {
      //request data
      console.log(this.$route.query.providers_categories);
      for (let i = 0; i < this.$route.query.providers.length; i++) {
        let requestUrl = BASE_API_URL;
        requestUrl += this.getCategoryCode(this.$route.query.providers_categories[i]);
        requestUrl += "/" + this.$route.query.providers[i] + "/";
        axios.get(requestUrl)
          .then((response) => {
            console.log(response.data);
            this.providers.push(
              {
                photo: response.photo,
                id: response.data.id,
                name: response.data.name,
                scores: this.getAverageScores(response.data.reviews),
                mon_hours: response.data.mon_hours,
                tue_hours: response.data.tue_hours,
                wed_hours: response.data.wed_hours,
                thu_hours: response.data.thu_hours,
                fri_hours: response.data.fri_hours,
                sat_hours: response.data.sat_hours,
                sun_hours: response.data.sun_hours,
                street_address: response.data.street_address,
                city: response.data.city,
                state: response.data.state,
                zip_code: response.data.zip_code,
                reviews: response.data.reviews,
                website: response.data.website,
                phone_number: response.data.phone_number,
                category: this.getCategoryById(response.data.category),
                meetings: response.data.meetings,

              }
            );

          }, (error) => {
            console.log(error);
            this.loading = false;
          })
      }

    },
    methods: {
      /**
       * Get corresponding category code for the id
       * @param string id category id
       */
      getCategoryCode: function (id) {
        for (let i = 0; i < CATEGORIES.length; i++) {
          if (CATEGORIES[i].id == id)
            return CATEGORIES[i].code;
        }
      },
      /**
       * Returns average score
       * @param {array of object} reviews
       * @returns {object}
       */
      getAverageScores: function (reviews) {
        let scores = [];
        for (let i = 0; i < RATING_CATEGORIES.length; i++) {
          scores.push({
            type: RATING_CATEGORIES[i],
            score: 0,
          });

        }

        let sum = 0;
        let fieldsQty = 0;
        if (reviews.length > 0)
          for (let j = 0; j < RATING_CATEGORIES.length; j++) {
            let property = RATING_CATEGORIES[j].id;
            let fieldSum = 0;
            let fieldReviews = 0;
            for (let i = 0; i < reviews.length; i++) {
              fieldsQty = 0;//count fields

              if (reviews[i].hasOwnProperty(property)) {
                sum += reviews[i][property];
                fieldSum += parseInt(reviews[i][property]);
              }

            }
            scores[j].score = Math.round(fieldSum / reviews.length);
          }
        scores.push({
          type: {
            id: 'average_rating',
            name: 'Average',
          },
          score: (reviews.length == 0 ? 0 : Math.round(sum / reviews.length / RATING_CATEGORIES.length)),
        });
        return scores;
      },
      /**
       * Returns the opening hours as string
       * @return string
       */
      getOpeningHoursString(provider) {
        let openingString = "";

         for (let i = 0; i < DAYS_WEEK.length; i++) {
           console.log(provider, DAYS_WEEK[i].id + "_hours");
           if (provider[DAYS_WEEK[i].id + "_hours"] != null && provider[DAYS_WEEK[i].id + "_hours"] != "")
             openingString += DAYS_WEEK[i].name + " " + provider[DAYS_WEEK[i].id + "_hours"] + " <br/>";
         }
       /* if (!provider.meetings)
          return "N/A";*/
       if(provider.meetings)
        for (let i = 0; i < provider.meetings.length; i++) {
          openingString += /*(i > 0 ? ", " : '') +*/ this.getFullDay(provider.meetings[i].meeting_day) + " " + provider.meetings[i].meeting_time + "<br/>";
        }

        if (openingString == "")
          openingString = "N/A";
        return openingString;
      },
      /**
       * Get link for website as html
       * @param object provider
       * @return string
       */
      getWebsiteLink: function (provider) {
        console.log(provider.website);
        if (provider.website == null || provider.website == "")
          return "N/A";
        else return "<a href='" + provider.website + "'>" + provider.website + "</a>"
      },
      /**
       * Get corresponding category code for the id
       * @param string id category id
       */
      getCategoryById: function (id) {
        for (let i = 0; i < CATEGORIES.length; i++) {
          if (CATEGORIES[i].id == id || (CATEGORIES[i].specialDevinCode && CATEGORIES[i].specialDevinCode == id))
            return CATEGORIES[i];
        }
      },
      /**
       * Get full day of week out of abbreviation
       * @param code {string}
       * @return string
       */
      getFullDay: function (code) {
        for (let i = 0; i < DAYS_WEEK.length; i++) {
          if (DAYS_WEEK[i].id == code)
            return DAYS_WEEK[i].name;
        }
      },
    },
  }
</script>

<!-- Add " scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 1.7rem;
    text-align: left;
    margin-bottom: 12px;
  }

  #comparison_table {
    border-collapse: collapse;
  }

  #comparison_table, th, td {
    border: 1px solid #ced4da;
    text-align: left;
    font-size: 0.8rem;
  }

  #comparison_table th, #comparison_table td {
    padding: 0.5rem;
  }

  #comparison_table th {
    background-color: #E8E8E8;
    font-weight: normal;
  }

  .provider-photo {
    max-width: 80%;
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.8rem;
  }

  .close-icon {
    cursor: pointer;
    float: left;
    color: #4b5456;
  }
</style>
