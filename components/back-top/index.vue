<template>
  <image :class="['back-top', {show}]" src="/static/icons/back_top.png" @tap="backTop" />
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    backTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back-top {
  width: 84rpx;
  height: 84rpx;
  position: fixed;
  bottom: 150rpx;
  right: 24rpx;
  z-index: 999;
  opacity: 0;
  transition: all .28s;
  pointer-events: none;
  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
