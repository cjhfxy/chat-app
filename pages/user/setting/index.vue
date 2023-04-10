<template>
	<view class="container">
		<nav-bar title="设置" :back="1" />
		<!-- 用户信息 -->
		<view class="info" @tap="$jumpPage('/pages/user/info/index')">
			<view class="left">
				<image class="image" :src="userInfo.avatar ? userInfo.avatar : '/static/images/avatar.png'"
					mode="aspectFill" />
			</view>
			<view class="center">
				<view class="top">{{ userInfo.nickName }}</view>
				<view class="bot">{{ userInfo.phoneNumber }}</view>
			</view>
			<view class="right">更新信息</view>
		</view>
		<!-- 设置登录密码 -->
		<view class="item" @tap="$jumpPage(`/pages/user/password/index`)">
			<view class="left">{{userInfo.isPayPasswordSet ? '修改登录密码' : '设置登录密码'}}</view>
			<u-icon name="arrow-right" color="#BDBDBD"></u-icon>
		</view>
		
		<!-- 设置提现密码 -->
		<view class="item" @tap="$jumpPage(`/pages/user/withdrawPassword/index`)">
			<view class="left">修改提现密码</view>
			<u-icon name="arrow-right" color="#BDBDBD"></u-icon>
		</view>
		<view class="logout" @tap="handleLogout">退出登录</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				isLoginPasswordSet:false
			}
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			}
		},
		onShow() {
		  this.$store.dispatch('user/getUserInfo').then(res => {
				this.isLoginPasswordSet = res.isLoginPasswordSet
		  })
		},
		methods: {
			handleLogout() {
				uni.showModal({
					title: '温馨提示',
					content: '您确定要退出登录吗?',
					success: res => {
						if (res.cancel) return
						uni.showLoading({
							mask: true,
							title: '加载中'
						})
						this.$store.dispatch('user/logout').then(() => {
							uni.hideLoading()
							uni.navigateBack()
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		background-color: #F6F6F6;

		.info {
			width: 702rpx;
			height: 168rpx;
			background: linear-gradient(270deg, #014C94 0%, #3E96E9 100%);
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			padding: 0 24rpx;
			margin: 32rpx auto 24rpx auto;

			.left {
				width: 104rpx;
				height: 104rpx;
				border-radius: 50%;
				background-color: #EFEFEF;
				overflow: hidden;
				position: relative;

				.image {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					width: 100%;
					height: 100%;
				}
			}

			.center {
				flex: 1;
				margin-left: 24rpx;

				.top {
					font-size: 32rpx;
					line-height: 44rpx;
					font-weight: 500;
					color: #fff;
				}

				.bot {
					font-size: 28rpx;
					line-height: 40rpx;
					font-weight: 400;
					color: #fff;
				}
			}

			.right {
				width: 142rpx;
				height: 48rpx;
				border-radius: 12rpx;
				background-color: #FFFFFF;
				font-size: 24rpx;
				text-align: center;
				line-height: 48rpx;
				color: #014C94;
			}
		}

		.item {
			width: 702rpx;
			height: 92rpx;
			border-radius: 8rpx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 0 24rpx;
			margin: 16rpx auto;

			.left {
				flex: 1;
				height: 42rpx;
				font-size: 32rpx;
				color: #212121;
				line-height: 42rpx;
			}
		}

		.logout {
			width: 702rpx;
			height: 88rpx;
			background: $themeColor;
			border-radius: 12rpx;
			font-size: 32rpx;
			font-weight: 700;
			color: #fff;
			text-align: center;
			line-height: 88rpx;
			position: fixed;
			bottom: 10rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
