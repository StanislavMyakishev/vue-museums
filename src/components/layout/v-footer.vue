<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <a
        v-if="prev"
        class="footer__link"
        @click.stop="handlePageChange(page - 1)"
        >Prev</a
      >
      <a v-else class="footer__link-disabled">Prev</a>
      <span>{{ page }}</span>
      <a
        v-if="next"
        class="footer__link"
        @click.stop="handlePageChange(page + 1)"
        >Next</a
      >
      <a v-else class="footer__wrapper__link-disabled">Next</a>
      <p>Stanislav Myakishev 2020</p>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "v-footer",
  computed: {
    ...mapState({
      page: state => state.app.page,
      prev: state => state.app.prev,
      next: state => state.app.next
    })
  },
  methods: {
    handlePageChange(page) {
      this.$store.dispatch("app/handlePageChange", page);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/components/layout/footer";
</style>
