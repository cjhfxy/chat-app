<template>
  <swiper
    class="carousel"
    :interval="3000"
    :duration="300"
    autoplay
    circular
  >
    <swiper-item v-for="(item, index) in list" :key="index">
      <image class="image" mode="aspectFill" :src="item.imgUrl" @tap="tapCarousel(item)" />
    </swiper-item>
  </swiper>
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
    	const regUrl =/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
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
	.carousel {
		width: 750rpx;
		height: 750rpx;
		overflow: hidden;
		background-color: transparent;
		border-radius: 0 0 38rpx 38rpx;
		.image {
			width: 100%;
			height: 100%;
			border-radius: 0 0 38rpx 38rpx;
		}
	}
</style>
