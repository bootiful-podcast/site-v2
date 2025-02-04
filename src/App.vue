<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;700;900&display=swap");

@import url("assets/css/all.css");
@import url("assets/css/framework.css");
@import url("assets/css/responsive.css");
@import url("assets/css/main.css");
</style>
<template>
  <div>
    <a id="top"></a>

    <header class="top-bar" id="topBar">
      <div class="audio-title-container">
        <div v-if="selected != null" class="col-md-12 align-content-center">
          {{ selected.title }}
        </div>
      </div>

      <div class="audio-image-container">
        <img v-if="selected != null" :src="selected.episodePhotoUri"/>
      </div>

      <div class="audio-audio-container">
        <audio class="audio-player" :src="selectedEpisodeUri" controls>
          Your browser does not support the HTML5 <code>audio</code> element and
          so can't play the recent episodes.
        </audio>
      </div>

      <div class="menu-bar-container">
        <div
            class="navbar-toggler mobile-nav-btn"
            data-toggle="collapse"
            @click="toggleMenu()"
            data-target="#mobile-menu"
            aria-controls="mobile menu"
            :aria-expanded="menuOpen"
            aria-label="Toggle navigation"
        >
          <div :class="getMenuClass()">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div
            :class="
            ' navbar-collapse mobile-menu-collapse ' +
            (this.menuOpen ? '' : 'collapse')
          "
            id="mobile-menu"
        >
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a
                  class="nav-link"
                  target="_blank"
                  href="http://twitter.com/starbuxman"
              >Twitter (@starbuxman)</a
              >
            </li>
            <li class="nav-item">
              <a
                  class="nav-link"
                  target="_blank"
                  href="http://twitter.com/BootifulPodcast"
              >Twitter (@BootifulPodcast)</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" target="_blank" href="http://joshlong.com"
              >Josh's blog</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" target="_blank" href="http://start.Spring.io">
                My second favorite place on the internet
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <header class="header" id="header">
      <nav class="navbar">
        <div class="container-fluid">
          <div class="logo">
            <a href="/">
              <img src="/assets/images/logo-ne.png" alt="A Bootiful Podcast"/>
            </a>
          </div>
          <ul class="nav-menu">
            <li class="active">
              <a href="/">Home</a>
            </li>

            <li><a href="#latest-podcasts">Latest Episodes</a></li>
            <li><a href="#all-podcasts">All Episodes</a></li>
            <li><a href="#podcatchers">iTunes/Google Play/Spotify</a></li>
            <li>
              <a href="https://www.patreon.com/joshlong"
              >Support Us On Patreon
              </a>
            </li>
          </ul>
          <div class="search-nav"></div>
        </div>
      </nav>
      <div class="hero">
        <div class="hero-photo">
          <img srcset="/assets/images/josh@2x.webp 2x" alt="josh Long"/>
        </div>
        <div class="hero-text">
          <h1 class="hello">
            Hi, I'm
            <a
                style="color: greenyellow; text-shadow: none"
                href="http://twitter.com/starbuxman"
            >Josh Long</a
            >, a humble Spring developer advocate, and this is
            <em>A&nbsp;Bootiful&nbsp;Podcast</em>, a celebration of the heroes
            that drive the Spring and Java ecosystems
          </h1>
          <div>
            <a href="#latest-podcasts" class="btn-slide minimal-btn">
              <i class="fas fa-angle-down"></i>view podcasts
            </a>
          </div>
        </div>
        <div class="hero-bottom"></div>
      </div>
    </header>
    <section class="section" id="content">
      <router-view
          @play="bubblePlay"
          @pause="bubblePause"
          :key="$route.fullPath"
      />
    </section>
    <section class="section" id="podcasts-archive">
      <div class="heading-section">
        <h5>All Episodes</h5>
        <a name="all-podcasts"></a>
      </div>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-lg-11 col-md-12 col-12">
            <div class="tab-nav-archive">
              <ul class="nav nav-tabs" role="tablist">
                <div v-for="year in years" :key="year.year">
                  <li>
                    <a
                        :id="'year-' + year.year + 'tab'"
                        data-toggle="tab"
                        @click="selectedYear = year.year"
                        :class="
                        'tab-pane-toggle ' + getYearActiveClassName(year.year)
                      "
                        role="tab"
                    >{{ year.year }} Episodes</a
                    >
                  </li>
                </div>
              </ul>
            </div>

            <div class="tab-content" v-for="year in years" :key="year.year">
              <div
                  :class="
                  'tab-pane fade show tab-pane-content ' +
                  getYearActiveClassName(year.year)
                "
                  role="tabpanel"
                  :aria-labelledby="year"
                  :id="'year-' + year.year + '-content'"
              >
                <div :key="episode.id" v-for="episode in year.episodes">
                  <Episode
                      :episode="episode"
                      :selected="isPlaying(episode)"
                      @play="bubblePlay(episode)"
                      @pause="bubblePause(episode)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="heading-section">
        <h5>Listen On Your Favorite Podcatcher Platform</h5>
        <a name="podcatchers"></a>
      </div>

      <div class="container-fluid">
        <div class="row justify-content-center">
          <p>
            You can listen to the podcast on all the usual podcast platforms:
          </p>
        </div>
        <div class="row justify-content-center">
          <!-- todo restore this !! i just removed this on 2-4-2025! fix it!
          <table>
            <tr>
              <td>
                <a
                  href="https://podcasts.apple.com/us/podcast/a-bootiful-podcast/id1438691771?mt=2"
                >
                  <img
                    src="/assets/images/podcast-apps/itunes.png"
                    alt="iTunes and Apple Podcasts"
                    class="podcast-app-image"
                  />
                </a>
              </td>

              <td>
                <a
                  href="https://play.google.com/music/listen?u=0#/ps/I5qmmensglu6q5iwourdl2a2hcm"
                >
                  <img
                    src="/assets/images/podcast-apps/google.png"
                    alt="Google"
                    class="podcast-app-image"
                  />
                </a>
              </td>

              <td>
                <a
                  href="https://open.spotify.com/show/5eyimRNrvZStATQk8by82A?si=iq0BzQVrSrO6XvARMiVSPg"
                >
                  <img
                    src="/assets/images/podcast-apps/spotify.png"
                    alt="Spotify"
                    class="podcast-app-image"
                  />
                </a>
              </td>
            </tr>
          </table>
          -->
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-4 col-sm-6">
            <p class="copyrights">
              All rights reserved for <em>A Bootiful Podcast</em> 2018-2025
            </p>
          </div>
          <div class="col-md-4 col-hide">
            <a href="#top" @click="scrollToTop" class="button-scroll-top">
              <img
                  src="/assets/images/scrollTop.png"
                  alt="Scroll to the top of the page"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import Episode from "@/Episode";

export default {
  name: "App",

  async mounted() {
  },

  async created() {
    console.info("Launching BootifulPodcast.fm ");
    const cy = new Date().getFullYear();
    this.currentYear = cy;
    this.selectedYear = cy;

    function calculateYears(ps) {
      const start = 2018;
      const years = [];
      let ny = start;
      while (cy >= ny) {
        years.push(ny++);
      }
      years.sort((a, b) => b - a);
      return years.map((year) => {
        return {
          year: year,
          episodes: ps.filter(
              (p) => parseInt(p.dateAndTime.split("/")[2]) === year
          ),
        };
      });
    }

    this.podcasts = await this.$store.podcastService.readPodcasts();
    this.latest = await this.$store.podcastService.readLatest();
    this.top3 = await this.$store.podcastService.readTop3();
    this.years = calculateYears(this.podcasts);
    const ps = this.$store.playerService;
    // const that = this;
    /*  todo refactor this to use mitt
   this.$on("play", async (episode) => {
      console.log("playing " + episode.uid);
      that.selected = episode;
      await ps.play(episode);
    });
    */

    /*   this.$on("pause", async (episode) => {
      console.log("pausing " + episode.uid);
      await ps.pause(episode);
    });
    */
    // this way we synchronize player state to the HTML5 controls, not just our custom ones
    const player = this.$store.playerService.getAudioElement();
    player.addEventListener("pause", () => {
      ps.playing = false;
    });
    player.addEventListener("playing", () => {
      ps.playing = true;
    });
  },

  methods: {
    async isPlaying(episode) {
      return this.$store.playerService.isPlaying(episode);
    },
    async bubblePlay(episode) {
      this.$emit("play", episode);
    },
    async bubblePause(episode) {
      this.$emit("pause", episode);
    },

    calculateUrlForPodcast(podcast) {
      const url =
          this.$store.rootUrl +
          podcast["episodeUri"].substring(1, podcast.episodeUri.length);
      console.log("the url is ", url);
      return url;
    },

    getMenuClass() {
      return (this.menuOpen ? "open" : "") + " hamburger-menu";
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    scrollToTop() {
      window.scrollTo(window.scrollX, 0);
      return false;
    },

    getYearActiveClassName(year) {
      return year === this.selectedYear ? "active" : "";
    },
  },

  computed: {
    selectedEpisodeUri: function () {
      return this.selected == null
          ? ""
          : this.calculateUrlForPodcast(this.selected);
    },
  },

  data() {
    return {
      menuOpen: false,
      playing: false,
      currentYear: 0,
      selectedYear: 0,
      years: [],
      selected: null,
      top3: [],
      podcasts: [],
    };
  },

  components: {Episode},
};
</script>
