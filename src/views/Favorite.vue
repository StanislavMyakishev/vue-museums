<template>
  <div class="favorite">
    <h1>Favorite</h1>
    <div class="favorite__empty" v-if="artPieces.length === 0">
      <h4>It's empty here...</h4>
      <h4>Add something to Favorites!</h4>
    </div>
    <div class="favorite__grid-wrapper">
      <section class="favorite__cards-list">
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
import Card from "@/components/v-card";
import { mapGetters } from "vuex";

export default {
  name: "Favorite",
  computed: {
    ...mapGetters("app", {
      artPieces: "getFavoriteArtPieces"
    })
  },
  components: {
    "v-card": Card
  }
};
</script>

<style lang="scss">
@import "../styles/views/favorite";
</style>
