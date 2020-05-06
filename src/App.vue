<template>
  <div id="app">
    <app-header />
    <div class="content">
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<script>
import Header from "@/components/layout/v-header";
import Footer from "@/components/layout/v-footer";
export default {
  components: {
    "app-header": Header,
    "app-footer": Footer
  }
};
</script>

<style lang="scss">
@import "./styles/global";
@import "./styles/components/layout/app";
</style>
