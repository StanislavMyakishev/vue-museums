<template>
  <div class="card" v-on:click.stop="handleShowModal(true)">
    <v-favorite-button
      class="card__favorite-button"
      :isFavorite="artPiece.isFavorite"
      @handleButtonAction="handleButtonAction"
    />
    <div class="card__image-container">
      <img :src="artPiece.primaryImageUrl || defaultImage" alt="image" />
    </div>
    <div class="card__content">
      <p class="card__title text--medium">
        {{ artPiece.title }}
      </p>
    </div>
    <v-popup
      :artPiece="artPiece"
      :showModal="showModal"
      @closePopup="handleShowModal(false)"
    />
  </div>
</template>

<script>
import Popup from "@/components/v-popup";
import Favorite from "@/components/v-favorite-button";

export default {
  name: "v-card",
  props: {
    artPiece: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultImage: require("../assets/images/default.jpg"),
      showModal: false
    };
  },
  methods: {
    handleShowModal(value) {
      this.showModal = !!value;
    },
    handleButtonAction() {
      this.$store.dispatch("app/handleFavorite", this.artPiece.objectNumber);
    }
  },
  components: {
    "v-popup": Popup,
    "v-favorite-button": Favorite
  }
};
</script>

<style lang="scss">
@import "../styles/components/card";
</style>
