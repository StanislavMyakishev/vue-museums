<template>
  <div class="home">
    <h1>Home</h1>
    <div class="home__loading-wrapper" v-if="loading">
      <img :src="loader" alt="" />
    </div>
    <div class="home__grid-wrapper" v-else>
      <section class="home__cards-list">
        <v-card
          v-for="artPiece in artPieces"
          :key="artPiece.objectNumber"
          v-bind:artPiece="artPiece"
        ></v-card>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Card from "@/components/v-card";

export default {
  name: "Home",
  computed: {
    ...mapState({
      page: state => state.app.page,
      loading: state => state.app.loading
    }),
    ...mapGetters("app", {
      artPieces: "getArtPiecesList"
    })
  },
  data() {
    return {
      loader: require("../assets/images/loader.svg")
    };
  },
  methods: {
    ...mapActions("app", {
      loadPage: "loadPage"
    })
  },
  async mounted() {
    this.loadPage();
  },
  components: {
    "v-card": Card
  }
};
</script>

<style lang="scss">
@import "../styles/views/home";
</style>
