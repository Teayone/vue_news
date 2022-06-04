import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import useGlobalStore from "@/store/modules/global/global";

export function useRequestData() {
  const route = useRoute();
  const globalStore = useGlobalStore();
  const gobj = ref<any>();
  watch(
    () => route.path,
    async () => {
      if (globalStore.isLogin && globalStore.info) {
        gobj.value = storeToRefs(globalStore);
      } else {
        const res = await globalStore.getCheckLoginAsync();
        if (res) {
          await globalStore.getUserInfoAsync();
          gobj.value = storeToRefs(globalStore);
        }
      }
    }
  );
  return globalStore;
}
