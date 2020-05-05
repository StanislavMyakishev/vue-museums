<template>
  <button class="btn-like">
    <img :src="likeImage" alt="" />
  </button>
</template>

<script>
export default {
  name: "v-like-button",
  data() {
    return {
      likeImage: require("../assets/images/favorite_filled.svg"),
      dislikeImage: require("../assets/images/favorite_outlined.svg")
    };
  }
};
</script>

<style lang="scss">
@import "../styles/components/button-like";
</style>
