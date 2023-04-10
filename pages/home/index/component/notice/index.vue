<template>
	<view class="notice-wrap">
		<view class="left">
			资讯公告
		</view>
		<swiper class="notice_swiper" vertical easing-function="easeInOutCubic" autoplay :interval="interval">
			<swiper-item v-for="(item,index) in list" :key="index" class="notice_item" @tap="$jumpPage(`/pages/article/detail/index?id=${item.id}`)">
				{{item.title}}
			</swiper-item>
		</swiper>
		<view class="right_icon" @tap="$jumpPage(`/pages/article/list/index?id=1012&name=平台公告`)">
			<image src="/static/icons/notice_more.png">
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			interval: {
				type: Number,
				default: 5000
			}
		},
		methods: {
			clickNotice(e) {
				
			}
		}
	};
</script>
<style lang="scss" scoped>
	.notice-wrap {
		width: 702rpx;
		position: absolute;
		top: 700rpx;
		left: 24rpx;
		height: 104rpx;
		background: linear-gradient(98deg, #E5F6FE 0%, #FCFCFC 100%);
		border-radius: 18rpx;
		opacity: 1;
		display: flex;
		align-items: center;

		.left {
			margin: 0 40rpx;
			font-size: 24rpx;
			width: 60rpx;
			line-height: 30rpx;
			text-align: center;
			color: $themeColor;
			font-weight: 700;
		}
		.notice_swiper {
			flex: 1;
			height: 104rpx;
			line-height: 104rpx;
			.notice_item {
				font-size: 28rpx;
				display: inline-block;
			}
		}
		
		.right_icon {
			padding: 0 22rpx;
			image{
				width: 42rpx;
				height: 38rpx;
			}
		}
	}
</style>
