import Vue from "vue";

let handleOutsideClick;

Vue.directive("click-in", {
  bind(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation();

      const { handler, include } = binding.value;

      let clickedOnIncludedEl = false;
      include.forEach(refName => {
        if (!clickedOnIncludedEl) {
          const excludedEl = vnode.context.$refs[refName];
          clickedOnIncludedEl = excludedEl.contains(e.target);
        }
      });
      if (clickedOnIncludedEl) {
        vnode.context[handler]();
      }
    };
    el.addEventListener("click", handleOutsideClick);
    el.addEventListener("touchstart", handleOutsideClick);
  },

  unbind(el) {
    el.removeEventListener("click", handleOutsideClick);
    el.removeEventListener("touchstart", handleOutsideClick);
  }
});
