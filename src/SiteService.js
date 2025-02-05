

export default class SiteService {
  
  constructor() {
    this.title = "A BootifulPodcast.fm with Josh Long ";
    this.installTitle(this.title);
  }

  installTitle(title) {
    document.title = title;
  }

  getUrlForEpisode(episode) {
    return episode.url
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
