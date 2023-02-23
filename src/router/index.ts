import PlaceItemView from "@/views/PlaceItemView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlacesView from "../views/PlacesView.vue";
import PreparationView from "../views/PreparationView.vue";
import ShoppingView from "../views/ShoppingView.vue";

const router = createRouter({
  history: createWebHistory("/fishing-log/"),
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
      path: "/places/:id",
      name: "placeItem",
      component: PlaceItemView,
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
