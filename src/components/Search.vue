<template>
  <div class="search container p-0">

    <div class="page-title">
      <router-link class="primary-link"
                   :to="{ path: '/'}">Home
      </router-link>
      » <span v-html="getCategoryLinks()"></span>
    </div>
    <h1 v-if="mainCategory != null">{{CATEGORIES[mainCategory].name}}</h1>
    <h1 v-if="$parent.$refs.SearchBar.city != null">{{$parent.$refs.SearchBar.city.name}}</h1>

    <p class="description-paragraph" v-if="mainCategory != null">{{CATEGORIES[mainCategory].description}}</p>
    <form>
      <!-- <div class="text-center">
         <small><a v-bind:href="lastLink">{{lastLink}}</a></small>
       </div> -->
      <div class="row">
        <div class="col-md-4 col-sm-12  col-lg-3 " v-if="mainCategory === null || mainCategory === undefined">

          <div class="page-column" id="filters" v-sticky
               :z-index="10000"
               :sticky-top="100">
            <div class="column-cell">
              <h2 class="mb-0 d-inline">Filter By</h2>
              <a data-toggle="collapse" href="javascript:;" data-target="#filters_body" id="show_filters_link"
                 class="float-right d-inline d-md-none"
                 v-on:click="displayFiltersMobile = !displayFiltersMobile">{{((displayFiltersMobile ? 'Hide' : 'Display'))}}
                <icon
                  v-bind:name="(displayFiltersMobile)?'angle-up':'angle-down'"
                  class="arrow-icon"></icon>
              </a>

            </div>
            <div id="filters_body" class="collapse">
              <div class="column-cell">
                <div class="text-center d-none d-sm-block mb-sm-3">
                  <button type="reset" class="btn-custom btn btn-md " id="remove_filters_btn"
                          v-on:click="removeAllFilters"
                  >&nbsp;Remove All Filters&nbsp;
                  </button>

                </div>

                <a href="javascript:;" data-toggle="collapse" data-target="#reviews" class="cell-title"
                   v-on:click="toggleReviewsExpanded">REVIEWS POSTED BY
                  <icon
                    v-bind:name="(reviewsExpanded)?'angle-up':'angle-down'"
                    class="arrow-icon"></icon>
                </a>

                <div id="reviews" class="collapse column-hidden-menu">
                  <div v-bind:class="['form-check',(chosenReviewsPostedBy.indexOf('') > -1)] ">
                    <label class="form-check-label">
                      <input class="form-check-input" v-model="chosenReviewsPostedBy" type="checkbox" id="self"
                             value="Myself"
                             name="chosenReviewsPostedBy"
                      >Self
                    </label>
                  </div>
                  <div class="form-check ">
                    <label class="form-check-label">
                      <input class="form-check-input" v-model="chosenReviewsPostedBy" type="checkbox" id="friend"
                             value="Friend"
                             name="chosenReviewsPostedBy"
                      >Friend
                    </label>
                  </div>
                  <div class="form-check ">
                    <label class="form-check-label">
                      <input class="form-check-input" v-model="chosenReviewsPostedBy" type="checkbox" id="family_member"
                             value="Family Member" name="chosenReviewsPostedBy"
                      >Family Member
                    </label>
                  </div>
                  <div class="form-check ">
                    <label class="form-check-label">
                      <input class="form-check-input" v-model="chosenReviewsPostedBy" type="checkbox" id="case_manager"
                             value="Case Manager/Case Worker" name="chosenReviewsPostedBy"
                      >Case Manager/Case Worker
                    </label>
                  </div>
                </div>
              </div>
              <div class="column-cell">
                <a href="javascript:;" data-toggle="collapse" data-target="#overall_rating" class="cell-title"
                   v-on:click="toggleOverallRating">OVERALL RATING
                  <icon
                    v-bind:name="(overallRatingExpanded)?'angle-up':'angle-down'"
                    class="arrow-icon"></icon>
                </a>
                <div id="overall_rating" class="collapse column-hidden-menu">
                  <div v-bind:class="['form-check',(minimumOverallRating == rating)?'selected':''] "
                       v-for="rating in RATINGS">
                    <label class="form-check-label">
                      <input class="form-check-input" v-model="minimumOverallRating" type="radio"
                             v-bind:id="'overall_'+rating+'_stars'"
                             v-bind:value="rating"
                             name=""
                      >{{rating + ((rating < 5) ? '+' : '')}} stars
                    </label>
                  </div>


                </div>
              </div>
              <div class="column-cell border-0 pb-1">
                <h3>Rating by Category</h3>

              </div>
              <div class="column-cell" v-for="(ratingCategory,index) in ratingCategories ">
                <a href="javascript:;" data-toggle="collapse" v-bind:data-target="'#'+ratingCategory.id"
                   class="cell-title" v-on:click="toggleRatingCategoryExpand(index)">{{ratingCategory.name.toUpperCase()}}
                  <icon
                    v-bind:name="(ratingsExpanded[index])?'angle-up':'angle-down'"
                    class="arrow-icon"></icon>
                </a>
                <div v-bind:id="ratingCategory.id" class="collapse column-hidden-menu">
                  <div v-bind:class="['form-check',(ratingCategory.value == rating)?'selected':''] "
                       v-for="rating in RATINGS">
                    <label class="form-check-label">
                      <input class="form-check-input" v-model="ratingCategory.value" type="radio"

                             v-bind:id="ratingCategory.id+'_stars'"
                             v-bind:value="rating"
                             name=""
                      >{{rating + ((rating < 5) ? '+' : '')}} stars
                    </label>
                  </div>


                </div>
              </div>
            </div>
          </div>

        </div>

        <div
          v-bind:class="[ 'col-sm-12',  '',(mainCategory !== null && mainCategory !== undefined)?'offset-lg-2 offset-md-1 col-md-10 col-lg-8':'col-md-8 pl-md-0 col-lg-9']">
          <div class="page-column">
            <div class="column-cell clearfix" id="main_column"
                 v-if="mainCategory === null || mainCategory === undefined">
              <table class="float-right" id="order_table">
                <tr>
                  <th>
                    Sort By
                  </th>
                  <td class="">
                    <a href="javascript:;" v-bind:class="[(order == ORDER_NUMBER_REVIEWS)?'link-selected':'']"
                       v-on:click="setOrder(ORDER_NUMBER_REVIEWS)">
                      Number of Reviews<br/><span v-if="(order == ORDER_NUMBER_REVIEWS && orderAscending)">(Least to Most)</span><span
                      v-else>(Most to Least)</span>
                    </a>
                  </td>
                  <td v-if="mainCategory == null">
                    <a href="javascript:;" v-on:click="setOrder(ORDER_DISTANCE)"
                       v-bind:class="[(order == ORDER_DISTANCE)?'link-selected':'']">
                      Distance<br/>(Closest to Furthest)
                    </a>
                  </td>
                  <td>
                    <a href="javascript:;" v-on:click="setOrder(ORDER_OVERALL_RATING)"
                       v-bind:class="[(order == ORDER_OVERALL_RATING)?'link-selected':'']">
                      Overall Rating<br/><span v-if="(order == ORDER_OVERALL_RATING && orderAscending)">(Lowest to Highest)</span><span
                      v-else>(Highest to Lowest)</span>
                    </a>
                  </td>
                </tr>
              </table>


            </div>
            <div class="column-cell">
              <div class="row d-block d-md-none" v-if="mainCategory == null">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a v-bind:class="['nav-link', (activeDisplayTab == 1)?'active':'']" href="javascript:;"
                       v-on:click="activeDisplayTab = 1">List</a>
                  </li>
                  <li class="nav-item">
                    <a v-bind:class="['nav-link', (activeDisplayTab == 2)?'active':'']" href="javascript:;"
                       v-on:click="activeDisplayTab = 2">Map</a>
                  </li>

                </ul>
              </div>
              <div class="">
                <div class="row">
                  <div
                    v-bind:class="['col-12','mt-3 mt-lg-0','order-md-last order-lg-first','col-md-12', mapEnlarged?'col-lg-4': 'col-lg',(mainCategory === null || mainCategory === undefined)? ' pr-lg-0 ':'  ',(activeDisplayTab != 1)?'d-none d-md-block':'']"
                    id="results">

                    <div class="text-center" v-if="loading">
                      <br/>
                      <icon
                        name="spinner"
                        class="arrow-icon fa-spin loading-icon"></icon>
                    </div>
                    <div class="text-left" v-if="!loading && providersInCurrentPage.length == 0">
                      <br/>
                      No results were found. You can try zooming out on the map for a wider search.

                    </div>
                    <transition-group name="list-complete" tag="div">
                      <div
                        v-for="(result,index) in providersInCurrentPage"
                        v-bind:key="result.id"
                        v-bind:id="result.category.id+result.id"
                        v-bind:class="['result-cell', 'mb-2', 'list-complete-item',(result.active?'active':'')]"
                        @mouseover="startBounce(result.marker)"
                        @mouseleave="endBounce(result.marker)">
                        <div class="col-3" v-if="result.image != null">
                          <img v-bind:src="result.image" class="img-fluid">
                        </div>
                        <div v-bind:class="(result.image == null)?'col-12 p-0':'col-9 p-0'">
                          <image-rating :src="'/static/star2.png'" :read-only="true" :rating="result.score"
                                        :increment="1"
                                        :inline="true"
                                        :item-size="16" :show-rating="false"></image-rating>
                          ({{result.reviews }} reviews)<br/>
                          <router-link class="title"
                                       :to="{ path: '/health-provider', query: { id: result.id,category:result.category.code }}">
                            {{result.name}}
                          </router-link>
                          <br/>
                          <div class="details" v-html="">
                            <icon
                              name="tag"
                              class=""></icon>
                            {{result.category.name}}<br/>
                            <icon
                              name="map-marker"
                              class=""></icon>
                            <span v-html="result.address1+' '+result.address2"></span><br/>
                            <icon v-if="result.phone "
                                  name="phone"
                                  class=""></icon>
                            <span v-if="result.phone">{{result.phone}}</span>
                          </div>
                          <div class="clearfix">
                            <div class="mini-info" v-if="result.distance">
                              <label class="form-check-label">
                                {{result.distance}} miles
                              </label>
                            </div>
                            <div class="mini-info">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input class="form-check-input" type="checkbox" v-model="result.selected"
                                         value="1"/>
                                  <a href="javascript:;" v-on:click="goComparison">Compare</a>
                                </label>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                    </transition-group>
                    <ul class="pagination">
                      <li v-for="(index,pageNumber) in totalPages" class="page-item"
                          v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber == totalPages - 1 || pageNumber == 0">
                        <a href="javascript:;" v-on:click="setPage(pageNumber)" v-scroll-to="'#main_column'"
                           :class="{'page-link':true,current: currentPage === pageNumber, last: (pageNumber == totalPages - 1 && Math.abs(pageNumber - currentPage) > 3), first:(pageNumber == 0 && Math.abs(pageNumber - currentPage) > 3)}">
                          {{ pageNumber + 1 }}</a>
                      </li>
                    </ul>
                  </div>
                  <div v-if="mainCategory == null"
                       v-bind:class="['col-12','col-md-12', 'order-md-first order-lg-last',(mapEnlarged)?'col-lg-8': 'col-lg',(activeDisplayTab != 2)?'d-none d-md-block':'']">
                    <div id="map_container" v-sticky
                         :z-index="10000"
                         :sticky-top="100">
                      <a v-if="!mapEnlarged" class="d-none d-lg-inline" href="javascript:;"
                         v-on:click="mapEnlarged = true">Enlarge Map</a>
                      <a v-if="mapEnlarged" class="d-none d-sm-inline" href="javascript:;"
                         v-on:click="mapEnlarged = false">Reduce Map</a>
                      <div class="float-right">
                        <label class="form-check-label m-0">
                          <input class="form-check-input" type="checkbox" v-model="updateMapOnMove" value="1"/>
                          Update when I move <span class="">the map</span>
                        </label>
                      </div>
                      <div class="mt-md-1 mt-2">
                        <div id="map"></div>
                        <div id="markers_reference" class="clearfix">
                          <div v-for="category in getDisplayedCategories" class="float-left"><img
                            v-bind:src="'/static/marker_'+$parent.$refs.SearchBar.categories[category].id+'.png'"/>
                            {{$parent.$refs.SearchBar.categories[category].name}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<!-- use the latest release -->


<script>

  import SearchBar from './SearchBar.vue';
  import {RATING_CATEGORIES} from '../constants.js';
  import {RATINGS} from '../constants.js';
  import {BASE_API_URL} from '../constants.js';
  import axios from 'axios';
  import {ImageRating} from 'vue-rate-it';
  import VueSticky from 'vue-sticky'; // Es6 module
  import VuePaginator from 'vuejs-paginator';
  import {CATEGORIES} from '../constants.js';

  const ORDER_NUMBER_REVIEWS = "number_of_reviews";
  const ORDER_DISTANCE = "distance";
  const ORDER_OVERALL_RATING = "overall_rating";
  const RESULTS_BLOCK_SIZE = 100;//results per request
  // const VueSticky = VueSticky.default; // Global variable

  var googleMap = null;
  var mapCenter = null;
  var mapZoom = 11;
  var mapRadius = 21587;//default for zoom 11
  var mapBounds = null;
  var app = null;
  var filtersOffset = null;
  var mapMarkers = [];
  var mapCurrentInfoWindow = null;
  var mapBound = null;
  var mapLoadAfterRequest = false;


  /**
   * Initialize google maps
   */
  function initMap() {
    //var myLatLng = {lat: -25.363, lng: 131.044};
    if (mapCenter == null)
      mapCenter = new google.maps.LatLng(41.850033, -87.6500523);//chicago
    googleMap = new google.maps.Map(document.getElementById('map'), {
      zoom: mapZoom,
      center: mapCenter,
      mapTypeControl: false,
      streetViewControl: false,
    });
    google.maps.event.addListener(googleMap, 'bounds_changed', function () {

      recalculateViewportDistance();
    });

    google.maps.event.addListener(googleMap, 'zoom_changed', function () {
      mapZoom = googleMap.getZoom();
      recalculateViewportDistance();
      if (app.updateMapOnMove) {
        app.getResults();
      }
    });

    google.maps.event.addListener(googleMap, 'dragend', function () {
      /*mapZoom = googleMap.getZoom();
      recalculateViewportDistance();*/
      if (app.updateMapOnMove) {
        mapCenter = googleMap.getCenter();
        app.$parent.$refs.SearchBar.latitude = mapCenter.lat();
        app.$parent.$refs.SearchBar.longitude = mapCenter.lng();
        app.getResults();
      }
    });


  };

  /**
   * Updates the radius distance inside the viewport
   */
  function recalculateViewportDistance() {

    if (googleMap == null)
      return;
    var bounds = googleMap.getBounds();
    var center = googleMap.getCenter();

    if (bounds && center) {
      var ne = bounds.getNorthEast();
      // Calculate radius (in meters).
      mapRadius = google.maps.geometry.spherical.computeDistanceBetween(center, ne);
    }

  }

  export default {
    name: 'Search',
    components: {

      'search-bar': SearchBar,
      'image-rating': ImageRating,
      'VPaginator': VuePaginator,
    },
    props: {
      mainCategory: {
        type: Number,
        required: false
      },
    },
    directives: {
      'sticky': VueSticky,
    },
    filters: {
      paginate: function (list) {
        this.resultCount = list.length;
        if (this.currentPage >= this.totalPages) {
          this.currentPage = this.totalPages - 1
        }
        var index = this.currentPage * this.itemsPerPage;
        return list.slice(index, index + this.itemsPerPage)
      }
    },
    data() {
      return {
        reviewsExpanded: false,
        overallRatingExpanded: false,
        ratingsExpanded: [],
        ratingCategories: [],
        chosenReviewsPostedBy: [],
        minimumOverallRating: null,
        RATINGS: RATINGS,
        order: this.mainCategory == null ? ORDER_DISTANCE : ORDER_OVERALL_RATING,
        orderAscending: this.mainCategory == null ? true : false,
        ORDER_NUMBER_REVIEWS: "number_of_reviews",
        ORDER_DISTANCE: "distance",
        ORDER_OVERALL_RATING: "overall_rating",
        BASE_GET_URL: BASE_API_URL + "api/",
        loading: false,
        newRequestIncoming: false,//flag used to avoid extending the search while a new one has been done
        queuedRequest: null,
        notifySearchBarChanges: true,
        activeDisplayTab: 1,
        mapEnlarged: false,
        updateMapOnMove: true,
        displayFiltersMobile: false,
        mounted: false,
        providers: [],
        currentPageProviders: [],
        currentPage: 0,
        itemsPerPage: 40,
        categoryPage: false,
        CATEGORIES: CATEGORIES,
        lastLink: "",


      }
    },
    created() {
      app = this;
      for (let i = 0; i < RATING_CATEGORIES.length; i++) {
        this.ratingCategories.push({
          id: RATING_CATEGORIES[i].id,
          name: RATING_CATEGORIES[i].name,

          value: null,
        });
        this.ratingsExpanded.push(false);
        //add watch
      }
//is this a category page?
      if (this.$props.mainCategory != null) {
        console.log(this.$parent.$refs);
        this.$parent.$refs.SearchBar.setMainCategory(this.$props.mainCategory);
      }


    },
    beforeMount() {

    },
    mounted() {
      console.log(this.$parent.$refs.SearchBar.latitude, this.$parent.$refs.SearchBar.longitude);
      if (this.$parent.$refs.SearchBar.latitude) {
        mapCenter = new google.maps.LatLng(parseFloat(this.$parent.$refs.SearchBar.latitude), parseFloat(this.$parent.$refs.SearchBar.longitude));
        /*google.maps.event.addDomListener(window, 'load', initMap);*/
      }
      else
        mapLoadAfterRequest = true;
      /*  if (place != null)
          this.updateMap(null);*/
      //  this.getResults();

      this.$root.$on('centerMap', coordinates => {
        console.log('map centered', coordinates);
        if (googleMap) {
          mapCenter = new google.maps.LatLng(coordinates.lat, coordinates.lng);
          googleMap.setCenter(mapCenter);
        }
        //if(this.)
        this.getResults();
      });

//add watcher for ratings
      this.$watch('ratingCategories', function (newValue) {
        this.getResults();
      }, {deep: true});
      //if ( typeof google !== 'object' || typeof google.maps !== 'object')
      console.log(this.mainCategory);
      if (this.mainCategory === null || this.mainCategory === undefined)
        initMap();
      /* if (!this.mainCategory && !this.$parent.$refs.SearchBar.city)*/
      this.getResults();
      this.mounted = true;

    },
    methods: {
      /**
       * Sets order
       * @param string order
       */
      setOrder: function (order) {
        if (order == this.order && order != ORDER_DISTANCE)//exception: distance only goes ascending
          this.switchOrder();
        else
          this.order = order;
      },
      /**
       * Changes ascending to descending or vice-versa
       */
      switchOrder: function () {
        this.orderAscending = !this.orderAscending;
      },
      /**
       * Request new results through Axios
       * @param boolean|null useQueuedUrl whether to use the stored url instead of composing it
       * @param string|null extendResultsUrl url to extend current results
       */
      getResults: function (/*event,*/ useQueuedUrl, extendResultsUrl) {
        //default values parameters
        /*   extraParameters = typeof extraParameters !== 'undefined' ? extraParameters : "";*/
        if (!useQueuedUrl && !extendResultsUrl)
          this.newRequestIncoming = true;
        useQueuedUrl = typeof useQueuedUrl !== 'undefined' ? useQueuedUrl : false;
        extendResultsUrl = typeof extendResultsUrl !== 'undefined' ? extendResultsUrl : null;
        let requestUrl = null;
        if (useQueuedUrl || extendResultsUrl) {
          console.log(useQueuedUrl, extendResultsUrl);
          if (useQueuedUrl)
            requestUrl = this.queuedRequest;
          else
            requestUrl = extendResultsUrl;
        }
        else {//compose url
          requestUrl = this.BASE_GET_URL + "?" /*+ extraParameters*/;

          //add any necessary parameter
          //console.log(this.mainCategory);
          if (this.mainCategory !== null && this.mainCategory !== undefined) {//category request

            requestUrl = BASE_API_URL + this.CATEGORIES[this.mainCategory].code + "/";
          }
          else {//normal request
            requestUrl += "limit=" + RESULTS_BLOCK_SIZE;
            requestUrl += this.$parent.$refs.SearchBar.getUrlQueryString();
            if (this.$parent.$refs.SearchBar.latitude == null)
              mapLoadAfterRequest = true;
            //console.log('main category', this.mainCategory);
            if (this.mainCategory === null || this.mainCategory === undefined)
              requestUrl += "&radius=" + parseInt(this.getMiles(mapRadius))/*.toFixed(2)*/;
            if (this.chosenReviewsPostedBy.length > 0) {
              requestUrl += "&posted_by=";
              for (let i = 0; i < this.chosenReviewsPostedBy.length; i++) {
                if (i > 0)
                  requestUrl += ",";
                requestUrl += this.chosenReviewsPostedBy[i];
              }
            }
            if (this.minimumOverallRating !== null) {
              requestUrl += "&overall_rating=" + this.minimumOverallRating;
            }
            //check rating required by category
            for (let i = 0; i < this.ratingCategories.length; i++) {
              if (this.ratingCategories[i].value !== null) {
                requestUrl += "&" + this.ratingCategories[i].id + "=" + this.ratingCategories[i].value;
              }
            }
            //send order
            requestUrl += "&order=" + this.order;
            if (this.orderAscending)
              requestUrl += "&asc=true";
            else
              requestUrl += "&asc=false";
          }//end non main category if-else

        }

        // var stack = new Error().stack;
        //  var err = new Error();
        if (this.loading) {
          if (extendResultsUrl)//something more important is loading, abort
            return;
          this.queuedRequest = requestUrl;

        }
        else {
          if (extendResultsUrl == null) {
            this.loading = true;//note, the extended loading runs in the background, is not displayed to the user
            this.providers = [];
            //remove all markers from the map:
            for (let i = 0; i < mapMarkers.length; i++) {
              mapMarkers[i].setMap(null);
            }
            mapMarkers = [];

          }

          console.log(requestUrl);
          this.lastLink = requestUrl;

          /* axios.get(requestUrl,{  maxContentLength: 100})*/
          axios({
            method: 'get',
            url: requestUrl,
            /*   maxContentLength: 5000*/
          })
            .then((response) => {
              console.log('response', response.data);

              if (response.data.previous == null)//this means a new main request has arrived
              {
                this.newRequestIncoming = false;
                this.currentPage = 0;
                console.log(this.currentPage,response.data.previous);
              }
              this.loadResultsFromArray(response.data);
              this.loading = false;
              if (this.queuedRequest != null) {
                this.getResults(true);
                this.queuedRequest = null;
                //extend results?
              }
              else {
                console.log(response.data.next, this.queuedRequest, this.newRequestIncoming);
                //extend request if appliable
                if (response.data.next != null && this.queuedRequest == null && !this.newRequestIncoming) {
                  /* this.queuedRequest = response.data.next;*/
                  this.getResults(false, response.data.next);
                }
              }

            }, (error) => {
              console.log(error);
              this.loading = false;
            })
        }
      },
      /**
       * Switch status
       */
      toggleOverallRating: function () {
        this.overallRatingExpanded = !this.overallRatingExpanded;
      },
      /**
       * Switch status
       */
      toggleReviewsExpanded: function () {
        this.reviewsExpanded = !this.reviewsExpanded;
      },
      /**
       * Switch status
       * @param integer index index of the ratings' categories array
       */
      toggleRatingCategoryExpand: function (index) {
        this.ratingCategories[index].expanded = !this.ratingCategories[index].expanded;
      },

      /**
       * Redirect to compare page
       */
      goComparison: function () {
        let querystring = "?";
        let selectedQty = 0;
        for (let i = 0; i < this.providers.length; i++) {
          if (this.providers[i].selected) {
            querystring += (selectedQty == 0 ? "" : "&") + "providers=" + this.providers[i].id + "&providers_categories=" + this.providers[i].category.id;
            selectedQty++;
          }
        }
        if (selectedQty == 0)
          alert("You haven't selected any provider. Please click the checkboxes on the left of 'compare'.");
        else
          window.location.href = encodeURI("/compare" + querystring);
      },
      /**
       * Updates map's markers and position
       */
      updateMap: function (placeObject) {

        if (placeObject != null) {
          if (googleMap != null)
            googleMap.setCenter(new google.maps.LatLng(placeObject.latitude, placeObject.longitude));
          else
            mapCenter = new google.maps.LatLng(placeObject.latitude, placeObject.longitude);
        }


      },
      /**
       * Reset filters
       */
      removeAllFilters: function () {
        this.chosenReviewsPostedBy = [];
        this.minimumOverallRating = null;
        for (let i = 0; i < this.ratingCategories.length; i++) {
          this.ratingCategories[i].value = null;
        }

      },
      /**
       * Go through results of different categories and insert them on a unique array ordered
       */
      insertResultsOrdered() {
        let traversedAllResults = false;
        while (!traversedAllResults) {
          for (let i = 0; i < this.categories.length; i++) {
//if()
          }
        }
      },
      /**
       *  Insert providers to display
       *  @param object data
       */
      loadResultsFromArray: function (data) {
       // this.currentPage = 0;
        let extendResults = data.previous != null;
        let results = data.results;
        //update map if necessary
        if ((mapLoadAfterRequest && this.mainCategory == null && !extendResults)) {
          initMap();
          mapBound = new google.maps.LatLngBounds();

        }
        if (!extendResults)
          this.providers = [];
        for (let i = 0; i < results.length; i++) {
          //ok, I need to retrieve the coordinates out of that fucking string:
          let coordinateString = results[i].location.substring(results[i].location.lastIndexOf("(") + 1, results[i].location.lastIndexOf(")"));
          let coordinateParts = coordinateString.split(" ");

          let provider = {
            id: results[i].id,
            score: this.getAverageScore(results[i].reviews),
            reviews: results[i].reviews.length,
            name: results[i].name,
            address1: results[i].street_address + ", " + results[i].city + ", ",
            address2: results[i].state + " " + results[i].zip_code,
            phone: results[i].phone_number,
            distance: results[i].distance,
            image: null,
            selected: false,
            latitude: parseFloat(coordinateParts[1]),
            longitude: parseFloat(coordinateParts[0]),
            /*  category: results[i].category,
              categoryCode: this.getCategoryCode(results[i].category),*/
            category: this.getCategoryById(results[i].category),
            marker: null,
            active: false,
          };

          this.providers.push(provider);
          if (this.mainCategory == null)
            this.addToMap(provider);
          if (i == RESULTS_BLOCK_SIZE) {
            this.$forceUpdate();
          }
        }
        //update map if necessary
        if (mapLoadAfterRequest && this.mainCategory == null) {

          mapCenter = mapBound.getCenter();
          googleMap.setCenter(mapCenter);
          mapLoadAfterRequest = false;
        }
        document.dispatchEvent(new Event('render-trigger'));

      },
      /**
       * Page changed event
       * @param integer pageNumber
       */
      setPage: function (pageNumber) {

        this.currentPage = pageNumber;
        this.$forceUpdate();
      },
      /**
       * Adds marker to map
       * @param object provider
       */
      addToMap: function (provider) {
        if (mapLoadAfterRequest && !this.mainCategory) {

          mapBound.extend(new google.maps.LatLng(provider.latitude, provider.longitude));
        }
        var contentString = '<div class="info-window">' +
          '<a id="firstHeading" class="firstHeading" href="/health-provider?id=' + provider.id + '&category=' + provider.category.code + '">' + provider.name + '</a>' +
          '<div class="body-content">' +
          '<div class="address">' + provider.category.name + '</div>' +
          '<div class="address">' + provider.address1 + "<br/>" + provider.address2 + '</div>' +
          ((provider.phone) ? '<div class="phone">' + provider.phone + '</div>' : '') +
          '</div>' +
          '</div>';


        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          provider: provider,
        });

        google.maps.event.addListener(infowindow, 'closeclick', function () {
          mapCurrentInfoWindow.provider.active = false;
        });
      //  console.log("add to map on:",provider.latitude, provider.longitude, provider, googleMap);
        var marker = new google.maps.Marker({
          position: {lat: provider.latitude, lng: provider.longitude},
          map: googleMap,
          /* animation: google.maps.Animation.DROP,*/
          scaledSize: new google.maps.Size(26, 22), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0), // anchor
          title: provider.name,
          icon: "/static/marker_" + provider.category.id + ".png",
        });


        mapMarkers.push(marker);
        provider.marker = marker;
        marker.provider = provider;
//console.log(marker);

        marker.addListener('click', function () {
          if (mapCurrentInfoWindow) {

            mapCurrentInfoWindow.close();
            mapCurrentInfoWindow.provider.active = false;
          }
          infowindow.open(googleMap, marker);
          mapCurrentInfoWindow = infowindow;
          mapCurrentInfoWindow.provider.active = true;
          app.$scrollTo("#" + provider.category.id + provider.id, 500);
        });
        marker.addListener('mouseover', function () {
          this.provider.active = true;
        });

// assuming you also want to hide the infowindow when user mouses-out
        marker.addListener('mouseout', function () {
          this.provider.active = false;
        });
      },
      /**
       * Get a string with links to categories
       * @return string
       */
      getCategoryLinks: function () {
        let links = "";
        console.log(this.$parent.$refs.SearchBar.chosenCategories);
        if (this.$parent.$refs.SearchBar.chosenCategories == null)
          return "";
        if (this.$parent.$refs.SearchBar.chosenCategories.length == 0)
          for (let i = 0; i < this.$parent.$refs.SearchBar.categories.length; i++) {//get all
            links += "<a href='/" + this.$parent.$refs.SearchBar.categories[i].code + "'>" + this.$parent.$refs.SearchBar.categories[i].name + "</a> ";
          }
        else
          for (let i = 0; i < this.$parent.$refs.SearchBar.chosenCategories.length; i++) {
            let index = this.$parent.$refs.SearchBar.chosenCategories[i];
            links += "<a href='/" + this.$parent.$refs.SearchBar.categories[index].code + "'>" + this.$parent.$refs.SearchBar.categories[index].name + "</a> ";

            /*  links += "<span class='colored-text'>" + this.$parent.$refs.SearchBar.categories[index].name + "</span> ";*/
          }
        return links;
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
       * Converts meters to miles
       * @param i integer distance in meters
       */
      getMiles: function (i) {
        return i * 0.000621371192;
      },
      /**
       * Animates or turns off animation on marker
       * @param marker object
       */
      startBounce: function (marker) {
        if (marker == null)
          return;

        marker.setAnimation(google.maps.Animation.BOUNCE);

      },
      endBounce: function (marker) {
        if (marker == null)
          return;

        marker.setAnimation(null);

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


    },
    watch: {
      'chosenReviewsPostedBy': function (val, oldVal) {
        console.log('lala', val, oldVal);
        if (this.mounted && this.$parent.$refs.SearchBar.mounted)
          this.getResults();
      },
      'minimumOverallRating': function (val, oldVal) {
        if (this.mounted && this.$parent.$refs.SearchBar.mounted)
          this.getResults();
      },

      'order': function (val, oldVal) {
        console.log('lala', val, oldVal);
        if (this.mounted && this.$parent.$refs.SearchBar.mounted)
          this.getResults();
      },
      'orderAscending': function (val, oldVal) {
        console.log('lala', val, oldVal);
        if (this.mounted && this.$parent.$refs.SearchBar.mounted)
          this.getResults();
      },

    },
    computed: {
      totalPages: function () {
        return parseInt(Math.ceil(this.providers.length / this.itemsPerPage));
      },
      /**
       * Get Array with providers to be displayed in the current page
       */
      providersInCurrentPage: function () {
        let remainingItems = this.providers.length - (this.itemsPerPage * this.currentPage);
        return this.providers.slice(this.itemsPerPage * this.currentPage, (this.itemsPerPage * this.currentPage) + Math.min(remainingItems, this.itemsPerPage));
      },

      getDisplayedCategories: function () {
        if (this.$parent.$refs.SearchBar.chosenCategories.length === 0) {
          let categoriesIds = [];
          for (let i = 0; i < CATEGORIES.length; i++)
            categoriesIds.push(i);
          return categoriesIds;
        }
        else
          return this.$parent.$refs.SearchBar.chosenCategories;
      }

    },

  }
</script>

<!-- Add " scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search h1 {
    text-align: left;
    font-size: 1.4rem;
    color: black;
    line-height: 2rem;
  }

  #search_box {
    margin-top: 10px;
    background-color: white;
    border-radius: 25px;
    padding: 35px 25px;
  }

  /*.modal-body {
    padding-top: 0;
    font-size: 0.8rem;
    font-size: 0.8rem;
    text-align: left;
  }*/

  .form-check-label {
    font-weight: bold;
    margin-bottom: 0.1rem;
    margin-top: 0.1rem;
  }

  #main_column {
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
  }

  #order_table {
    font-size: 0.8rem;
    line-height: 1rem;
    border-collapse: collapse;

  }

  #order_table tr td, #order_table tr th {
    padding: 0.4rem 2rem;
    border: 0px solid black;
    /* border-bottom: 1px solid  #ced4da;*/
    text-align: center;

  }

  #order_table tr td a {
    color: black;
    text-align: center;
  }

  #order_table tr td a:hover {
    color: #008081;;
  }

  #order_table tr th {
    /* width: 100%;*/
  }

  #order_table tr td:nth-child(3) {
    border-width: 0 1px 0px 1px;
    border-color: #ced4da;
  }

  .link-selected {
    color: #008081 !important;
  }

  /* #filters {
     position: relative;
   }*/

  #map {
    width: 100%;
    height: 600px;

  }

  .vue-rate-it-rating-item {
    height: 16px !important;
    background-color: purple;
  }

  .result-cell:hover {
    border-color: #008081;
  }

  .result-cell.active {
    border-color: #008081;
  }

  .result-cell div {
    vertical-align: middle;
  }

  #show_filters_link {
    font-weight: bold;

  }

  .column-hidden-menu {
    margin-top: 0.4rem;
  }

  #markers_reference {
    margin-top: 0.4rem;
  }

  #markers_reference div {
    float: left;
    margin-right: 0.4rem;
  }

  #markers_reference div img {
    height: 15px;
  }

  @media only screen and (max-width: 575px) {
    h1 {
      font-size: 1.5rem;
    }

  }

  @media only screen and (max-width: 991px) {
    #order_table tr td, #order_table tr th {
      padding: 0.4rem 0.6rem;
    }

  }

  @media only screen and (min-width: 767px) {
    #filters_body.collapse {
      display: block;
    }

  }

  @media only screen and (min-width: 767px) and (max-width: 991px) {
    #map {
      height: 300px;
    }

  }


</style>
