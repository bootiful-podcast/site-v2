import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";
import routes from "@/routes";

import PodcastService from "@/PodcastService";
import PlayerService from "@/PlayerService";
import SiteService from "@/SiteService";
import mitt from "mitt";
const rootUrl = ""; //todo
const podcastService = new PodcastService(rootUrl);
const playerService = new PlayerService();
const siteService = new SiteService();
const bus = mitt();

const store = {
  bus: bus,
  podcastService: podcastService,
  playerService: playerService,
  siteService: siteService,
  rootUrl: rootUrl,
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const router = new VueRouter({ routes });
// const app = new Vue({
//   data: store,
//   router: router,
//   render: (h) => h(App),
// });

// createApp(App).use(router).mount("#app");
const app = createApp(App);
app.config.globalProperties.$store = store;
app.use(router);
app.mount("#app");
