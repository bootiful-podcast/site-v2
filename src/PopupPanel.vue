<script>
export default {
  name: "PopupPanel",

  props: [],

  async created() {},

  async mounted() {
    const that = this;
    const panel = this.$refs.panel;
    const target = this.$refs.target;
    that.visible = false;
    // this.panelWidth = panel.getClientRects() [0].width
    this.$root.$data.popupPanels = this.$root.$data.popupPanels || {
      pairs: [],
    };
    const pairs = this.$root.$data.popupPanels.pairs;
    pairs.push({
      panel: panel,
      target: target,
    });
    const popupPanelHideEvent = "popup-panel-hide-event";
    this.$store.bus.on(popupPanelHideEvent, () => {
      that.visible = false;
    });

    if (pairs.length === 1) {
      // console.debug('registering state management callbacks. This should only happen once per page')
      //  the following need to be registered once per browser window, and that's it!
      window.addEventListener("resize", () => {
        this.$store.bus.emit(popupPanelHideEvent);
      });

      document.body.addEventListener("click", (event) => {
        console.log("click!");
        const elementsInWhichTheClickOccurred = pairs.filter((pair) => {
          const panel = pair.panel;
          const target = pair.target;
          return panel.contains(event.target) || target.contains(event.target);
        });

        const wasOutside = elementsInWhichTheClickOccurred.length === 0;
        if (wasOutside) {
          this.$store.bus.emit(popupPanelHideEvent);
        }
        event.stopImmediatePropagation();
      });
    }
  },

  methods: {
    getScreenCoordinates(element) {
      let top = 0;
      let left = 0;

      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top: top,
        left: left,
        x: left,
        y: top,
      };
    },

    toggleVisibility() {
      this.visible = !this.visible;
      const target = this.$refs.target;
      const panel = this.$refs.panel;
      const coords = this.getScreenCoordinates(target);
      if (this.visible) {
        panel.style.left = coords.left;
        panel.style.top = coords.top;
      }
    },
  },

  data() {
    return {
      panelWidth: 0,
      visible: false,
    };
  },
  components: {},
};
</script>
<template>
  <div class="popup">
    <div @click.prevent="toggleVisibility()" ref="target">
      <div class="popup-link">
        <slot name="target"> the link or thing that should be clickable </slot>
      </div>
    </div>
    <div ref="panel" v-show="visible" class="popup-panel">
      <slot> This is a popover panel </slot>
    </div>
  </div>
</template>
<style>
.popup-link {
  cursor: pointer;
}

.popup-panel {
  display: block;
}
</style>
