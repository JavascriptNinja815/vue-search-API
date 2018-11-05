<template>
  <div class="provider container p-0">
    <vue-headful v-if="provider"
                 v-bind:title="provider.name"
                 v-bind:description="provider.description"
    />
    <span class="d-none"><?php
    $customFields = ['type_of_care','service_setting','payment_or_insurance_accepted','payment_assistance_available','special_programs_and_groups_offered','ancillary_services','age_groups_accepted','language_services',
    'emergency_mental_health_services','facility_operation',''];

    // Method: POST, PUT, GET etc
// Data: array("param" => "value") ==> index.php?param=value

    function CallAPI($method, $url, $data = false)
    {
    $curl = curl_init();

    switch ($method)
    {
    case "POST":
    curl_setopt($curl, CURLOPT_POST, 1);

    if ($data)
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    break;
    case "PUT":
    curl_setopt($curl, CURLOPT_PUT, 1);
    break;
    default:
    if ($data)
    $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
    }

    //get provider data:
      $data = json_decode(CallAPI("GET","https://patientreviewnetwork.win/".$_GET['category']."/".$_GET['id']."/"));


      ?></span>
    <div class="page-title">
      <router-link class="primary-link"
                   :to="{ path: '/'}">Home
      </router-link>
      »
      <a v-if="provider" class="primary-link"
         v-bind:href="'/'+ provider.category.code ">{{provider.category.name}}</a>
      » <span class="colored-text">{{(provider) ? provider.name : ''}}</span><span v-if="!provider"><?php echo $data->
      name ?></span>
    </div>
    <div class="row">
      <div class="col-md-9">
        <div id="provider_details">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel"
               v-if="(provider != null && provider.photos != null && provider.photos.length > 0)">
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item active" v-for="photo in provider.photos">
                <img class="d-block img-fluid" src="/callback.png" alt="First slide">
              </div>

            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div id="provider_texts">
            <h1>{{(provider) ? provider.name : ''}}<span v-if="!provider"><?php echo $data->name ?></span></h1>
            &nbsp;<span id="claimed_sign"
                        v-if="provider && provider.claimed_by">   <icon
            name="check-circle"
          ></icon> Claimed</span>
            <br/>
            <image-rating v-if="provider" :src="'/static/star2.png'" :read-only="true"
                          :rating="getAverageScore(provider.reviews)"
                          :increment="1"
                          :inline="true"
                          :item-size="16" :show-rating="false"></image-rating>
            <span>({{provider ? provider.reviews.length : '' }} reviews)</span><br/>


          </div>
          <div class="row">
            <div class="col">
              <div id="directions_box" class="clearfix">
                <div>
                  <icon class="colored-text"
                        name="map-marker"
                  ></icon>
                  <span v-if="!provider"><?php echo $data->street_address ?>, <?php
                   echo $data->city ?>, <?php echo $data->state ?> <?php echo $data->zip_code ?></span>
                  {{provider ? provider.street_address : ''}}, {{provider ? provider.city : ''}}, {{provider ? provider.state : ''}} {{provider ? provider.zip_code : ''}} {{provider ? provider.state : ''}} {{(provider && provider.directions) ? "(" + provider.directions + ")" : ''}}
                </div>
                <div v-if="(!provider || (provider.phone))">
                  <icon class="colored-text"
                        name="phone"
                  ></icon>
                  <span v-if="!provider"><?php echo $data->phone_number ?></span><a v-if="provider"
                                                                                    v-bind:href="'tel:'+provider.phone_number">

                  {{(provider && provider.phone_number) ? provider.phone_number : ''}}
                </a>
                </div>
                <div>
                  <icon class="colored-text"
                        name="location-arrow"
                  ></icon>
                  <a v-if="provider"
                     v-bind:href="'https://www.google.com/maps/dir//'+provider.street_address+', '+provider.city+', '+provider.state+' '+provider.zip_code+', USA'">Get Directions</a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p v-if="provider && getDescription() != ''" class="description" v-html="getDescription()">

              </p>
              <p v-if="!provider" class="description"><?php
foreach($customFields as $field)
  {
  if(isset($data->{$field}) )
                echo '<b>'.str_replace('_',' ',$field).':</b> '.$data->{$field}.'.<br/>';
                }
                ?></p>
            </div>
          </div>


          <div id="averages_table" class="row">
            <div class="col-sm-6">
              <div v-for="(ratingCategory,index) in RATING_CATEGORIES.slice(0,RATING_CATEGORIES.length/2)"
                   class="text-left">

                <image-rating v-if="provider" :src="'/static/star2.png'" :read-only="true"
                              :rating="provider.scores[index].score"
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
                              :rating="provider.scores[index2 + RATING_CATEGORIES.length/2].score"
                              :increment="1"
                              :inline="true"
                              :item-size="16" :show-rating="false"></image-rating>

                <b>{{ratingCategory.name}}</b>


              </div>
            </div>


          </div>
          <div class="row">
            <div class="col-lg-6 col-md-8 text-left mt-md-0" id="big_share_buttons">
              <button class="btn btn-outline-custom"
                      v-on:click="$router.push(reviewId?'/update-review/?id='+provider.id+'&category='+provider.category.code+'&review_id='+reviewId:'/add-review/?id='+provider.id+'&category='+provider.category.code)">
                <icon
                  name="star"
                  class=""></icon>
                {{reviewId ? 'Update Review' : 'Write a Review'}}
              </button> &nbsp;<a class="btn btn-custom" v-if="provider && provider.website"
                                 v-bind:href="provider.website"
            >
              <icon
                name="link"
                class=""></icon>
              Visit Website
            </a>

            </div>

            <div class="col-lg-6 col-md-4 text-right h-100">
              <div id="mini_links" class="">
                <a href="javascript:;" v-on:click="addPhoto()">
                  <icon
                    name="camera"
                    class="">
                  </icon>&nbsp;Add photo</a> &nbsp;<a href="javascript:void(0)" v-on:click="bookmark()">
                <icon
                  name="bookmark"
                  class="">
                </icon>&nbsp;{{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}}</a>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col text-left">
              <vue-goodshare-facebook v-if="provider"
                                      :page_title="provider.name"
                                      v-bind:page_url="$route.query.page"
                                      title="Share through Facebook"
                                      has_counter
                                      has_icon
              ></vue-goodshare-facebook>
              <vue-goodshare-twitter
                v-if="provider"
                :page_title="provider.name"
                v-bind:page_url="$route.query.page"
                title="Share through Twitter"
                has_counter
                has_icon
              ></vue-goodshare-twitter>
              <vue-goodshare-google-plus
                v-if="provider"
                :page_title="provider.name"
                v-bind:page_url="$route.query.page"
                title="Share through Google+"
                has_counter
                has_icon
              ></vue-goodshare-google-plus>
              <a class="btn btn-custom share-button" v-if="provider" id="mail_button"
                 v-bind:href="'mailto:?subject=Look at this health provider: '+provider.name+'&body=I found this page that may interest you: '+currentRoute+'?id='+$route.query.id+'%26category='+$route.query.category+' .'"
                 title="Share through mail"
              >
                <icon scale="1"
                      name="envelope"
                      class=""></icon>
              </a> <a class="btn btn-custom  share-button" v-if="provider" id="sms_button"
                      v-bind:href="'sms:my_phone_number?body=Look at this health provider: '+currentRoute+'?id='+$route.query.id+'%26category='+$route.query.category+' .'"
                      title="Share through SMS"
            >
              <icon scale="1"
                    name="comment"
                    class=""></icon>
            </a>
            </div>
          </div>


        </div>

      </div>
      <div class="col-md-3 mt-4 mt-sm-4 mt-md-0">
        <div class="page-column" v-if="provider && hasHours(provider)">
          <h3 class="cell-title colored-text">Hours</h3>
          <table id="hours_table" class=" table-responsive">
            <tr v-for="(day,index) in DAYS_WEEK" v-if="provider[day.id+'_hours']">
              <td><span
                class="d-lg-inline d-inline d-sm-inline d-md-none"><b>{{day.name.charAt(0).toUpperCase() + day.name.slice(1)}}</b></span><span
                class="d-lg-none d-none d-sm-none d-md-inline"><b>{{day.id.charAt(0).toUpperCase() + day.id.slice(1)}}</b></span>
                {{provider[day.id + '_hours']}}
                <span v-html="printTimeStatus(index, provider[day.id + '_hours'])"></span>
              </td>
            </tr>
          </table>
        </div>

        <div class="page-column">
          <div id="map">

          </div>
          <br/>
          <div id="pano">

          </div>
        </div>


      </div>
    </div>
    <div id="meetings" class="mt-2"
         v-if="($route.query.category == 'aa-locations' || $route.query.category == 'na-locations'  )">
      <h4 class="text-left">Meetings</h4>
      <div class="table-responsive">
        <table id="meetings_table" class="mb-4 mb-sm-4 ">
          <tr>
            <th>Name</th>
            <th>Day</th>
            <th>Time</th>
            <th v-if="!provider">Format</th>
            <template v-if="provider && provider.meetings !== undefined && provider.meetings.length > 0">
              <th
                v-for="filter in getMeetingCategoryFilters(provider.meetings[0].category)">
                {{filter.name}}
              </th>
            </template>
          </tr>
          <template v-if="!provider">
            <?php
            function getFormat($meeting)
            {
            if($meeting->is_discussion)
            return "Discussion / Participation";
            elseif($meeting->is_step_meeting)
            return "Step Meeting";
            elseif($meeting->is_big_book)
            return "Big Book";
            elseif($meeting->is_speaker)
            return "Speaker";
            elseif($meeting->is_step_study)
            return "Literary Study";
            elseif($meeting->is_tradition_study)
            return "Tradition Study";
            elseif($meeting->is_12_concepts)
            return "12 Concepts";
            elseif($meeting->is_basic_text)
            return "Basic Concept";
            elseif($meeting->is_candlelight)
            return "Candle Light";
            elseif($meeting->is_ip_study)
            return "IP Study";
            elseif($meeting->is_just_for_today_study)
            return "Just for Today Study";
            elseif($meeting->is_living_clean)
            return "Living Clean";
            elseif($meeting->is_meditation)
            return "Meditation";
            elseif($meeting->is_q_and_a)
            return "Q & A";
            elseif($meeting->is_step_working_guide)
            return "Step Working Guide";
            elseif($meeting->is_topic)
            return "Topic";
            elseif($meeting->does_format_vary)
            return "Format Varies";
            else return "";
            }

            foreach($data->meetings as $meeting)
            {
            echo "
            <tr>
              <td>".$meeting->name."</td>
              <td>".$meeting->meeting_day."</td>
              <td>".$meeting->meeting_time."</td>
              <td>".getFormat($meeting)."</td>
            </tr>
            ";
            }
            ?>

          </template>
          <template v-if="provider">
            <tr v-for="meeting in provider.meetings"
                v-if="provider && provider.meetings && provider.meetings.length > 0">
              <td>
                {{meeting.name}}
              </td>
              <td>
                {{getFullDay(meeting.meeting_day)}}
              </td>
              <td>
                {{meeting.meeting_time}}
              </td>

              <td
                v-for="filter in getMeetingCategoryFilters(meeting.category)">
                {{getFieldValues(meeting, filter.id)}}
              </td>
            </tr>
          </template>
        </table>
        <p class="small-text" id="last_updated"
           v-if="provider && provider.meetings !== undefined && provider.meetings.length > 0 && meetingsLastUpdate != null">
          Last updated: {{meetingsLastUpdate}}
        </p>
      </div>
    </div>
    <div id="reviews" class="w-100 clearfix grey-box">
      <div class="">
        <table class="table  " id="reviews_table">
          <tr>
            <td class="d-none d-sm-table-cell">

            </td>
            <td>
              <div class="container-fluid">
                <div class="row">
                  <div class="col pl-0">
                    <h2 class="colored-text">Reviews</h2>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="displayedReviews.length == 0">
            <td></td>
            <td>There are no reviews yet. Be the first to <a href="javascript:void(0);"
                                                             v-on:click="$router.push(reviewId?'/update-review/?id='+provider.id+'&category='+provider.category.code+'&review_id='+reviewId:'/add-review/?id='+provider.id+'&category='+provider.category.code)">write one</a>.
            </td>
          </tr>
          <tr class="review" v-if="provider" v-for="review in displayedReviews">

            <td class="avatar d-none d-sm-table-cell">
              <icon class="colored-text"
                    name="user-circle" scale="3"
              ></icon> &nbsp;&nbsp;
            </td>
            <td class="container-fluid">

              <div class="row ">
                <div class="col">
                  <h4 class="colored-text mb-0">
                    <icon class="colored-text d-inline d-sm-none"
                          name="user-circle" scale="1"
                    ></icon>
                    {{review.pseudonym ? review.pseudonym : review.author.username}}
                  </h4>
                  <div class="review-date secondary-colored-text">{{review.date_of_visit}}</div>
                </div>
                <div class="col pr-0">
                  <div class="review-mini-panel">
                    <image-rating v-if="provider" :src="'/static/star2.png'" :read-only="true"
                                  :rating="getAverageReviewScore(review)"
                                  :increment="1"
                                  :inline="true"
                                  :item-size="16" :show-rating="false"></image-rating>
                    <br/>
                    <button class="btn btn-custom btn-sm" id="view_button"
                            @click="$router.push({ path: '/review', query: { id: review.id,category:$route.query.category  }})">
                      <icon
                        name="eye"
                        class=""></icon>
                      View
                    </button>
                    <button class="btn btn-outline-custom btn-sm"
                            @click="$router.push({ path: '/review', query: { id: review.id,category:$route.query.category  }})">
                      <icon
                        name="pencil"
                        class=""></icon>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mt-2 review-text pb-3">
                <div class="col pr-0">
                  {{review.content}}
                </div>
              </div>

            </td>
          </tr>
        </table>
      </div>
      <div class="text-center">
        <button class="btn btn-custom btn-sm" v-on:click="showMoreReviews()"
                v-if="(provider && provider.reviews.length > displayedReviews.length)">Show more
        </button>

      </div>


    </div>
    <br/>
    <div class="text-center" id="claim_options">
      <!--  Are you the owner of <span v-if="!provider"><?php echo $data->name ?></span><span v-else>{{provider.name}}</span>
        and want to get access to this entry? Click <a href="/login">here to Claim it</a><br/>
        Found errors? Know information that should be added? Go to
        <router-link v-if="provider" class="primary-link"
                     :to="{ path: '/user/suggest-provider-changes', query:{id:provider.id,category:$route.query.category}}">
          this form
        </router-link>-->
      <button class="btn btn-outline-custom btn-sm" id="suggest_changes_button"
              @click="$router.push({ path: '/user/suggest-provider-changes', query:{id:provider.id,category:$route.query.category}})">
        <icon
          name="pencil"
          class=""></icon>
        Suggest changes
      </button>
      <button class="btn btn-custom btn-sm" id="claim_button"
              @click="$router.push({ path: '/login', query:{}})">
        <icon
          name="get-pocket"
          class=""></icon>
        Claim as owner
      </button>
      <br/>
    </div>
  </div>
</template>

<script>

  import {BASE_API_URL} from '../constants.js';
  import {CATEGORIES} from '../constants.js';
  import {REVIEW_FIELDS} from '../constants.js';
  import {DAYS_WEEK} from '../constants.js';
  import {ImageRating} from 'vue-rate-it';
  import axios from 'axios';
  import {RATING_CATEGORIES} from '../constants.js';
  // Import vue-goodshare single elements
  import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
  import VueGoodshareTelegram from 'vue-goodshare/src/providers/Telegram.vue'
  import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
  import VueGoodshareWhtasApp from 'vue-goodshare/src/providers/WhatsApp.vue'
  import VueGoodshareGooglePlus from "../../node_modules/vue-goodshare/src/providers/GooglePlus.vue";
  import VueGoodshareWhatsApp from "../../node_modules/vue-goodshare/src/providers/WhatsApp.vue";

  const INITIAL_REVIEWS_DISPLAYED = 5;

  var map = null;
  var streetViewMap = null;
  var mapCoordinates = null;

  /**
   * Initialize google maps
   * @param string categoryId
   */
  function initMaps(provider) {
    console.log(provider);
    var fenway = new google.maps.LatLng(provider.latitude, provider.longitude);
    console.log(fenway.lat(), provider.latitude, provider.longitude);

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: fenway,
      mapTypeControl: false,
      streetViewControl: false,
    });

    var marker = new google.maps.Marker({
      position: fenway,
      animation: google.maps.Animation.DROP,
      map: map,
      title: provider.name,
      icon: "/static/marker_" + provider.category.id + ".png",
      visible: true
    });
    marker.setMap(map);
    console.log('marker', marker);

    streetViewMap = new google.maps.Map(document.getElementById('pano'), {
      center: fenway,
      zoom: 14
    });

    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: fenway,
        /*  pov: {
            heading: 34,
            pitch: 10
          }*/
      });

    streetViewMap.setStreetView(panorama);

  };


  export default {
    name: 'Provider',
    components: {
      VueGoodshareWhatsApp,
      VueGoodshareGooglePlus,
      VueGoodshareFacebook,
      VueGoodshareTwitter

    },
    data() {
      return {
        notifySearchBarChanges: false,
        categoryLink: "",
        provider: null,
        DAYS_WEEK: DAYS_WEEK,
        displayedReviews: [],
        reviewId: null,
        currentRoute: "https://" + window.location.host,
        RATING_CATEGORIES: RATING_CATEGORIES,
        AAMeetingDisplayFields: ['aa_who_can_attend', 'aa_is_wheelchair_accessible', 'aa_formats', 'aa_is_smoking_permitted', 'aa_languages', 'is_open_to_family_members_and_friends'],
        /* NAMeetingDisplayFields : ['na_who_can_attend','na_is_wheelchair_accessible','na_formats','na_is_smoking_permitted'],*/

      };
    },
    created() {
      let requestUrl = BASE_API_URL;
      if (this.$route.query.category === null || this.$route.query.id === null) {
        alert("Missing parameters on url!");
        return;
      }
      requestUrl += this.$route.query.category + "/" + this.$route.query.id + "/";
      console.log(requestUrl);
      axios.get(requestUrl)
        .then((response) => {

          this.provider = response.data;
          this.provider.category = this.getCategoryById(this.provider.category);
          let coordinateString = response.data.location.substring(response.data.location.lastIndexOf("(") + 1, response.data.location.lastIndexOf(")"));
          let coordinateParts = coordinateString.split(" ");
          this.provider.latitude = parseFloat(coordinateParts[1]);
          this.provider.longitude = parseFloat(coordinateParts[0]);
          this.provider.average_overall_rating = parseFloat(this.provider.average_overall_rating);
          initMaps(this.provider);
          for (let i = 0; i < Math.min(this.provider.reviews.length, INITIAL_REVIEWS_DISPLAYED); i++) {
            this.displayedReviews.push(this.provider.reviews[i]);
            //need to bring user name if written by a registered user
            if (this.provider.reviews[i].author != null && !isNaN(this.provider.reviews[i].author)) {
              requestUrl = BASE_API_URL + "accounts/" + this.provider.reviews[i].author + "/";
              axios.get(requestUrl)
                .then((response) => {
                  console.log(response);
//optimization: replace author in any review that is present
                  for (let i = 0; i < this.displayedReviews.length; i++) {
                    if (this.displayedReviews[i].author == response.data.id)
                      this.displayedReviews[i].author = response.data;
                  }

                }, (error) => {
                  console.log(error);
                  /*    alert(error);*/
                });
            }
          }
          //retrieve cookie for review
          console.log('looking for cookie ' + this.provider.category.id + "/" + this.provider.id);
          this.reviewId = this.$cookie.get(this.provider.category.id + "/" + this.provider.id);
          this.provider.scores = this.getAverageScores(this.provider.reviews);

        }, (error) => {
          console.log(error);
          /*    alert(error);*/
        });
      window.scrollTo(0, 0);
    },
    mounted() {
      document.dispatchEvent(new Event('render-trigger'));
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
      }
      ,
      /**
       * Checks if provider has hours set
       * @param  provider object
       * @return boolean
       */
      hasHours: function (provider) {
        for (let i = 0; i < DAYS_WEEK.length; i++) {
          console.log(DAYS_WEEK[i].id + '_hours');
          if (provider[DAYS_WEEK[i].id + '_hours'])
            return true;
        }
        return false;
      },
      /**
       * Returns status in HTML for open or closed location on current time
       * @param day integer
       * @param timeString string
       * @returns string
       */
      printTimeStatus: function (day, timeString) {
        //first check day of week:
        let myDate = new Date();
        if (myDate.getDay() !== (day + 1) && !(myDate.getDay() === 0 && day === (DAYS_WEEK - 1)))
          return "";

        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;

        let suffix = "AM";
        if (hours >= 12) {
          suffix = "PM";
          hours = hours - 12;
        }
        if (hours === 0) {
          hours = 12;
        }
        let current_time = hours + ":" + minutes + " " + suffix;

        let timeParts = timeString.split('-');

        if (this.get24Hr(current_time) > this.get24Hr(timeParts[0]) && this.get24Hr(current_time) < this.get24Hr(timeParts[1])) {
          //in between these two times
          return "<span class='text-success'>Open Now</span>";
        } else {
          return "<span class='text-danger'>Closed Now</span>";
        }

      },
      get24Hr: function (time) {
        let hours = Number(time.match(/^(\d+)/)[1]);
        let AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM === "PM" && hours < 12) hours = hours + 12;
        if (AMPM === "AM" && hours === 12) hours = hours - 12;

        let minutes = Number(time.match(/:(\d+)/)[1]);
        hours = hours * 100 + minutes;
        console.log(time + " - " + hours);
        return hours;
      },
      /**
       * Returns average score
       * @param array of object reviews
       */
      getAverageScore: function (reviews) {
        if (reviews.length == 0) return 0;
        let sum = 0;

        for (let i = 0; i < reviews.length; i++) {


          // if (reviews[i].hasOwnProperty(property)) {
          sum += parseInt(this.getAverageReviewScore(reviews[i]));
          //  }

        }
        return Math.round(sum / reviews.length);
      },
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
       * If user is logged in, add to his favorites
       */
      bookmark() {

        if (!this.$parent.authenticated)
          this.$router.push('/login');
        else {
          this.provider.favorited_by.push(localStorage.getItem('user_id'));
          let params = Object.assign({}, this.provider);
          params.category = this.provider.category.id;
          params.favorited_by.push(localStorage.getItem('user_id'));
          axios.put(BASE_API_URL + this.provider.category.code + "/" + this.provider.id + "/", params,
           {Authorization: "Token " + localStorage.getItem('login_token'),

          })
            .then(function (response) {
              console.log(response, response.data);
              if (parseInt(error.response.status) == 401) {//not authorized
                localStorage.removeItem('login_token');
                localStorage.removeItem('user_id');
                this.authenticated = false;
                this.$router.push('/login');
              }
              if (response.status != 201) {
                console.log(response);
                alert("There was an error bookmarking, please try again later or contact support");

                return;
              }
              else {//approved
                this.$notify({
                  group: 'notifications',
                  /*  title: 'Success',*/
                  text: 'Health provider was bookmarked',
                  type: 'success',
                });
              }

            })
            .catch(function (error) {
              console.log(error);
              alert("There was an error bookmarking, please try again later or contact support");


            });


        }
      },
      /**
       * If user is logged in, open form to add photo
       */
      addPhoto() {
        if (this.$parent.authenticated)
          this.$router.push('/login');
        else {
          //@TODO send request

        }
      },
      /**
       * Adds more reviews on display
       */

      showMoreReviews: function () {
        let originalLength = this.displayedReviews.length;
        for (let i = 0; i < Math.min(INITIAL_REVIEWS_DISPLAYED, this.provider.reviews.length - this.displayedReviews.length); i++) {
          this.displayedReviews.push(this.provider.reviews[originalLength + i]);
        }
      },
      /**
       * Returns info as HTML
       * @return string
       */
      getDescription: function () {
        let code = "";
        let provider = this.provider;
        for (let i = 0; i < provider.category.filters.length; i++) {

          let filter = provider.category.filters[i];
          // console.log(filter.id.substring(3), provider[filter.id.substring(3)]);
          if (provider[filter.id.substring(3)] && provider[filter.id.substring(3)] != "")
            code += "<b>" + filter.name + ":</b> " + provider[filter.id.substring(3)] + ".<br/>";
        }
        if (provider.notes && provider.notes != "")
          code += "<b>Notes:</b> " + provider.notes;
        return code;
      },
      /**
       * Returns all active attributes for a meeting as html code
       * @param {object} meeting
       * @return string
       */
      getMeetingCharacteristics(meeting) {
        let code = "";
        let index = null;
        if (meeting.category == "aa_meeting")
          index = 6;
        if (meeting.category == "na_meeting")
          index = 7;

        for (let i = 0; i < CATEGORIES[index].filters.length; i++) {
          let filter = CATEGORIES[index].filters[i].id.substring(3);
          if (meeting[filter] && meeting[filter] == true)
            code += (code == "" ? "" : ", ") + CATEGORIES[index].filters[i].name;
          else //go through options
            for (let j = 0; j < CATEGORIES[index].filters[i].options.length; j++) {
              let option = CATEGORIES[index].filters[i].options[j].id;
              if (meeting[option] && meeting[option] == true)
                code += (code == "" ? "" : ", ") + CATEGORIES[index].filters[i].options[j].name;
            }
        }

        return code;
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
      /**
       * Returns a displayable code for all the active results of a field
       * @param meeting {object}
       * @param fieldId {string}
       * @return string
       */
      getFieldValues: function (meeting, fieldId) {
        let code = "";
        let filters = this.getMeetingCategoryFilters(meeting.category);
        // console.log(fieldId.substring(3), meeting[fieldId.substring(3)]);
        if (meeting[fieldId.substring(3)] !== undefined && meeting[fieldId.substring(3)] === true)
          return "Yes";
        if (meeting[fieldId.substring(3)] !== undefined && meeting[fieldId.substring(3)] === false)
          return "No";
        for (let i = 0; i < filters.length; i++) {
          for (let j = 0; j < filters[i].options.length; j++) {
            let option = filters[i].options[j].id;
            /* if (option != fieldId)
               continue;*/
            if (meeting[option] && meeting[option] == true && (fieldId == option || fieldId == filters[i].id))
              code += (code == "" ? "" : ", ") + filters[i].options[j].name;
          }

        }
        return code;
      },
      /**
       * Returns array of filters objects
       * @param categoryId {string}
       * @returns {Array}
       */
      getMeetingCategoryFilters: function (categoryId) {
        let filters = [];
        let index = null;
        //note: removing first item
        if (categoryId == "aa_meeting") {
          let filters = CATEGORIES[6].filters.slice(1);
          let resultingFilters = [];
          for (let i = 0; i < filters.length; i++) {
            if (this.AAMeetingDisplayFields.indexOf(filters[i].id) > -1)
              resultingFilters.push(filters[i]);
          }
          return /*CATEGORIES[6].filters.slice(1)*/resultingFilters;
        }
        if (categoryId == "na_meeting")
          return CATEGORIES[7].filters.slice(1);
        return [];


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


    },
    computed: {
      /**
       * Get the date of last update from meetings
       */
      meetingsLastUpdate: function () {

        let lastDate = null;
        for (let i = 0; i < this.provider.meetings.length; i++) {
          if (this.provider.meetings[i].source_last_updated == null)
            continue;
          let date = new Date(this.provider.meetings[i].source_last_updated);
          if (lastDate == null || date.getTime() > lastDate.getTime()) {
            lastDate = date;
          }
        }
        if (lastDate == null)
          return null;
        return lastDate.getMonth() + "-" + lastDate.getDay() + "-" + lastDate.getFullYear();
      },
      /**
       * Determines if it's bookmarked by the current user
       * @return boolean
       */
      isBookmarked: function () {
        if (this.provider == null)
          return false;
        if (!this.$parent.authenticated)
          return false;
        return ( this.provider.favorited_by.indexOf(parseInt(localStorage.getItem('user_id'))) > -1);
      }
    },
  }

</script>
<!-- Add " scoped" attribute to limit CSS to this component only -->
<style scoped>

  #provider_details h1 {
    text-align: left;
    font-size: 1.4rem;
    display: inline;
    color: black;
    line-height: 2rem;

  }

  #map, #pano {
    width: 100%;
    height: 200px;

  }

  #claimed_sign {
    color: #BFD02E;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .page-column {
    padding: 0.8rem;
    margin-bottom: 0.8rem;
  }

  #provider_texts {
    text-align: left;
    color: #848484;
    font-size: 0.8rem;
  }

  #hours_table {
    margin-top: 0.4rem;
  }

  #hours_table th, #hours_table td {
    padding-right: 0.3rem;

  }

  #hours_table th, td {
    font-size: 0.8rem;
    vertical-align: top;
    text-align: left;

  }

  .vue-rate-it-rating-item div {
    vertical-align: bottom;
  }

  .cell-title {
  }

  #mini_links {
    margin-top: 0.5rem;
  }

  #mini_links a {
    color: #848484;
    font-weight: bold;
    font-size: 0.8rem;
    float: right;
    margin-left: 0.8rem;
  }

  #mini_links a:hover {
    color: #008081;
  }

  a:not([href]):not([tabindex]) {
    color: white !important;
  }

  #big_share_buttons a, #big_share_buttons button {
    margin-bottom: 0.4rem;
  }

  #directions_box {
    margin: 1rem 0 2rem;
    border: #f3f3f3 1px solid;
    border-radius: 30px;
    text-align: left;
    padding: 1.2rem 0.6rem;
    color: #848484;

    box-shadow: 2px 2px 4px #ced4da;
  }

  #directions_box div {
    border-right: #ced4da 1px solid;
    float: left;
    padding: 0 1rem;
    font-size: 0.9rem;
  }

  #claim_options {
    font-size: 0.8rem;
  }

  #meetings_table {
    border-collapse: collapse;
    border-radius: 30px;
  }

  #meetings_table, #meetings_table th, #meetings_table td {
    border: 1px solid #ced4da;
    text-align: left;
    font-size: 0.8rem;
  }

  #meetings_table th, #meetings_table td {
    padding: 0.5rem;
  }

  #meetings_table th {
    background-color: #E8E8E8;
    font-weight: normal;
  }

  h4 {
    font-size: 1.2rem;
  }

  .description {
    font-size: 0.8rem;
    color: #8c8c8c;
  }

  #averages_table {
    margin-bottom: 2rem;
  }

  #averages_table {
    text-align: left;
    font-size: 0.8rem;
  }

  #last_updated {
    margin-bottom: 0;
    position: relative;
    top: -20px;
  }

  #reviews_table {
    width: 75%;
  }

  .share-button {
    margin: 3px 1.5px;
    padding: 6px 10px;
    line-height: 1.5;
    height: 38px;
    border-radius: 3px;
    width: 42px;
  }

  .vue-rate-it-rating-container {
    position: relative;
    top: 2px;
  }

  #claim_options button:nth-child(2) {
    margin-left: 0.5rem;
  }

  @media only screen and (max-width: 991px) {
    #mini_links {
      margin-top: 0rem;
    }

    #mini_links a {
      float: left;
    }

    #reviews_table {
      width: 100%;
    }

  }

  @media only screen and (max-width: 575px) {
    #provider_details h1 {
      line-height: 1.6rem;
    }

    .review-mini-panel button {
      margin-bottom: 4px;
    }

    #claim_options button:nth-child(2) {
      margin-left: 0.2rem;
    }

  }

  @media only screen and (max-width: 324px) {

    #claim_options button:nth-child(2) {
      margin-top: 0.2rem;
    }

  }

</style>
