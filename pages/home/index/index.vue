<template>
	<view class="home">
		<nav-bar title="会话" backgroundColor="#272a37" color="#a9a9a9">
			<template #right>
				<u-icon name="plus" color="#a9a9a9" size="24"></u-icon>
			</template>
		</nav-bar>
		<view class="box">
			<view class="search">
				<u-icon name="search" color="#a9a9a9" size="28"></u-icon>
				<u--input border="none" color="#a9a9a9" placeholder="请输入内容"></u--input>
			</view>
			<view class="item">
				<image src="/static/logo.png" alt="" />
				<view class="text">
					<view class="title">
						1112
					</view>
					<view class="name">
						56565
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #272a37;
		padding: 24rpx;
		min-height: 100vh;
		border-top: 1px solid #373a4a;

		.search {
			display: flex;
			align-items: center;
			border-radius: 20rpx;
			height: 70rpx;
			background-color: #424655;
		}

		.item {
			display: flex;
			margin: 20rpx 0;
			padding: 20rpx 0;
			background-color: #323643;
			border-radius: 20rpx;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-left: 20rpx;
			}

			.text {
				margin-left: 20rpx;

				.title {}

				.name {
					margin-top: 20rpx;
					font-size: 16rpx;
					color: #a9a9a9;
				}
			}
		}
	}
</style>