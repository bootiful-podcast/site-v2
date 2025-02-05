<style></style>
<template>
  <section class="episode-detail">
    <a name="episode-detail"></a>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-10 col-12">
          <router-link id="home-router-link" to="/"> Home </router-link>
          <!--          -->

          <Episode
            v-if="episode != null"
            @pause="bubblePause(episode)"
            @play="bubblePlay(episode)"
            v-bind:episode="episode"
          />
        </div>
      </div>
      <span id="episodeViewAnchorPoint"></span>
    </div>
  </section>
</template>
<script>
import Episode from "@/Episode";

export default {
  props: ["id"],
  name: "EpisodePage",

  async mounted() {}, 
  
  async created() {
    const uid = this.$route.params.uid;
    this.episode = await this.$store.podcastService.readPodcastByUid(uid);
    const header = document.getElementById("header");
    const h = header.getBoundingClientRect().height;
    window.scrollTo(0, h);
    this.$store.siteService.appendToTitle(this.episode.title);

    this.$root.siteService.configureMetadata({
      title: this.episode.title,
      description: this.episode.title,
      image: this.episode.image ,
      url: this.$store.siteService.getUrlForEpisode(this.episode),
    });
  },
  methods: {
    isPlaying(episode) {
      return this.$store.playerService.isPlaying(episode);
    },
    bubblePlay(episode) {
      this.$emit("play", episode);
    },
    bubblePause(episode) {
      this.$emit("pause", episode);
    },
  },

  computed: {},

  data() {
    return {
      episode: null,
      menuOpen: false,
    };
  },

  components: { Episode },
};
</script>
