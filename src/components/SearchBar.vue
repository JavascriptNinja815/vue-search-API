<template>
  <div v-bind:class="(express)?'express-search-bar':''">
    <form id="main_search" role="form" action="/search">

      <div class="row">
        <div v-bind:class="(express)?'col-md-5 col-sm-4 pr-sm-0':'col-sm-5 pr-sm-0'">
          <div v-bind:class="['form-group',(express)?'mb-2 mb-sm-3':'']">
            <input type="text" class="form-control " id="name" name="name" aria-describedby="Provider Name"
                   v-model="providerName"
                   placeholder="Provider Name">
          </div>
        </div>
        <div v-bind:class="(express)?'col-lg-6 col-md-5 col-sm-6':'col-sm-7'">

          <div v-bind:class="['form-group',(express)?'mb-2 mb-sm-3':'']">

            <VueGoogleAutocomplete ref="placeInput"
                                   id="place_input" name="place"
                                   classname="form-control"
                                   placeholder="Address, neighborhood, city or state"
                                   v-on:placechanged="getAddressData"
                                   v-on:changed="placeChanged"
                                   v-on:no-results-found="noResults"
                                   v-on:keypress="placeInputChange"
                                   enable-geolocation="true"
                                   types="geocode"
                                   :country="['us']"
                                   v-model="place"

                                   required
            >
            </VueGoogleAutocomplete>

          </div>
        </div>
        <input type="hidden" name="latitude" value="" v-model="latitude"/>
        <input type="hidden" name="longitude" value="" v-model="longitude"/>
        <div v-if="express" class="col-lg-1 col-md-2 col-sm-2 pl-sm-0 ">
          <button type="submit" class="btn btn-custom btn-md d-none d-sm-block" id="small_search_btn">Search</button>
        </div>

      </div>
      <div class="row mb-2" v-if="express">
        <div class="col-12 d-block d-md-none text-center ">
          <a data-toggle="collapse" href="javascript:;" data-target="#categories_select" id="categories_link"
             v-on:click="toggleCategoriesExpand()">Choose Categories
            <icon
              v-bind:name="(categoriesExpanded)?'angle-up':'angle-down'"
              class="arrow-icon"></icon>
          </a>
        </div>
      </div>

      <div v-bind:class="['row', 'mb-2',(express)?'collapse':'']" id="categories_select">

        <div

          v-bind:class="[,'col-md-3','col-12','col-sm-6','mb-2','col-lg', (categoryIndex != (categories.length-1)) ? ' pr-lg-0' : '', (categoryIndex == (categories.length/2-1)) ? 'pr-sm-3' : 'pr-sm-0',(categoryIndex%4 ==3) ? 'pr-md-3' : 'pr-md-0',(categoryIndex%2 ==1) ? 'pr-3 pr-sm-3' : '']"
          v-for="(category,categoryIndex) in categories">
          <div
            v-bind:class="['select-box', (chosenCategories.indexOf(categoryIndex) > -1)?'selected-box':''] "
            v-on:click="/*toggleCategory(index)*/">
            <input v-bind:id="category.id" type="checkbox" v-bind:value="categoryIndex" v-model="chosenCategories"
                   name="categories"
                   v-on:click="toggleCategory(categoryIndex)"/>
            <br class="d-none d-sm-block"/>
            <label v-bind:for="category.id">{{category.name}}</label>

            <template
              v-if="(chosenCategories.indexOf(categoryIndex) > -1 && categories[categoryIndex].filters.length>0)">
              <popper trigger="click" :options="{placement: 'bottom', modifiers: {
                                flip: {
                                        behavior: ['bottom']
                                },
                        }}">

                <div class=" popper">

                  <div v-bind:id="'accordion_'+category.id"
                       role="tablist"
                       class="filters-selector"
                       aria-multiselectable="true">

                    <div class="card" v-for="(filter,filterIndex) in category.filters ">
                      <div class="card-header" role="tab"
                           v-bind:id="'heading'+'_'+filter.id"
                           v-on:click="toggleCategoryExpand(categoryIndex,filterIndex)">
                        <h5 class="mb-0">
                          <a data-toggle="collapse"
                             v-bind:href="'#collapse_'+category.id+'_'+filter.id"
                             v-bind:class="(filterIndex==10000)?'':'collapsed'"
                             v-bind:data-parent="'#accordion_'+category.id"
                             v-bind:aria-expanded="(filterIndex==10000)?'true':'false'"
                             v-bind:aria-controls="'collapse_'+filter.id">
                            {{filter.name}}
                            <icon
                              v-bind:name="(chosenFilters[categoryIndex][filterIndex].expanded)?'angle-up':'angle-down'"
                              class="arrow-icon"></icon>

                          </a>

                        </h5>

                      </div>
                      <div v-bind:id="'collapse_'+category.id+'_'+filter.id"
                           v-bind:data-parent="'#accordion_'+category.id"
                           v-bind:class="['collapse', (filterIndex == 10000)?'show':'']"
                           role="tabpanel"
                           v-bind:aria-labelledby="'heading_'+filter.id"
                      >
                        <div class="card-body">
                          <div class="card-options">
                            <b><a href="javascript:;"
                                  v-on:click="selectAllFilter(categoryIndex, filterIndex)">All</a> / <a
                              href="javascript:;"
                              v-on:click="selectNoneFilter(categoryIndex, filterIndex)">None</a>
                              / <a href="javascript:;"
                                   v-on:click="selectReverseFilter(categoryIndex, filterIndex)">Reverse</a></b>
                          </div>
                          <div class="form-check" v-for="(option,optionIndex) in filter.options">
                            <label class="form-check-label">

                              <input class="form-check-input" type="checkbox"
                                     @change="onChangeFilter()"
                                     v-bind:value="getOptionId(option)"
                                     v-bind:id="filter.id"
                                     v-bind:name="filter.id"
                                     v-on:click="  $forceUpdate();"
                                     v-model="chosenFilters[categoryIndex][filterIndex].options">
                              {{option.name}}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <a slot="reference" class="filters-link">
                  Extra Filters
                  <icon name="angle-down" class="arrow-icon"></icon>

                </a>
              </popper>
            </template>

          </div>

        </div>

      </div>
      <div class=" justify-content-center">
        <button type="submit"
                v-bind:class="['btn', 'btn-custom', 'mt-md-4', 'mt-sm-2',(express)?'d-block  d-sm-none':'']"
                id="submit_btn">&nbsp;Search&nbsp;
        </button>
      </div>
    </form>
  </div>
</template>
<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import Popper from 'vue-popperjs';
  import 'vue-popperjs/dist/css/vue-popper.css';
  import {CATEGORIES} from '../constants.js';
  import {CITIES} from '../constants';

  var isVisible = false;
  var clickedAway = false;
  var app = null;


  export default {
    name: 'SearchBar',
    components: {VueGoogleAutocomplete, /*popover, */ 'popper': Popper},

    props: {
      express: {
        type: Boolean,
        required: true
      }
    },
    directives: {},
    data() {
      return {
        address: '',
        categories: CATEGORIES,
        chosenCategories: [],
        chosenFilters: [],
        //   alterChosenFilters: {},
        providerName: this.$route.query.name,
        place: this.$route.query.place,
        categoriesExpanded: false,
        latitude: this.$route.query.latitude,
        longitude: this.$route.query.longitude,
        mounted: false,
        city: null,
        mainCategory: null,

      }
    },
    created() {

      if (this.$route.params.city != null) {
        //find city
        let city = null;
        for (let i = 0; i < CITIES.length; i++)
          if (CITIES[i].code == this.$route.params.city) {
            this.place = CITIES[i].fullName;
            this.latitude = CITIES[i].latitude;
            this.longitude = CITIES[i].longitude;
            this.city = CITIES[i];
            break;
          }
      }

      //initialize chosen categories and filters

      for (let i = 0; i < this.categories.length; i++) {
        if (this.$route.query.categories != null && this.$route.query.categories.indexOf(i.toString()) > -1)
          this.chosenCategories.push(i);//add chosen category

        for (let j = 0; j < this.categories[i].filters.length; j++) {
          let filterObject = {id: this.categories[i].filters[j].id, options: [], expanded: false};

          if (j == 0) {
            this.chosenFilters[i] = [];
            // this.alterChosenFilters[i] = {};
          }
          if (this.$route.query[this.categories[i].filters[j].id] != null) {
            //array or value?
            console.log(this.$route.query[this.categories[i].filters[j].id], typeof this.$route.query[this.categories[i].filters[j].id]);
            if (typeof this.$route.query[this.categories[i].filters[j].id] == 'string')
              filterObject.options.push(this.$route.query[this.categories[i].filters[j].id]);
            else
              for (let k = 0; k < this.$route.query[this.categories[i].filters[j].id].length; k++) {//grab all options from params
                filterObject.options.push(this.$route.query[this.categories[i].filters[j].id][k]);
              }
          }
          this.chosenFilters[i][j] = filterObject;
          //  this.alterChosenFilters[i][j] = filterObject;
          /*  this.$watch('alterChosenFilters.'+i+'.'+j+'.options', function (newValue,oldValue ) {
              console.log('updated filters');
              this.$emit('update', this.getUrlQueryString);
            }, {deep: true});*/
        }
      }
      app = this;
      this.$forceUpdate();
    },
    mounted() {


      if (this.place != null)
      // $('#place').val(this.place);
      //this.placeInput.update(this.place);
      {
        console.log('this must be the place', this.place);
        this.$refs.placeInput.update(this.place);
      }

      // this.$emit('update', this.getUrlQueryString());

      if (navigator.geolocation && this.place == null) {
        navigator.geolocation.getCurrentPosition(function (position) {
          if (app.place != null)
            return;//autodetect doesn't matter as we have a place
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          app.latitude = pos.lat;
          app.longitude = pos.lng;
          // app.$forceUpdate();
          app.geocodeLatLng(pos.lat, pos.lng);
        });
      }
      ;


      this.mounted = true;
    },
    updated: function () {
      this.$nextTick(function () {
        //didn't find any other way to do this:
        $('[data-toggle="popover"]').each(function () {

          if ($(this).data('popoverconvertflag') == 0) {//flag used to determine if already "popperized"

            new Popper($(this), $(this).next('.popper-content'));

            $(this).data('popoverconvertflag', 1);
          }
        });

        // Code that will run only after the
        // entire view has been re-rendered
      })
    },
    methods: {
      /**
       * When the location found
       * @param {Object} addressData Data of the found location
       * @param {Object} placeResultData PlaceResult object
       * @param {String} id Input container ID
       */
      /*    getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData
          },*/
      /**
       * Adds or removes category if already present
       * @param integer index
       */
      toggleCategory: function (index) {
        /*  let chosenIndex = this.chosenCategories.indexOf(index)
          if (chosenIndex > -1)
            this.chosenCategories.splice(chosenIndex, 1)
          else {

            this.chosenCategories.push(index);
            this.$forceUpdate();

          }
  */
      },
      /**
       * Hides the modal for a category code
       * @param string code
       */
      hideModal: function (code) {
        $('#modal_' + code).modal('hide')
      },
      /**
       * Returns chosen categories as array of prototypes
       */
      /*  chosenCategoriesObjects: function () {
          let categoriesArray = []
          for (let i = 0; i < this.chosenCategories.length; i++)
            categoriesArray.push(this.categories[this.chosenCategories[i]]);
          return categoriesArray

        },*/
      /**
       * Selects all options on a filter
       * @param int categoryIndex index on the categories array
       * @param int filterIndex filter index on a category on the categories array
       * */
      selectAllFilter: function (categoryIndex, filterIndex) {

        let options = this.categories[categoryIndex].filters[filterIndex].options;
        this.chosenFilters[categoryIndex][filterIndex].options = [];//reset
        //then add everything
        for (let i = 0; i < options.length; i++) {

          let option = options[i];
          //note: using id if present, name otherwise
          this.chosenFilters[categoryIndex][filterIndex].options.splice(this.chosenFilters[categoryIndex][filterIndex].options.length, 0, this.getOptionId(option));
          this.$forceUpdate();
        }
        console.log('select all filter');
        this.$emit('update', this.getUrlQueryString());
      },
      /**
       * Selects none options on a filter
       * @param int categoryIndex index on the categories array
       * @param int filterIndex filter index on a category on the categories array
       * */
      selectNoneFilter: function (categoryIndex, filterIndex) {

        let options = this.categories[categoryIndex].filters[filterIndex].options;
        this.chosenFilters[categoryIndex][filterIndex].options = [];//reset
        this.$forceUpdate();
        console.log('select none filter');
        this.$emit('update', this.getUrlQueryString());
      },
      /**
       * Selects opposite options on a filter
       * @param int categoryIndex index on the categories array
       * @param int filterIndex filter index on a category on the categories array
       * */
      selectReverseFilter: function (categoryIndex, filterIndex) {

        let options = this.categories[categoryIndex].filters[filterIndex].options;
        let chosenOptions = this.chosenFilters[categoryIndex][filterIndex].options;
        this.chosenFilters[categoryIndex][filterIndex].options = [];//reset
        for (let i = 0; i < options.length; i++) {
          if (!chosenOptions.includes(this.getOptionId(options[i])))
            this.chosenFilters[categoryIndex][filterIndex].options.push(this.getOptionId(options[i]));
        }
        this.$forceUpdate();
        console.log('select reverse filter');
        this.$emit('update', this.getUrlQueryString());
      },

      /**
       * Get usable id for an option
       * @param Object option
       * @return string
       * */
      getOptionId: function (option) {
        return (option.id != null && option.id.length > 0) ? option.id : option.name
      },
      /**
       * Changes expanded state for a filter
       * @param int i category index
       * @param int j filter index
       * */
      toggleCategoryExpand: function (i, j) {
        this.chosenFilters[i][j].expanded = !this.chosenFilters[i][j].expanded;
        this.$forceUpdate();
      },
      /**
       * Changes expanded state for all categories (mobile version)
       * */
      toggleCategoriesExpand: function () {
        this.categoriesExpanded = !this.categoriesExpanded;
        this.$forceUpdate();
      },
      /**
       * When the location is found
       * @param {Object} addressData Data of the found location
       * @param {Object} placeResultData PlaceResult object
       * @param {String} id Input container ID
       */
      getAddressData: function (addressData, placeResultData, id) {
        console.log("update address", addressData);
        this.latitude = addressData.latitude;
        this.longitude = addressData.longitude;
        this.$root.$emit('centerMap', {lat: this.latitude, lng: this.longitude});
      },
      placeChanged: function () {
        console.log('place changed');
      },
      noResults: function (object) {
        this.latitude = null;
        this.longitude = null;
      },
      placeInputChange: function () {
        console.log('inputchange');
        this.latitude = null;
        this.longitude = null;
        console.log('place input change');
        this.$emit('update', this.getUrlQueryString());
      },
      /**
       * Get location text from coordinates, assign to 'place'
       */
      geocodeLatLng: function (lat, lng) {
        var geocoder = new google.maps.Geocoder;

        var latlng = {lat: lat, lng: lng};
        geocoder.geocode({'location': latlng}, function (results, status) {

          if (status === 'OK') {

            if (results[0]) {

              if (app.place == null)
                app.place = results[0].formatted_address;

              app.$refs.placeInput.update(app.place);
              app.$forceUpdate();
            } else {
              console.log('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
            console.log(status);
          }
        });
      },
      /**
       * Set selected category for category pages
       */
      setMainCategory: function (category) {
        this.chosenCategories = [category];
        this.mainCategory = category;
      },
      /**
       * Event: a filter has changed
       */
      onChangeFilter() {
        console.log('filter changed', this.chosenFilters);
        this.$emit('update', this.getUrlQueryString());
      },
      /**
       * Returns string with url parameters needed for request
       * NOTE: place not included as lat-lng has to be checked
       * @return string
       */
      getUrlQueryString: function () {
        let querystring = "";

        if (this.providerName)
          querystring += "&name=" + this.providerName;
        if (this.place && (this.latitude === null || this.latitude === ''))
          querystring += "&place=" + this.place;
        else if (this.latitude) {
          console.log('lat, lng', this.latitude, this.longitude);
          querystring += "&latitude=" + this.latitude;
          querystring += "&longitude=" + this.longitude;
        }

        let categoriesString = "";
        let filtersString = "";
        let lastUsedFilter = null;
        for (let i = 0; i < this.chosenCategories.length; i++) {

          let categoryIndex = this.chosenCategories[i];
          console.log(categoryIndex, this.categories[categoryIndex].id);
          categoriesString += ((i == 0) ? '' : ",") + this.categories[categoryIndex].id;
          if (this.chosenFilters[i])//may not have filters
            for (let j = 0; j < this.categories[categoryIndex].filters.length; j++) {//loop through filters
              //console.log(j,this.categories[categoryIndex].filters[j].id);
              let filter = this.categories[categoryIndex].filters[j].id;
              //     console.log(this.chosenFilters[categoryIndex][j]);
              if (this.chosenFilters[categoryIndex][j].options.length > 0)//may not have filters
                for (let k = 0; k < this.categories[categoryIndex].filters[j].options.length; k++) {//loop through options
                  //   console.log(this.categories[categoryIndex].filters[j].options[k].id);
                  let option = this.getOptionId(this.categories[categoryIndex].filters[j].options[k]);
                  // console.log(this.chosenFilters[categoryIndex][j].id,lastUsedFilter);
                  console.log(this.chosenFilters[categoryIndex][j].options);
                  if (this.chosenFilters[categoryIndex][j].options.indexOf(option) > -1) {
                    console.log('option detected', option);
                    if (this.categories[categoryIndex].filters[j].options[k].valueId) {
                      if (lastUsedFilter == this.chosenFilters[categoryIndex][j].id && !this.categories[categoryIndex].filters[j].options[k].exclusive)
                        filtersString += ",";
                      else
                        filtersString += "&" + this.chosenFilters[categoryIndex][j].id + "=";
                      filtersString += /*this.categories[categoryIndex].filters[j].options[k].valueId*/option;
                      lastUsedFilter = this.chosenFilters[categoryIndex][j].id;
                    }
                    else {

                      if (this.categories[categoryIndex].filters[j].options[k].id == "") {

                        if (lastUsedFilter == this.chosenFilters[categoryIndex][j].id)
                          filtersString += ",";
                        else
                          filtersString += "&" + this.chosenFilters[categoryIndex][j].id + "=";
                        filtersString += option;
                        lastUsedFilter = this.chosenFilters[categoryIndex][j].id;
                      }
                      else //option has id of its own
                      {//will be false if it has no_prefix
                        console.log(this.chosenFilters[categoryIndex][j].id.substring(0, 2));
                        if (this.chosenFilters[categoryIndex][j].id.substring(0, 2) == "no_")
                          filtersString += "&" + this.chosenFilters[categoryIndex][j].id.substring(2) + "=false";
                        else
                          filtersString += "&" + this.chosenFilters[categoryIndex][j].id + "=true";
                      }
                    }
                  }
                }
            }
        }

        if (this.chosenCategories.length == 0) {
          for (let j = 0; j < this.categories.length; j++) {//loop through filters
            categoriesString += ((j == 0) ? '' : ",") + this.categories[j].id;
          }
        }

        if (categoriesString != "")
          querystring += "&categories=" + categoriesString;
        if (filtersString != "")
          querystring += filtersString;
        console.log(filtersString);
        return querystring;
      },


    },
    watch: {
      'chosenCategories': function (val, oldVal) {
        console.log(val, oldVal, this.mounted, this.mainCategory);
        if (this.mounted && val != oldVal && (this.mainCategory === null || this.mainCategory === undefined )) //don't ask me about the second
          this.$emit('update', this.getUrlQueryString());
      },
      'chosenFilters': function (val, oldVal) {
        console.log(val, oldVal, this.mounted);
        if (this.mounted)
          this.$emit('update', this.getUrlQueryString());
      },
      'providerName': function (val, oldVal) {
        console.log(val, oldVal);
        if (this.mounted)
          this.$emit('update', this.getUrlQueryString());
      },
      'place': function (val, oldVal) {
        console.log(val, oldVal, this.mounted, this.city, this.mainCategory);
        if (this.mounted && (!this.city || val != this.city.fullName) && (this.mainCategory === null || this.mainCategory === undefined ))//second is to avoid infamous vue.js trigger after mounted
          this.$emit('update', this.getUrlQueryString());
      },
      /* 'alterChosenFilters': function (val, oldVal) {
         console.log("alter chosen filters");
         if (this.mounted)
           this.$emit('update', this.getUrlQueryString);
       },*/
    },
    computed: {},

  }
</script>
<!-- Add " scoped" attribute to limit CSS to this component only -->
<style scoped>

  .card-header h5 a {
    display: block;
    padding: 10px 15px;
    margin: -10px -15px;
    cursor: pointer;
    text-align: left;
  }

  .card-body {
    font-size: 0.8rem;
    /* line-height:1.1rem;*/
  }

  .card-options {
    font-size: 0.8rem;
    line-height: 0.8rem;
    margin-bottom: 0.4rem;
    text-align: left;
  }

  .popper {
    width: 220px;
  }

  .filters-selector {
    height: auto !important;
  }

  .express-search-bar {
    padding-top: 2.0rem;
  }

  .select-box {
    padding: 0.5rem;
  }

  #small_search_btn {
    font-size: 0.9rem;
    width: 100%;
  }

  #submit_btn {
    margin-left: auto;
    margin-right: auto;
  }

  #categories_select.collapse.show {
    display: flex !important;
  }

  #categories_link {
    font-size: 1.2rem;
    font-weight: bold;
  }

  @media (min-width: 767px) {
    #categories_select {
      display: flex;
    }

  }

  @media (min-width: 576px) and (max-width: 767px) {
    .select-box {
      padding: 0.4rem;
    }
  }

  @media (max-width: 576px) {
    .filters-link {
      float: right;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
    }

    .express-search-bar {
      padding-top: 1.0rem;
    }

    .select-box {
      padding: 0.3rem;
    }

  }


</style>
