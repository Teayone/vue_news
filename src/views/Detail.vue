<template>
  <Skeleton :row="5" v-if="newsInfo === null" />
  <div class="content" v-html="newsInfo.body" v-else></div>
  <NavBox
    :comments="comments"
    :popularity="popularity"
    @collectino-click="collectionClick"
    :id="id"
  />
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { Skeleton } from "vant";
import { useDetailData, useMountLink } from "@/hooks/useDetailData";
import useCollectionStore from "@/store/modules/collection/collection";
import NavBox from "@/components/NavBox";
const { comments, popularity, newsInfo } = useDetailData();
const collectionStore = useCollectionStore();
const route = useRoute();
const id = ref("");
const flag = ref(false);
useMountLink(newsInfo);
const isCollection = async () => {
  await collectionStore.getCollectionlistAsync();
  const data = collectionStore.data;
  const item: any = data.find((item: any) => {
    return item.news.id == route.params.id;
  });
  if (item) {
    id.value = item.id;
  } else {
    id.value = "";
  }
};
// 判断当前文章是否存在在用户的收藏列表中
onBeforeMount(isCollection);
const collectionClick = async () => {
  if (flag.value) return;
  flag.value = true;
  // 取消收藏
  if (id.value) {
    await collectionStore.removeCollectionAsync(id.value);
  } else {
    // 添加收藏
    await collectionStore.addCollectionAsync(newsInfo.value.id);
  }
  isCollection();
  flag.value = false;
};
</script>

<style scoped lang="less">
.van-skeleton {
  padding: 30px 15px;
}
.content {
  background-color: #fff;
  margin: 0;
  padding-bottom: 50px;
  :deep(.img-place-holder) {
    position: relative;
    height: 375px;
    overflow: hidden;
    .mark {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 70px;
      padding: 0 15px;
      box-sizing: border-box;
      color: rgba(255, 255, 255, 0.8);
      background: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      );
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 这里是超出几行省略 */
      overflow: hidden;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
}
</style>
