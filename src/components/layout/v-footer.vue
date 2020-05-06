<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <a v-if="prev" @click.stop="handlePageChange(page - 1)">Prev</a>
      <span>{{ page }}</span>
      <a @click.stop="handlePageChange(page + 1)">Next</a>
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
