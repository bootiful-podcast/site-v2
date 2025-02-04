import { createRouter, createWebHashHistory } from "vue-router";
import About from "@/About.vue";
import EpisodePage from "@/EpisodePage.vue";

const routes = [
  { path: "/", component: About },
  {
    name: "episodes",
    path: "/episodes/:uid",
    component: EpisodePage,
    props: {
      default: true,
      // function mode, more about it below
      uid: (route) => ({ id: route.query.uid }),
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
