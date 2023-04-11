<template>
	<view class="login">
		<nav-bar type="transparentFixed" backgroundColor="#272a37" title="登录" back="1000" color="#a9a9a9"></nav-bar>
<!-- 		 <image class="bg" src="https://wallpapercave.com/wp/wp5587842.jpg"></image> -->
		<view class="login-image">
			<image class="login-image-img" src="/static/login_logo.png" mode=""></image>
		</view>
		<view class="login-from">
			<view class="login-from-box">
				<view class="login-input">
					<image class="login-input-img" src="/static/icons/icon_phone.png"></image>
					<view class="login-input-data">
						<input placeholder="请输入手机号" type="text" v-model="username">
					</view>
				</view>
				<view class="login-input" v-if="type === 'password'">
					<image class="login-input-img" src="/static/icons/icon_password.png"></image>
					<view class="login-input-data">
						<input placeholder="请输入登录密码" type="password" v-model="password">
					</view>
				</view>

			</view>
			<view class="login-input-buttom" @tap="login">
				登录
			</view>
			<view class="login-select">
				<view @tap="changeType">
				密码登录
				</view>
			</view>
			<view class="login-other">
				<text @tap="$jumpPage('/pages/user/safe/forgetpassword')">忘记密码</text> <text class="line">|</text> <text @tap="$jumpPage('/pages/user/register/index')">注册账号</text>
			</view>
		</view>
		
		<view class="login-hint">
			登录即同意
			<text class="link" @tap="$jumpPage('/pages/user/about/about?id=10115')">用户协议</text>
			和
			<text class="link" @tap="$jumpPage('/pages/user/about/about?id=10114')">隐私政策</text>
		</view>
	</view>
</template>
<script>
	import {
		getVcode,loginByWx
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
				redirect:'',
				code: '',
				timer: null
			}
		},
		onLoad(e) {
		  this.redirect = e.redirect
		},
		onShow() {
		  // #ifdef MP-WEIXIN
		  uni.login({
		    provider: 'weixin',
		    success: res => {
		      this.code = res.code
		    }
		  })
		  clearInterval(this.timer)
		  this.timer = setInterval(() => {
		    uni.login({
		      provider: 'weixin',
		      success: res => {
		        this.code = res.code
		      }
		    })
		  }, 3 * 60 * 1000)
		  // #endif
		},
		onHide() {
		  clearInterval(this.timer)
		},
		methods: {
			changeType() {
				this.type = this.type === 'password' ? 'vcode' : 'password'
			},
			getVcode(e) {
				getVcode({
					phoneNumber: this.username
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
						code: this.code,
						dealerUid: this.$store.getters.dealerUid,
					}
				} else {
					parame = {
						username: this.username,
						vCode: this.vCode,
						code: this.code,
						dealerUid: this.$store.getters.dealerUid,
					}
				}
				this.$store.dispatch('user/loginByPhone', parame).then(data => {
					uni.hideLoading()
					console.log(data)
					if (data) {
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						if (this.redirect) {
						    const path = decodeURIComponent(this.redirect)
						    this.$jumpPage(path)
						} else {
							this.$jumpPage('/pages/home/index')
						}
					} else {
						uni.showToast({
							title: '登录失败,请尝试重新登录!',
							icon: 'none'
						})
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		background-color:#272a37;
		position: relative;

		.bg {
			width: 750rpx;
			height: 1334rpx;
			position: absolute;
			bottom: 0;
		}

		.login-image {

			margin-top: 200rpx;
			width: 100%;
			text-align: center;

			.login-image-img {
				width: 240rpx;
				height: 201rpx;
			}
		}


		.login-from {
			margin-top: 80rpx;
			z-index: 2;
			padding: 0 46rpx;
			width: 100%;

			.login-from-box {
				background: #424655;
				border-radius: 8rpx 8rpx 8rpx 8rpx;

				.login-input {
					display: flex;
					align-items: center;
					height: 90rpx;
					margin-top: 20rpx;

					.login-input-img {
						width: 50rpx;
						height: 50rpx;
						margin: 0 20rpx;
					}

					.login-input-data {
						border-left: 1px solid #373a4a;
						flex: 1;
						position: relative;
						padding-left: 20rpx;
						.code{
							position: absolute;
							top:5rpx;
							right:20rpx;
							z-index: 9;
						}
					}
				}
			}

			.login-input-buttom {
				margin-top: 20rpx;
				width: 100%;
				height: 80rpx;
				text-align: center;
				border-radius: 20rpx;
				line-height: 80rpx;
				color: #a9a9a9;
				font-size: 32rpx;
				background: #93e872;
			}

			.login-select {
				margin-top: 24rpx;
				font-size: 28rpx;
				color: #a9a9a9;
			}
			.login-other{
				margin-top: 40rpx;
				display: flex;
				justify-content: center;
				font-size: 28rpx;
				font-weight: 700;
				color:#a9a9a9;
				.line{
					margin: 0 10rpx;
				}
			}
		}


		.login-hint {
			position: fixed;
			bottom: 35rpx;
			height: 32rpx;
			font-size: 26rpx;
			color: #a9a9a9;
			.link{
				color: $themeColor;
			}
		}
		
		
		
		
	}
</style>
