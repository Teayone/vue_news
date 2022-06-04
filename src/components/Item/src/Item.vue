<template>
  <div class="news-item">
    <router-link
      :to="{ name: 'detail', params: { id: data.id } }"
      class="news-item_content"
    >
      <div class="img-box">
        <img
          v-if="data.images && data.images.length > 0"
          v-lazy="data.images[0]"
          alt=""
        />
      </div>
      <h4 class="title">
        {{ data.title }}
      </h4>
      <p class="desc">{{ data.hint }}</p>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    data: any;
  }>(),
  {
    data: () => ({}),
  }
);
</script>

<style scoped lang="less">
.news-item {
  position: relative;
  padding: 15px 0;
  height: 95px;
  box-sizing: border-box;
  overflow: hidden;
  .news-item_content {
    display: block;
  }
  a:visited {
    .title {
      color: #999;
    }
  }
  .img-box {
    position: absolute;
    right: 0;
    top: 15px;
    width: 65px;
    height: 65px;
    background-color: #d5d5d5;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .title {
    font-size: 16px;
    line-height: 25px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
    overflow: hidden;
    color: #000;
    margin-right: 75px;
  }
  .desc {
    margin-right: 75px;
    line-height: 15px;
    font-size: 12px;
    color: #999;
  }
}
</style>
