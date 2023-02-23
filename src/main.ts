import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const app = createApp(App);

library.add(faHouse, faShoppingCart, faLocationDot, faBoxArchive, faTrash, faCheck, faPlus, faArrowLeft, faMoon);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
