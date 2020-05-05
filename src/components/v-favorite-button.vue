<template>
  <button class="btn-like" @click.stop="handleButtonAction">
    <img v-if="isFavorite" :src="favoriteImage" alt="" />
    <img v-if="!isFavorite" :src="notFavoriteImage" alt="" />
  </button>
</template>

<script>
export default {
  name: "v-favorite-button",
  props: {
    isFavorite: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleButtonAction() {
      this.$emit("handleButtonAction");
    }
  },
  data() {
    return {
      favoriteImage: require("../assets/images/favorite_filled.svg"),
      notFavoriteImage: require("../assets/images/favorite_outlined.svg")
    };
  }
};
</script>
