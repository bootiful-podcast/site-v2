<script>
export default {
  name: "SharePanel",

  props: ["title", "imageUrl", "postUrl"],

  async mounted() {},

  async created() {
    this.text = this.title;
    this.url = this.postUrl;

    const tags = "spring,cloud,kubernetes,devops,software,java";
    const amp = "&";
    const encodedImageUrl = encodeURIComponent(this.imageUrl);
    const callToAction =
      'Check out this episode of "A Bootiful Podcast," with Josh Long: ';
    const encodedUrl = encodeURIComponent(this.url);
    const encodedCallToAction = encodeURIComponent(callToAction);
    const encodedText = encodeURI(this.text);

    this.facebookUrl = "https://facebook.com/sharer/sharer.php?u=" + encodedUrl;
    this.twitterUrl =
      "https://twitter.com/intent/tweet/?url=" +
      encodedUrl +
      "&text=" +
      encodedText;
    this.tumblrUrl =
      "https://www.tumblr.com/widgets/share/tool?" +
      "posttype=link" +
      amp +
      "caption=" +
      encodedText +
      amp +
      "tags=" +
      tags +
      amp +
      "canonicalUrl=" +
      encodedUrl +
      amp +
      "shareSource=tumblr_share_button";
    this.emailUrl =
      "mailto:?subject=" +
      encodedCallToAction +
      encodedText +
      "&body=" +
      encodedUrl;
    this.pinterestUrl =
      "https://pinterest.com/pin/create/button/?" +
      "url=" +
      encodedUrl +
      amp +
      "media=" +
      encodedImageUrl +
      amp +
      "description=" +
      encodeURI(this.text.substring(0, 500));
    this.linkedInUrl =
      "https://www.linkedin.com/sharing/share-offsite/?url=" + encodedUrl;

    this.redditUrl =
      "https://reddit.com/submit/?url=" +
      encodedUrl +
      "&resubmit=true" +
      "&title=" +
      encodedText;

    this.whatsappUrl =
      "whatsapp://send?text=" + encodedText + "%20" + encodedUrl;
    this.hackerNewsUrl =
      "https://news.ycombinator.com/submitlink?u=" +
      encodedUrl +
      amp +
      "t=" +
      encodedText;
    this.telegramUrl =
      "https://telegram.me/share/url?text=" +
      encodedText +
      amp +
      "url=" +
      encodedUrl;
  },

  methods: {},

  data() {
    return {
      emailUrl: "",
      pinterestUrl: "",
      tumblrUrl: "",
      telegramUrl: "",
      facebookUrl: "",
      linkedInUrl: "",
      hackerNewsUrl: "",
      twitterUrl: "",
      redditUrl: "",
      whatsappUrl: "",
    };
  },

  components: {},
};
</script>

<template>
  <div>
    <!-- Sharingbutton Facebook -->
    <a
      class="resp-sharing-button__link"
      :href="facebookUrl"
      target="_blank"
      rel="noopener"
      aria-label="Facebook"
    >
      <div
        class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm3.6 11.5h-2.1v7h-3v-7h-2v-2h2V8.34c0-1.1.35-2.82 2.65-2.82h2.35v2.3h-1.4c-.25 0-.6.13-.6.66V9.5h2.34l-.24 2z"
            />
          </svg>
        </div>
        Facebook
      </div>
    </a>

    <!-- Sharingbutton Twitter -->
    <a
      class="resp-sharing-button__link"
      :href="twitterUrl"
      target="_blank"
      rel="noopener"
      aria-label="Twitter"
    >
      <div
        class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm5.26 9.38v.34c0 3.48-2.64 7.5-7.48 7.5-1.48 0-2.87-.44-4.03-1.2 1.37.17 2.77-.2 3.9-1.08-1.16-.02-2.13-.78-2.46-1.83.38.1.8.07 1.17-.03-1.2-.24-2.1-1.3-2.1-2.58v-.05c.35.2.75.32 1.18.33-.7-.47-1.17-1.28-1.17-2.2 0-.47.13-.92.36-1.3C7.94 8.85 9.88 9.9 12.06 10c-.04-.2-.06-.4-.06-.6 0-1.46 1.18-2.63 2.63-2.63.76 0 1.44.3 1.92.82.6-.12 1.95-.27 1.95-.27-.35.53-.72 1.66-1.24 2.04z"
            />
          </svg>
        </div>
        Twitter
      </div>
    </a>

    <!-- Sharingbutton Tumblr -->
    <a
      class="resp-sharing-button__link"
      :href="tumblrUrl"
      target="_blank"
      rel="noopener"
      aria-label="Tumblr"
    >
      <div
        class="resp-sharing-button resp-sharing-button--tumblr resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            enable-background="new 0 0 24 24"
            xml:space="preserve"
          >
            <path
              d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M15.492,17.616C11.401,19.544,9.5,17,9.5,14.031 V9.5h-2V8.142c0.549-0.178,1.236-0.435,1.627-0.768c0.393-0.334,0.707-0.733,0.943-1.2c0.238-0.467,0.401-0.954,0.49-1.675H12.5v3h2 v2h-2v3.719c0,2.468,1.484,2.692,2.992,1.701V17.616z"
            />
          </svg>
        </div>
        Tumblr
      </div>
    </a>

    <!-- Sharingbutton E-Mail -->
    <a
      class="resp-sharing-button__link"
      :href="emailUrl"
      target="_self"
      rel="noopener"
      aria-label="E-Mail"
    >
      <div
        class="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm8 16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8z"
            />
            <path
              d="M17.9 8.18c-.2-.2-.5-.24-.72-.07L12 12.38 6.82 8.1c-.22-.16-.53-.13-.7.08s-.15.53.06.7l3.62 2.97-3.57 2.23c-.23.14-.3.45-.15.7.1.14.25.22.42.22.1 0 .18-.02.27-.08l3.85-2.4 1.06.87c.1.04.2.1.32.1s.23-.06.32-.1l1.06-.9 3.86 2.4c.08.06.17.1.26.1.17 0 .33-.1.42-.25.15-.24.08-.55-.15-.7l-3.57-2.22 3.62-2.96c.2-.2.24-.5.07-.72z"
            />
          </svg>
        </div>
        E-Mail
      </div>
    </a>

    <!-- Sharingbutton Pinterest -->
    <a
      class="resp-sharing-button__link"
      :href="pinterestUrl"
      target="_blank"
      rel="noopener"
      aria-label="Pinterest"
    >
      <div
        class="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm1.4 15.56c-1 0-1.94-.53-2.25-1.14l-.65 2.52c-.4 1.45-1.57 2.9-1.66 3-.06.1-.2.07-.22-.04-.02-.2-.32-2 .03-3.5l1.18-5s-.3-.6-.3-1.46c0-1.36.8-2.37 1.78-2.37.85 0 1.25.62 1.25 1.37 0 .85-.53 2.1-.8 3.27-.24.98.48 1.78 1.44 1.78 1.73 0 2.9-2.24 2.9-4.9 0-2-1.35-3.5-3.82-3.5-2.8 0-4.53 2.07-4.53 4.4 0 .5.1.9.25 1.23l-1.5.82c-.36-.64-.54-1.43-.54-2.28 0-2.6 2.2-5.74 6.57-5.74 3.5 0 5.82 2.54 5.82 5.27 0 3.6-2 6.3-4.96 6.3z"
            />
          </svg>
        </div>
        Pinterest
      </div>
    </a>

    <!-- Sharingbutton LinkedIn -->
    <a
      class="resp-sharing-button__link"
      :href="linkedInUrl"
      target="_blank"
      rel="noopener"
      aria-label="LinkedIn"
    >
      <div
        class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            enable-background="new 0 0 24 24"
            xml:space="preserve"
          >
            <path
              d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M9.5,16.5h-2v-7h2V16.5z M8.5,7.5 c-0.553,0-1-0.448-1-1c0-0.552,0.447-1,1-1s1,0.448,1,1C9.5,7.052,9.053,7.5,8.5,7.5z M18.5,16.5h-3V13c0-0.277-0.225-0.5-0.5-0.5 c-0.276,0-0.5,0.223-0.5,0.5v3.5h-3c0,0,0.031-6.478,0-7h3v0.835c0,0,0.457-0.753,1.707-0.753c1.55,0,2.293,1.12,2.293,3.296V16.5z"
            />
          </svg>
        </div>
        LinkedIn
      </div>
    </a>

    <!-- Sharingbutton Reddit -->
    <a
      class="resp-sharing-button__link"
      :href="redditUrl"
      target="_blank"
      rel="noopener"
      aria-label="Reddit"
    >
      <div
        class="resp-sharing-button resp-sharing-button--reddit resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="9.391" cy="13.392" r=".978" />
            <path
              d="M14.057 15.814c-1.14.66-2.987.655-4.122-.004-.238-.138-.545-.058-.684.182-.13.24-.05.545.19.685.72.417 1.63.646 2.568.646.93 0 1.84-.228 2.558-.642.24-.13.32-.44.185-.68-.14-.24-.445-.32-.683-.18zM5 12.086c0 .41.23.78.568.978.27-.662.735-1.264 1.353-1.774-.2-.207-.48-.334-.79-.334-.62 0-1.13.507-1.13 1.13z"
            />
            <path
              d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm6.673 14.055c.01.104.022.208.022.314 0 2.61-3.004 4.73-6.695 4.73s-6.695-2.126-6.695-4.74c0-.105.013-.21.022-.313C4.537 13.73 4 12.97 4 12.08c0-1.173.956-2.13 2.13-2.13.63 0 1.218.29 1.618.757 1.04-.607 2.345-.99 3.77-1.063.057-.803.308-2.33 1.388-2.95.633-.366 1.417-.323 2.322.085.302-.81 1.076-1.397 1.99-1.397 1.174 0 2.13.96 2.13 2.13 0 1.177-.956 2.133-2.13 2.133-1.065 0-1.942-.79-2.098-1.81-.734-.4-1.315-.506-1.716-.276-.6.346-.818 1.395-.88 2.087 1.407.08 2.697.46 3.728 1.065.4-.468.987-.756 1.617-.756 1.17 0 2.13.953 2.13 2.13 0 .89-.54 1.65-1.33 1.97z"
            />
            <circle cx="14.609" cy="13.391" r=".978" />
            <path
              d="M17.87 10.956c-.302 0-.583.128-.79.334.616.51 1.082 1.112 1.352 1.774.34-.197.568-.566.568-.978 0-.623-.507-1.13-1.13-1.13z"
            />
          </svg>
        </div>
        Reddit
      </div>
    </a>

    <!-- Sharingbutton WhatsApp -->
    <a
      class="resp-sharing-button__link"
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
    >
      <div
        class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 24 24"
          >
            <path
              d="m12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 3.8c2.2 0 4.2 0.9 5.7 2.4 1.6 1.5 2.4 3.6 2.5 5.7 0 4.5-3.6 8.1-8.1 8.1-1.4 0-2.7-0.4-3.9-1l-4.4 1.1 1.2-4.2c-0.8-1.2-1.1-2.6-1.1-4 0-4.5 3.6-8.1 8.1-8.1zm0.1 1.5c-3.7 0-6.7 3-6.7 6.7 0 1.3 0.3 2.5 1 3.6l0.1 0.3-0.7 2.4 2.5-0.7 0.3 0.099c1 0.7 2.2 1 3.4 1 3.7 0 6.8-3 6.9-6.6 0-1.8-0.7-3.5-2-4.8s-3-2-4.8-2zm-3 2.9h0.4c0.2 0 0.4-0.099 0.5 0.3s0.5 1.5 0.6 1.7 0.1 0.2 0 0.3-0.1 0.2-0.2 0.3l-0.3 0.3c-0.1 0.1-0.2 0.2-0.1 0.4 0.2 0.2 0.6 0.9 1.2 1.4 0.7 0.7 1.4 0.9 1.6 1 0.2 0 0.3 0.001 0.4-0.099s0.5-0.6 0.6-0.8c0.2-0.2 0.3-0.2 0.5-0.1l1.4 0.7c0.2 0.1 0.3 0.2 0.5 0.3 0 0.1 0.1 0.5-0.099 1s-1 0.9-1.4 1c-0.3 0-0.8 0.001-1.3-0.099-0.3-0.1-0.7-0.2-1.2-0.4-2.1-0.9-3.4-3-3.5-3.1s-0.8-1.1-0.8-2.1c0-1 0.5-1.5 0.7-1.7s0.4-0.3 0.5-0.3z"
            />
          </svg>
        </div>
        WhatsApp
      </div>
    </a>

    <!-- Sharingbutton Hacker News -->
    <a
      class="resp-sharing-button__link"
      :href="hackerNewsUrl"
      target="_blank"
      rel="noopener"
      aria-label="Hacker News"
    >
      <div
        class="resp-sharing-button resp-sharing-button--hackernews resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path
              fill-rule="evenodd"
              d="M128 256c70.692 0 128-57.308 128-128C256 57.308 198.692 0 128 0 57.308 0 0 57.308 0 128c0 70.692 57.308 128 128 128zm-9.06-113.686L75 60h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L161.49 60h18.69l-44.34 83.308v53.087h-16.9v-54.08z"
            />
          </svg>
        </div>
        Hacker News
      </div>
    </a>

    <!-- Sharingbutton Telegram -->
    <a
      class="resp-sharing-button__link"
      :href="telegramUrl"
      target="_blank"
      rel="noopener"
      aria-label="Telegram"
    >
      <div
        class="resp-sharing-button resp-sharing-button--telegram resp-sharing-button--medium"
      >
        <div
          aria-hidden="true"
          class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 23.5c6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5.5 5.65.5 12 5.65 23.5 12 23.5zM2.505 11.053c-.31.118-.505.738-.505.738s.203.62.513.737l3.636 1.355 1.417 4.557a.787.787 0 0 0 1.25.375l2.115-1.72a.29.29 0 0 1 .353-.01L15.1 19.85a.786.786 0 0 0 .746.095.786.786 0 0 0 .487-.573l2.793-13.426a.787.787 0 0 0-1.054-.893l-15.568 6z"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        Telegram
      </div>
    </a>
  </div>
</template>

<style>
.resp-sharing-button__link,
.resp-sharing-button__icon {
  display: inline-block;
}

.resp-sharing-button__link {
  text-decoration: none;
  color: #fff;
  margin: 0;
  margin-right: 10px;
  margin-bottom: 10px;
}

.resp-sharing-button {
  border-radius: 5px;
  transition: 25ms ease-out;
  padding: 0.5em 0.75em;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: smaller;
}

.resp-sharing-button__icon svg {
  width: 1em;
  height: 1em;
  margin-right: 0.4em;
  vertical-align: top;
}

.resp-sharing-button--small svg {
  margin: 0;
  vertical-align: middle;
}

/* Non solid icons get a stroke */
.resp-sharing-button__icon {
  stroke: #fff;
  fill: none;
}

/* Solid icons get a fill */
.resp-sharing-button__icon--solid,
.resp-sharing-button__icon--solidcircle {
  fill: #fff;
  stroke: none;
}

.resp-sharing-button--twitter {
  background-color: #55acee;
}

.resp-sharing-button--twitter:hover {
  background-color: #2795e9;
}

.resp-sharing-button--pinterest {
  background-color: #bd081c;
}

.resp-sharing-button--pinterest:hover {
  background-color: #8c0615;
}

.resp-sharing-button--facebook {
  background-color: #3b5998;
}

.resp-sharing-button--facebook:hover {
  background-color: #2d4373;
}

.resp-sharing-button--tumblr {
  background-color: #35465c;
}

.resp-sharing-button--tumblr:hover {
  background-color: #222d3c;
}

.resp-sharing-button--reddit {
  background-color: #5f99cf;
}

.resp-sharing-button--reddit:hover {
  background-color: #3a80c1;
}

.resp-sharing-button--linkedin {
  background-color: #0077b5;
}

.resp-sharing-button--linkedin:hover {
  background-color: #046293;
}

.resp-sharing-button--email {
  background-color: #777;
}

.resp-sharing-button--email:hover {
  background-color: #5e5e5e;
}

.resp-sharing-button--whatsapp {
  background-color: #25d366;
}

.resp-sharing-button--whatsapp:hover {
  background-color: #1da851;
}

.resp-sharing-button--hackernews {
  background-color: #ff6600;
}

.resp-sharing-button--hackernews:hover,
.resp-sharing-button--hackernews:focus {
  background-color: #fb6200;
}

.resp-sharing-button--facebook {
  background-color: #3b5998;
  border-color: #3b5998;
}

.resp-sharing-button--facebook:hover,
.resp-sharing-button--facebook:active {
  background-color: #2d4373;
  border-color: #2d4373;
}

.resp-sharing-button--twitter {
  background-color: #55acee;
  border-color: #55acee;
}

.resp-sharing-button--twitter:hover,
.resp-sharing-button--twitter:active {
  background-color: #2795e9;
  border-color: #2795e9;
}

.resp-sharing-button--tumblr {
  background-color: #35465c;
  border-color: #35465c;
}

.resp-sharing-button--tumblr:hover,
.resp-sharing-button--tumblr:active {
  background-color: #222d3c;
  border-color: #222d3c;
}

.resp-sharing-button--email {
  background-color: #777777;
  border-color: #777777;
}

.resp-sharing-button--email:hover,
.resp-sharing-button--email:active {
  background-color: #5e5e5e;
  border-color: #5e5e5e;
}

.resp-sharing-button--pinterest {
  background-color: #bd081c;
  border-color: #bd081c;
}

.resp-sharing-button--pinterest:hover,
.resp-sharing-button--pinterest:active {
  background-color: #8c0615;
  border-color: #8c0615;
}

.resp-sharing-button--linkedin {
  background-color: #0077b5;
  border-color: #0077b5;
}

.resp-sharing-button--linkedin:hover,
.resp-sharing-button--linkedin:active {
  background-color: #046293;
  border-color: #046293;
}

.resp-sharing-button--reddit {
  background-color: #5f99cf;
  border-color: #5f99cf;
}

.resp-sharing-button--reddit:hover,
.resp-sharing-button--reddit:active {
  background-color: #3a80c1;
  border-color: #3a80c1;
}

.resp-sharing-button--whatsapp {
  background-color: #25d366;
  border-color: #25d366;
}

.resp-sharing-button--whatsapp:hover,
.resp-sharing-button--whatsapp:active {
  background-color: #1da851;
  border-color: #1da851;
}

.resp-sharing-button--hackernews {
  background-color: #ff6600;
  border-color: #ff6600;
}

.resp-sharing-button--hackernews:hover .resp-sharing-button--hackernews:active {
  background-color: #fb6200;
  border-color: #fb6200;
}

.resp-sharing-button--telegram {
  background-color: #54a9eb;
}

.resp-sharing-button--telegram:hover {
  background-color: #4b97d1;
}
</style>
