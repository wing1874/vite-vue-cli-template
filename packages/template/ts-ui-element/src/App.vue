<script setup lang="ts"></script>

<template>
  <div>
    <router-link to="/home">Go to home</router-link>
    <br />
    <br />
    <router-link to="/about">Go to About</router-link>
    <!-- 这里是渲染路由组件的地方 -->
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
