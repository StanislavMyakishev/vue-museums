import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Favorite from "./views/Favorite";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/favorite",
      name: "favorite",
      component: Favorite
    }
  ]
});
