import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const PlacesView = () => import("../views/PlacesView.vue");
const PreparationView = () => import("../views/PreparationView.vue");
const ShoppingView = () => import("../views/ShoppingView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/places",
      name: "places",
      component: PlacesView,
    },
    {
      path: "/preparation",
      name: "preparation",
      component: PreparationView,
    },
    {
      path: "/shopping",
      name: "shopping",
      component: ShoppingView,
    },
  ],
});

export default router;
