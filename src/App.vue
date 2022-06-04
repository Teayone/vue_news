<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="Home">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped></style>
