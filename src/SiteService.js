// import requestUtils from "@/RequestUtils";
export default class SiteService {
  constructor() {
    this.title = "A BootifulPodcast.fm with Josh Long ";
    this.installTitle(this.title);
  }

  installTitle(title) {
    document.title = title;
  }

  getUrlForEpisode(episode) {
    const prefix = "https://bootifulpodcast.fm"; // todo make this dynamic so it works on localhost:8080 OR in prod
    return prefix + "/#/episodes/" + episode.uid;
  }

  configureMetadata(tags) {
    const head = document.getElementsByTagName("head")[0];
    for (let tag in tags) {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:" + tag);
      meta.setAttribute("content", tags[tag]);
      head.append(meta);
    }
  }

  appendToTitle(s) {
    this.title = this.title + ": " + s;
    this.installTitle(this.title);
  }
}
