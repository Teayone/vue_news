import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import "amfe-flexible";
import "./assets/css/reset.min.css";
import "./assets/css/common.css";
// 处理最大宽度
import { handleMaxWidth } from "./utils";
import { Lazyload } from "vant";
handleMaxWidth();
window.addEventListener("resize", handleMaxWidth);
createApp(App).use(store).use(router).use(Lazyload).mount("#app");
