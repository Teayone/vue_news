<template>
  <div class="page-store">
    <Nav title="收藏" />
    <template v-if="data.length !== 0">
      <SwipeCell v-for="item in data" :key="item.id" class="collect-item">
        <Card
          v-if="item && item.news && item.news.title"
          :title="item.news.title"
          class="goods-card"
          :thumb="item.news.image"
          @click="toDetail(item.news.id)"
        />
        <template #right>
          <Button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click.stop="removeCollect(item.id)"
          />
        </template>
      </SwipeCell>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { SwipeCell, Card, Button } from "vant";
import { storeToRefs } from "pinia";
import useCollectionStore from "@/store/modules/collection/collection";
import Nav from "@/components/Nav";
const router = useRouter();
const collectionStore = useCollectionStore();
collectionStore.getCollectionlistAsync(); // 获取收藏列表
const { data } = storeToRefs(collectionStore);
const removeCollect = async (id: string) => {
  await collectionStore.removeCollectionAsync(id);
  await collectionStore.getCollectionlistAsync(); // 获取收藏列表
};
const toDetail = (id: string | number) => {
  router.push({
    name: "detail",
    params: {
      id,
    },
  });
};
</script>

<style scoped lang="less">
.page-store {
  height: 100vh;
  background-color: #fff;
  .delete-button {
    height: 100%;
  }
  .collect-item {
    margin-bottom: 10px;
    :deep(.van-card__title) {
      font-size: 16px;
      line-height: 20px;
      max-height: 200px;
    }
  }
}
</style>
