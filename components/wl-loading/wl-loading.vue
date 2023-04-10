<template>
  <view class="m-loading" :style="{height: `calc(100vh - ${navBarHeight}px)`}">
    <u-loading color="#FF6464" size="50" />
  </view>
</template>

<script>
export default {
  computed: {
    navBarHeight() {
      return this.$store.getters.navBarInfo.height
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes show {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.m-loading {
  width: 100%;
  height: calc(100vh - #{$navBarHeight});
  display: flex;
  align-items: center;
  justify-content: center;
  animation: show .2s ease-out forwards;
  position: fixed;
  bottom: 0;
}
</style>
