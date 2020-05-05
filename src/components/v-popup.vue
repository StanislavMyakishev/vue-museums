<template>
  <div
    id="popup"
    class="v-popup"
    v-click-in="{
      include: ['overlay'],
      handler: 'closePopup'
    }"
  >
    <transition name="fade" appear>
      <div
        ref="overlay"
        class="v-popup__overlay"
        v-if="showModal"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="v-popup__modal" v-if="showModal" ref="modal">
        <button class="v-popup__close" v-on:click.stop="closePopup">
          <img :src="clearImage" alt="" />
        </button>
        <v-like-button />
        <div class="v-popup__modal__image-container">
          <img :src="artPiece.primaryImageUrl || defaultImage" alt="image" />
        </div>
        <div class="v-popup__title">
          <h2>{{ artPiece.title }}</h2>
        </div>
        <div class="v-popup__info">
          <h4><span>Object number:&nbsp;</span>{{ artPiece.objectNumber }}</h4>
          <h4><span>Autors:&nbsp;</span>{{ artPiece.namesOfPeople }}</h4>
          <h4><span>Century:&nbsp;</span>{{ artPiece.century }}</h4>
          <h4><span>Date:&nbsp;</span>{{ artPiece.date }}</h4>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Like from "@/components/v-like-button";

export default {
  name: "v-popup",
  props: {
    artPiece: {
      type: Object,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    }
  },
  data() {
    return {
      defaultImage: require("../assets/images/default.jpg"),
      clearImage: require("../assets/images/clear.svg")
    };
  },
  components: {
    "v-like-button": Like
  }
};
</script>

<style lang="scss">
@import "../styles/components/popup";
</style>
