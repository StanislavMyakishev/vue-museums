import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./common/directives";
import {
  LOCALSTORAGE_FAVORITE_ART_PIECES,
  LOCALSTORAGE_FAVORITES
} from "./common/localStorage";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    favoriteArtPieces: [],
    favorites: {}
  },
  methods: {
    handleSet(favorites, favoriteArtPieces) {
      this.$store.dispatch("app/handleInitialData", {
        favorites,
        favoriteArtPieces
      });
    }
  },
  mounted() {
    if (
      localStorage.getItem(LOCALSTORAGE_FAVORITE_ART_PIECES) &&
      localStorage.getItem(LOCALSTORAGE_FAVORITES)
    ) {
      const favorites = localStorage.getItem(LOCALSTORAGE_FAVORITES);
      const favoriteArtPieces = localStorage.getItem(
        LOCALSTORAGE_FAVORITE_ART_PIECES
      );
      this.handleSet(JSON.parse(favorites), JSON.parse(favoriteArtPieces));
    } else {
      localStorage.setItem(
        LOCALSTORAGE_FAVORITE_ART_PIECES,
        JSON.stringify(this.favoriteArtPieces)
      );
      localStorage.setItem(
        LOCALSTORAGE_FAVORITES,
        JSON.stringify(this.favorites)
      );
    }
  }
}).$mount("#app");
