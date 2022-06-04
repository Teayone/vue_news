import { ref, onMounted, Ref } from "vue";
import { storeToRefs } from "pinia";
import useHomeStore from "@/store/modules/home/home";
export function useHomeData() {
  const store = useHomeStore();
  store.getHomeData(); // 获取首页数据
  return {
    store,
    ...storeToRefs(store),
  }; // 抛出首页数据
}

export const useHomeMoreData = (store: any, newsList: Ref<any[]>) => {
  const loadMore = ref<Element>();
  onMounted(() => {
    let ob = new IntersectionObserver((changes) => {
      const item = changes[0];
      // 当元素显示到视口上时该属性为 true，反之 false
      if (item.isIntersecting) {
        // 发起请求获取往日的新闻数据
        const date = newsList.value[newsList.value.length - 1]["date"];
        store.getHomeMoreData(date);
      }
    });
    ob.observe(loadMore.value as Element);
  });
  return {
    loadMore,
  };
};
