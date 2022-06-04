<template>
  <section class="news-box" v-for="(item, index) in newsList" :key="index">
    <Divider content-position="left" v-if="index !== 0">{{
      formatTime(item.date, "{1}月{2}日")
    }}</Divider>
    <div class="content">
      <Item v-for="item2 in item.stories" :key="item2.id" :data="item2" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { Divider } from "vant";
import { formatTime } from "@/utils";
import Item from "@/components/Item";
const props = withDefaults(
  defineProps<{
    newsList: any[];
  }>(),
  {
    newsList: () => [],
  }
);
</script>

<style scoped lang="less">
.news-box {
  padding: 0 15px;
  .van-divider {
    margin: 5px 0;
    font-size: 12px;
    &::before {
      display: none;
    }
  }
}
</style>
