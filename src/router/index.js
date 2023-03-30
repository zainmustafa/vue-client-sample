import Vue from "vue";
import VueRouter from "vue-router";
import LandingView from "../views/LandingView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingView,
  },
  {
    path: "/chart",
    name: "Chart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BarChartView.vue"),
  },
  {
    path: "/table",
    name: "Table",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TableView.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NotFoundView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
