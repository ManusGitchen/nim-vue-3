import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import "./assets/_variables.scss";
import "./assets/main.scss";

createApp(App).use(store).mount("#app");
