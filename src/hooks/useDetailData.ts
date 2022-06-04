import { useRoute } from "vue-router";
import type { Ref } from "vue";
import { watch, onBeforeUnmount, onUpdated } from "vue";
import useDetailStore from "@/store/modules/detail/detail";
import { storeToRefs } from "pinia";
const detailStore = useDetailStore();
export const useDetailData = () => {
  const route = useRoute();
  detailStore.getDetailData(route.params.id as string);
  return storeToRefs(detailStore);
};

export const useMountLink = (newsInfo: Ref<any>) => {
  let link: HTMLLinkElement;
  watch(
    () => newsInfo.value,
    (newVal) => {
      link = document.createElement("link");
      link.id = "link";
      link.rel = "stylesheet";
      link.href = newVal.css[0];
      document.head.appendChild(link);
    }
  );
  onBeforeUnmount(() => {
    detailStore.clearState();
    if (link) document.head.removeChild(link);
  });
  onUpdated(() => {
    let imgPlaceHolder = document.querySelector(".img-place-holder");
    if (imgPlaceHolder) {
      if (imgPlaceHolder.innerHTML === "") {
        imgPlaceHolder.innerHTML += `
        <img src="${newsInfo.value.image}" alt=""/>
        <div class="mark">
          <h2 class="title">${newsInfo.value.title}</h2>
        </div>
        `;
      }
    }
  });
};
