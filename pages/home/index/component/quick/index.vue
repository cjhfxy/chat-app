<template>
  <scroll-view class="quick-wrap" scroll-x="true" scroll-left="0">
    <view v-for="(item,index) in list" :key="index" class="scroll-item" @tap="tapCarousel(item)">
      <image class="images" :src="item.imgUrl" mode="widthFix" />
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tapCarousel(e) {
			const regUrl =/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
      if (regUrl.test(e.linkUrl)){
				this.$jumpPage(`/pages/webView/index?url=${e.linkUrl}`)
			}else{
				this.$jumpPage(e.linkUrl)
			}
    }
  }
}
</script>

<style lang="scss" scoped>
	.quick-wrap {
		white-space: nowrap;
		.scroll-item {
			display: inline-block;
			width: 270rpx;
			height: 270rpx;
			margin-right: 24rpx;
	
			.images {
				width: 100%;
				height: 100%;
				border-radius: 12rpx;
			}
			&:first-child{
				margin-left: 24rpx;
			}
		}
	}
</style>
