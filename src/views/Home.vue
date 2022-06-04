<template>
  <Head :time="today" />
  <Swiper :banner-list="bannerList" />
  <!-- 骨架屏 -->
  <Skeleton :row="5" v-if="newsList.length === 0" />

  <List v-else :news-list="newsList" />

  <!-- 滚动到出现这个元素时加载更多数据 -->
  <div class="lazy-more" v-show="newsList.length !== 0" ref="loadMore">
    <Loading size="12px">精彩数据准备中。。。</Loading>
  </div>
</template>
<script lang="ts">
export default {
  name: "Home",
};
</script>
<script setup lang="ts">
import { Skeleton, Loading } from "vant";
import Head from "@/components/Head";
import Swiper from "@/components/Swiper";
import List from "@/components/List";
import { useHomeData, useHomeMoreData } from "@/hooks/useHomeData";
// 获取首页数据的 hook
const { today, bannerList, newsList, store } = useHomeData();
// 获取更多数据的 hook
const { loadMore } = useHomeMoreData(store, newsList);
</script>

<style scoped lang="less">
.van-skeleton {
  padding: 30px 15px;
}
.lazy-more {
  text-align: center;
  padding: 10px 20px;
  background-color: #f4f4f4;
}
</style>
