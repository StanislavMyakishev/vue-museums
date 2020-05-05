<template>
  <div class="home">
    <h1>Home</h1>
    <div class="grid-wrapper">
      <section class="cards-list">
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
      page: state => state.app.page
    }),
    ...mapGetters("app", {
      artPieces: "filteredArtPieces"
    })
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
@import "../styles/components/home";
</style>
