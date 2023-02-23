import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/dist/vue3-openlayers.css";
import {
  faHouse,
  faShoppingCart,
  faLocationDot,
  faBoxArchive,
  faTrash,
  faCheck,
  faPlus,
  faArrowLeft,
  faMoon,
  faSailboat,
  faUpRightFromSquare,
  faClose,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const app = createApp(App);

library.add(
  faHouse,
  faShoppingCart,
  faLocationDot,
  faBoxArchive,
  faTrash,
  faCheck,
  faPlus,
  faArrowLeft,
  faMoon,
  faSailboat,
  faUpRightFromSquare,
  faClose,
  faPencil
);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(OpenLayersMap);

app.mount("#app");
