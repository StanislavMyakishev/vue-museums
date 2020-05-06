<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <a>Prev</a>
      <span>{{ page }}</span>
      <a>Next</a>
      <p>Stanislav Myakishev 2020</p>
    </div>
  </footer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "v-footer",
  computed: {
    ...mapState({
      page: state => state.app.page
    })
  },
  methods: {
    ...mapActions("app", {
      loadPage: "loadPage"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/layout/footer";
</style>
