<template>
	<view class="list-box">
		<view class="content">
			<view v-for="(item,index) in listData" :key="index" class="use-item" @click="onchange(item)">
				<view class="left">
					<view class="icon">
						<image :src="item.icons">
					</view>
					<view class="text">
						{{item.text}}
					</view>
				</view>
				<view class="right">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			listData: Array
		},
		methods: {
			onchange(item) {
				if (item.path) {
					this.$jumpPage(item.path)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-box {
		margin: 24rpx;
		width: 702rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		overflow: hidden;
		padding: 24rpx 24rpx 0 24rpx;


		.content {
			display: flex;
			flex-direction: column;

			.use-item {
				display: flex;
				padding-bottom: 24rpx;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.icon {
						image {
							width: 38rpx;
							height: 38rpx;
						}

						margin-right: 24rpx;
					}

					.text {
						font-size: 28rpx;
						color: #333333;
					}
				}

			}
		}
	}
</style>
