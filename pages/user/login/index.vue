<template>
	<view class="container">
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
					<input type="text" placeholder="请输入手机号码" maxlength="11" v-model="username" />
				</view>
				<view v-if="type === 'password'" class="login-form-item">
					<text>密码</text>
					<input type="password" maxlength="18" placeholder="请输入登录密码" v-model="password" />
				</view>
				<!-- <view v-if="type === 'vcode'" class="login-form-item">
					<text>验证码</text>
					<input type="number" maxlength="6" placeholder="请输入验证码" v-model="vCode" />
					<count-down ref="countDown" class="code" @onSuccess="getVcode"  @onTap="getCaptcha" />
				</view> -->
				<button @tap="login">登 录</button>
				<!-- <view class="bx-f-ac bx-jsb">
					<view @tap="changeType">{{type==='password'?'验证码登录':'密码登录'}}</view>
					<view @tap="$jumpPage('/pages/user/register/index')">找回密码</view>
				</view> -->
			</view>
			<view class="other">
				还没有账号，<text class="link" @tap="$jumpPage('/pages/user/register/index')">立即注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getVcode
	} from '@/api/user/index.js';
	import CountDown from '@/components/count-down/'
	export default {
		components: {
			CountDown
		},
		data() {
			return {
				username: '',
				password: '',
				vCode: '',
				type: 'password',
			}
		},
		onLoad() {

		},
		methods: {
			changeType() {
				this.type = this.type === 'password' ? 'vcode' : 'password'
			},
			getCaptcha() {
				if (!this.username) {
					return uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
				}
				this.$refs.countDown.getCaptchaData()
			},
			getVcode(e) {
				getVcode({
					phoneNumber: this.username,
					verificationCode: e
				}).then(() => {
					this.$refs.countDown.start()
				})
			},
			login() {
				if (!this.username) {
					return uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
				}
				if (this.type === 'password' && !this.password) {
					return uni.showToast({
						title: '请输入登录密码',
						icon: 'none'
					})
				}
				if (this.type === 'vcode' && !this.vCode) {
					return uni.showToast({
						title: '请输入短信验证码',
						icon: 'none'
					})
				}
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				let parame = {}
				if (this.type === 'password') {
					parame = {
						username: this.username,
						password: this.password,
						userType:1,
					}
				} else {
					parame = {
						username: this.username,
						vCode: this.vCode
					}
				}
				this.$store.dispatch('user/loginByPhone', parame).then(data => {
					uni.hideLoading()
					if (data) {
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						this.$jumpPage('/pages/home/index/index')
					} else {
						uni.showToast({
							title: '登录失败,请尝试重新登录!',
							icon: 'none'
						})
					}
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
				padding-top: 80rpx;

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
					margin-bottom: 40rpx;
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
