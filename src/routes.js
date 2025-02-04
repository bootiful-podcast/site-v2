import About from "./About.vue";
import EpisodePage from "./EpisodePage.vue";

const about = { path: "/", component: About };
const episodes = {
  name: "episodes",
  path: "/episodes/:uid",
  component: EpisodePage,
  props: { default: true, uid: (route) => ({ id: route.query.uid }) },
};
const routes = [about, episodes];

export default routes;
