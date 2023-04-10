<template>
	<view class="container">
		<view class="back">
			<u-icon color="#fff" name="arrow-left" size="25" @tap="$jumpPage('/pages/user/home/index')"></u-icon>
		</view>
		<view class="header">
			<view class="text">
				您好，
				<br />
				欢迎来到玉兔接单
			</view>
		</view>
		<view class="login-wrap">
			<view class="login-form">
				<view class="login-form-item">
					<text>手机号码</text>
					<input type="text" placeholder="请输入手机号码" maxlength="11" v-model="formData.phoneNumber" />
				</view>
				<view class="login-form-item">
					<text>昵称</text>
					<input type="text" placeholder="请输入昵称" v-model="formData.name" />
				</view>
				<view class="login-form-item">
					<text>登录密码</text>
					<input type="password" maxlength="18" placeholder="请输入登录密码" v-model="formData.password" />
				</view>
				<view class="login-form-item">
					<text>提现密码</text>
					<input type="password" maxlength="18" placeholder="请输入提现密码" v-model="formData.payPassword" />
				</view>
				<view class="login-form-item">
					<text>邀请码</text>
					<input type="text" placeholder="请输入邀请码(选填)" v-model="formData.dealerId" />
				</view>
				<button @tap="register">注册</button>
			</view>
			<view class="other">
				已有账号，<text class="link" @tap="$jumpPage('/pages/user/login/index')">立即登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		register,
		getVcode
	} from '@/api/user/index.js';
	import CountDown from '@/components/count-down/'
	export default {
		components: {
			CountDown
		},
		data() {
			return {
				formData:{
					phoneNumber: '',
					password: '',
					vCode: '',
					dealerId:'',
					payPassword:''
				}
			}
		},
		onLoad(e) {
			if (e.dealerId) {
				this.dealerId = e.dealerId
			}
		},
		methods: {
			getCaptcha() {
				if (!this.formData.phoneNumber) {
					return uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
				}
				this.$refs.countDown.getCaptchaData()
			},
			getVcode(e) {
				getVcode({
					phoneNumber: this.formData.phoneNumber,
					verificationCode: e
				}).then(() => {
					this.$refs.countDown.start()
				})
			},
			register() {
				if (!this.formData.phoneNumber) {
					return uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
				}
				if (!this.formData.name) {
					return uni.showToast({
						title: '请输入昵称',
						icon: 'none'
					})
				}
				if (!this.formData.password) {
					return uni.showToast({
						title: '请输入登录密码',
						icon: 'none'
					})
				}
				if (!this.formData.payPassword) {
					return uni.showToast({
						title: '请输入提现密码',
						icon: 'none'
					})
				}
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				register(this.formData).then(res => {
					uni.showToast({
						icon: 'none',
						title: '注册成功'
					})
					setTimeout(() => {
						this.$jumpPage('/pages/user/login/index')
					}, 500);
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		position: relative;
		background: #fff;

		.back {
			position: absolute;
			top: calc(24px + var(--status-bar-height));
			left: 20rpx;
			z-index: 999;
		}

		.header {
			width: 100%;
			height: 450rpx;
			background-image: url(/static/images/login_header.jpg);
			background-size: 100%;

			.text {
				text-align: left;
				font-size: 42rpx;
				color: #ffffff;
				padding: 130rpx 0 0 70rpx;
				font-weight: bold;
				line-height: 70rpx;
			}
		}

		.login-wrap {
			width: 100%;
			position: relative;
			margin-top: -120rpx;
			background-color: #ffffff;
			border-radius: 8% 8% 0% 0;

			.login-form {
				width: 600rpx;
				margin: 0 auto;
				font-size: 28rpx;
				padding-top: 60rpx;

				.login-form-item {
					position: relative;

					input {
						height: 80rpx;
						line-height: 80rpx;
						margin-bottom: 20rpx;
						border-bottom: 1px solid #e9e9e9;
						font-size: 28rpx;
					}
					.code{
						position: absolute;
						bottom:20rpx;
						right:20rpx;
					}
				}

				button {
					font-size: 28rpx;
					background: #014C94;
					color: #fff;
					height: 90rpx;
					line-height: 90rpx;
					border-radius: 10rpx;
					font-weight: bold;
				}
			}
	
			.other{
				margin-top: 80rpx;
				text-align: center;
				font-size: 28rpx;
				.link{
					color: $themeColor;
					font-size: 32rpx;
					font-weight: 700;
				}
			}
	
		}
	}
</style>
