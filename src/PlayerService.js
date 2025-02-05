// import requestUtils from "@/RequestUtils";

export default class PlayerService {
  constructor() {
    this.selected = null;
    this.playing = false;
  }

  getAudioElement() {
    return document.getElementsByClassName("audio-player").item(0);
  }

  isPlaying(podcast) {
    if (this.selected === null) {
      return false;
    }
    return this.selected.id === podcast.id && this.playing === true;
  }

  async play(podcast) {
    // this.selected = podcast
    const element = this.getAudioElement();
    console.assert(podcast != null);
    console.assert(element != null);
    try {
      await element.pause();
    } catch (e) {
      console.log("could not pause the audio");
    }
    if (this.selected === null || this.selected.id !== podcast.id) {
      await this.loadPodcast(podcast);
    }
    await element.play();
    this.playing = true;
    return true;
  }

  async pause(podcast) {
    if (this.selected !== null && this.selected.id !== podcast.id) {
      return;
    }

    const element = this.getAudioElement();
    try {
      await element.pause();
    } catch (e) {
      console.log("deleting " + e);
    }
    this.playing = false;
  }

  async loadPodcast(podcast) {
    this.selected = podcast;
    console.assert(this.getAudioElement() != null);
    await this.getAudioElement().load();
  }
}
