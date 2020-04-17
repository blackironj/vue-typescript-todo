import Vue from "vue";
import VueRouter from "vue-router";

import Todo from "@/views/todo.vue";
import About from "@/views/about.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/todo",
      component: Todo
    },
    {
      path: "/about",
      component: About
    }
  ]
});
