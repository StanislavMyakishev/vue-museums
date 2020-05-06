<template>
  <div class="favorite">
    <h1>Favorite</h1>
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
import { mapGetters } from "vuex";
import Card from "@/components/v-card";

export default {
  name: "Favorite",
  computed: {
    ...mapGetters("app", {
      artPieces: "favoriteArtPieces"
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
