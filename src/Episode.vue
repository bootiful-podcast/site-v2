<style>
.share-panel {
  margin-top: 20px;
}

.podcast-episode .photo img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  display: block;
}

.podcast-episode {
  display: grid;
}

@media only screen and (max-width: 500px) {
  .podcast-episode .photo {
    justify-self: center;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .podcast-episode {
    grid-template-areas:
      "photo"
      "title "
      "dateline"
      "description"
      "share";
    grid-template-columns:   auto;
    grid-template-rows: auto auto auto auto auto;
  }
}

@media only screen and (min-width: 500px) {
  .podcast-episode .photo {
    justify-self: right;
    margin-right: 20px;
  }

  .podcast-episode {
    grid-template-areas:
      "photo title   "
      "photo dateline   "
      "photo description  "
      ".  share";
    grid-template-columns: 200px   auto;
    grid-template-rows: auto auto auto auto;
  }
}

.podcast-episode .photo {
  grid-area: photo;
}

.podcast-episode .title {
  grid-area: title;
}

.podcast-episode .description {
  grid-area: description;
}

.podcast-episode .share {
  grid-area: share;
  margin-top: 10px;
}

.podcast-episode .controls {
  justify-self: left;
  grid-area: controls;
}
</style>
<template>
  <div class="podcast-episode">
    <div class="photo" id="'delayed-image-' + episode.uid ">
      <img :alt="'photo for ' + episode.uid" :src="episode.image" />
    </div>

    <h4 class="title">
      <a :href="episode.url">
        {{episode.title}}   
      </a>
      
<!--      <router-link
        class="active"
        :to="{ name: 'episodes', params: { uid: episode.uid } }"
      >
        {{ episode.title }}
      </router-link>-->
    </h4>

    <div class="dateline">{{ episode.dateAndTime }}</div>
    <div class="description" v-html="episode.description"></div>

    <div class="share">
      <PopupPanel>
        <template v-slot:target> Share </template>

        <div>
          <SharePanel
            :title="episode.title"
            :image-url="episode.image"
            :post-url="getUrlForEpisode(episode)"
            :episode="episode"
          />
        </div>
      </PopupPanel>
    </div>
<!--
    <div class="controls">
&lt;!&ndash;      <ul>
        <li class="control-ep">
          <div class="icon">
            <i
              @click.prevent="bubblePlay(episode)"
              v-if="isPlaying(episode) === false"
              class="fas fa-play"
            ></i>
            <i
              @click.prevent="bubblePause(episode)"
              v-if="isPlaying(episode) === true"
              class="fas fa-pause"
            ></i>
          </div>
          <span
            class="play-status"
            id="'episode-play-' + episode.uid +'-status' "
          ></span>
        </li>
      </ul>&ndash;&gt;
    </div>-->
  </div>
</template>
<script>
import SharePanel from "@/SharePanel";
import PopupPanel from "@/PopupPanel";

export default {
  name: "Episode",

  props: ["episode", "active"],

  mounted() {},

  created() {},

  methods: {
    getUrlForEpisode(episode) {
      return this.$store.siteService.getUrlForEpisode(episode);
    },
    bubblePlay(episode) {
      this.$emit("play", episode);
    },
    isPlaying(episode) {
      return this.$store.playerService.isPlaying(episode);
    },
    bubblePause(episode) {
      this.$emit("pause", episode);
    },
  },

  data() {
    return {};
  },

  components: { PopupPanel, SharePanel },
};
</script>
