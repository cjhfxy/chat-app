<template>
  <view>
    <view class="item">
      <view class="left">
        <image v-if="item.avatar" :src="item.avatar" mode="aspectFill" lazy-load />
        <image v-else src="/static/icons/icon_avatar.png" />
        {{ item.phoneNumber ? item.phoneNumber : ''}} 
      </view>
      <view class="rigth">
        完成任务数：<text style="color: #FF6464;">{{ item.totalOrders }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 144rpx;
  margin: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F5F5F5;
  padding: 0 24rpx;
  .left {
    font-size: 14px;
    font-weight: 500;
    color: #212121;
    image {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      margin-right: 8rpx;
    }
  }
  .right {
    font-size: 14px;
    color: #212121;
  }
}
.line {
  margin-left: 24rpx;
  width: 726rpx;
  height: 3rpx;
  background-color: #EFEFF4;
}
</style>
