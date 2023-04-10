<template>
	<view class="course-wrap">
		<view class="course-top">
			<image class="icon" src="/static/icons/course.png">
		</view>
		<swiper class="course-content" :interval="8000" :duration="300" autoplay circular>
			<swiper-item class="course-item" v-for="(item, index) in list" :key="index" @tap="$jumpPage(`/pages/article/detail/index?id=${item.id}`)">
				<image class="images" :src="item.headPic" mode="widthFix" />
				<view class="content-right">
					<view class="text">
						{{item.title}}
					</view>
					<view class="btn">
						马上瞧瞧
					</view>
				</view>
			</swiper-item>
		</swiper>
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
			}
		},
		methods: {
			tapCarousel(e) {
				const regUrl = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
				if (regUrl.test(e.linkUrl)) {
					this.$jumpPage(`/pages/webView/index?url=${e.linkUrl}`)
				} else {
					this.$jumpPage(e.linkUrl)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.course-wrap {
		margin: 24rpx;
		width: 702rpx;
		height: 368rpx;
		background: linear-gradient(270deg, #014C94 0%, #0678E6 100%);
		border-radius: 12rpx;

		.course-top {
			padding: 26rpx 30rpx;

			.icon {
				width: 149rpx;
				height: 33rpx;
			}
		}

		.course-content {
			margin: 0 10rpx;
			width: 682rpx;
			height: 268rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			padding: 16rpx;
			.course-item{
				display: flex;
				.images {
						width: 236rpx;
						height: 236rpx;
					}
				
					.content-right {
						margin-left: 16rpx;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
				
						.text {
							font-size: 28rpx;
							height: 120rpx;
							line-height: 40rpx;
							word-break: break-all;
							overflow: hidden;
						}
				
						.btn {
							width: 100%;
							height: 84rpx;
							background: linear-gradient(180deg, #52D0FE 0%, #014C94 100%);
							border-radius: 14rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 28rpx;
							font-weight: bold;
							color: #F6F8F9;
						}
					}
				
			}

			}
	}
</style>
