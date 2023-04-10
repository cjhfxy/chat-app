<template>
  <cover-view
    v-if="cover"
    v-show="show"
    :class="['m-badge', {smaller}, {bigger}]"
    :style="{top: `${top}rpx`, right: `${right}rpx`}"
  >
    {{ (num || count) > 99 ? '99+' : (num || count) }}
  </cover-view>
  <view
    v-else
    v-show="show"
    :class="['m-badge', {smaller}, {bigger}]"
    :style="{top: `${top}rpx`, right: `${right}rpx`}"
  >
    {{ (num || count) > 99 ? '99+' : (num || count) }}
  </view>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    right: {
      type: Number,
      default: 0
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      smaller: false,
      bigger: false,
      num: 0
    }
  },
  watch: {
    count: {
      handler(newVal, oldVal) {
        this.num = newVal
        if (newVal) {
          this.show = true
        } else {
          this.show = false
        }
        // if (newVal) {
        //   this.show = true
        // }
        // if (oldVal) {
        //   this.smaller = true
        //   setTimeout(() => {
        //     this.smaller = false
        //     if (newVal) {
        //       this.num = newVal
        //       this.bigger = true
        //       setTimeout(() => {
        //         this.bigger = false
        //       }, 140)
        //     } else {
        //       this.show = false
        //     }
        //   }, 140)
        // } else {
        //   this.num = newVal
        //   this.bigger = true
        //   setTimeout(() => {
        //     this.bigger = false
        //   }, 140)
        // }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes smaller {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes bigger {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.smaller {
  animation: smaller .14s ease-out forwards;
}

.bigger {
  animation: bigger .14s ease-out forwards;
}

.m-badge {
  min-width: 36rpx;
  height: 36rpx;
  border-radius: 18rpx;
  background-color: #FF6464;
  padding: 0 6rpx;
  overflow: hidden;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 36rpx;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
