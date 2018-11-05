<template>
  <div class="home container p-0">

    <div class="row">
      <div class="col mb-0 mt-0 mb-sm-3 mt-sm-3 ">
        <h1><span>Search for</span> Service Providers <span>in your area</span></h1>
      </div>
    </div>
    <div class="row">
      <div class="col mb-0 mbs-3 mt-0 mts-3">
        <div id="search_box" class="container">

          <search-bar :express="false"></search-bar>

          <h2 class="colored-text ">Behavioral Health & Harm Reduction Services</h2>
          <p class="secondary-colored-text" id="site_description">

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex. Mauris auctor tempor mauris, et hendrerit orci aliquam nec. Integer posuere neque et est ullamcorper pharetra. Phasellus mollis ligula sed ligula finibus aliquam. Etiam vel efficitur augue. Nam iaculis neque felis, non viverra nunc efficitur nec.

          </p>
          <div class="fluid-container pt-md-3 pt-sm-2" id="categories_links">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <a href="/substance-abuse"><h3>Substance Use Services</h3></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex.
                </p>
                <a href="/buprenorphine-physicians"><h3>Buprenorphine Physicians</h3></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex.
                </p>
                <a href="/buprenorphine-physicians"><h3>Buprenorphine Physicians</h3></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex.
                </p>
                <a href="/mental-health"><h3>Mental Health Services</h3></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex.
                </p>
              </div>
              <div class="col-md-6 col-sm-12">
                <a href="/naloxone-access"><h3>Naloxone</h3></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex.
                </p>
                <a href="/syringe-exchange-programs"><h3>Syringe Exchange Program</h3></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex.
                </p>
                <a href="/aa-locations"><h3>Alcoholycs Anonymous Meetings</h3></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex.
                </p>
                <a href="/na-locations"><h3>Narcotics Anonymous Meetings</h3></a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex.
                </p>
              </div>
            </div>
          </div>
          <h2 class="colored-text ">Find Providers by City & State</h2>
          <ul id="cities">
            <li><a href="/city/atlanta">Atlanta</a></li>
            <li><a href="/city/austin">Austin</a></li>
            <li><a href="/city/chicago">Chicago</a></li>
            <li><a href="/city/columbus">Columbus</a></li>
            <li><a href="/city/dallas">Dallas</a></li>
            <li><a href="/city/houston">Houston</a></li>
            <li><a href="/city/jersey-city">Jersey City</a></li>
            <li><a href="/city/los-angeles">Los Angeles</a></li>
            <li><a href="/city/new-york">New York</a></li>
            <li><a href="/city/philadelphia">Philadelphia</a></li>
            <li><a href="/city/san-antonio">San Antonio</a></li>
            <li><a href="/city/san-diego">San Diego</a></li>
            <li><a href="/city/san-francisco">San Francisco</a></li>
            <li><a href="/city/washington-dc">Washington, DC</a></li>
          </ul>
          <h2 class="colored-text mt-lg-5 mt-md-4 mt-sm-3 mt-2 mb-2 mb-sm-3 mb-md-4">
            What is Patient Review Network?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu magna odio. Phasellus nulla lectus, interdum non tempor et, lacinia varius dui. Phasellus suscipit, augue nec placerat tincidunt, dui massa sollicitudin velit, et gravida nulla erat ac ex. Mauris auctor tempor mauris, et hendrerit orci aliquam nec. Integer posuere neque et est ullamcorper pharetra. Phasellus mollis ligula sed ligula finibus aliquam. Etiam vel efficitur augue. Nam iaculis neque felis, non viverra nunc efficitur nec.
          </p>
        </div>

      </div>

    </div>

    <br/>

  </div>
</template>


<script>

  import SearchBar from './SearchBar.vue'

  export default {
    name: 'Home',
    components: {'search-bar': SearchBar},
    data() {
      return {
        notifySearchBarChanges: false,
      }
    },
    mounted() {
      console.log('mounted');
      document.dispatchEvent(new Event('render-trigger'));
    }
  }

</script>

<!-- Add " scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home h1 {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .home h2 {
    margin-top: 2.2rem;
    margin-bottom: 1.1rem;
  }

  #search_box {
    margin-top: 10px;
    background-color: white;
    border-radius: 25px;
    padding: 35px 25px;
  }

  #search_box h2 {
    font-weight: bold;
  }

  #site_description {
    font-weight: bold;
  }

  #categories_links div div a h3 {
    text-align: left;
    font-size: 1.3rem;
    text-decoration: underline;
    font-weight: bold;
    margin-bottom: 4px;
  }

  #categories_links p {

    font-size: 0.8rem;
    line-height: 1rem;
   /* color: black;*/
    margin-bottom: 0.3rem;

  }

  #cities {
    display: -ms-flexbox; /* IE 10 */
    display: -webkit-flex; /* Safari 6.1+. iOS 7.1+ */
    display: flex;
    -webkit-flex-flow: wrap column; /* Safari 6.1+ */
    flex-flow: wrap column;
    max-height: 160px; /* Limit height to whatever you need */
  }

  #cities li {
    color: #008081;
    text-align: left;
    font-weight: bold;
    font-size: 1.3rem;
    text-decoration: underline;
    line-height: 1.8rem;
  }

  @media only screen and (min-width: 575px) and (max-width: 991px) {
    #search_box h2 {
      font-size: 1.6rem;
    }

    #site_description {
      font-weight: normal;
    }

    #cities {

      max-height: 200px; /* Limit height to whatever you need */
    }
  }

  @media only screen and (max-width: 575px) {
    h1 {
      font-size: 1.5rem;
      text-align: left;
    }

    #search_box h2 {
      font-size: 1.2rem;
      text-align: left;
    }

    #site_description {
      font-weight: normal;
    }

    #cities {

      max-height: 160px; /* Limit height to whatever you need */
    }

    #categories_links div div a h3 {

      font-size: 1rem;
    }

    #cities li {
      font-size: 1rem;
      line-height: 1.4rem;
    }

    .home h2 {
      margin-top: 1rem;
      margin-bottom: 0.6rem;
    }

  }


</style>

