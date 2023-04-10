<template>
	<view class="container">
		<nav-bar :back="1" :title="isLoginPasswordSet?'修改登录密码':'设置登录密码'" />
		<view v-if="show" class="set-wrap">
			<view v-if="isLoginPasswordSet" class="item">
				<view class="label">
					当前密码
				</view>
				<view class="value">
					<input v-model="oldPassword" maxlength="18" placeholder="请输入当前密码" placeholder-style="color:#aaaaaa;"
						password>
				</view>
			</view>
			<view class="item">
				<view class="label">
					{{isLoginPasswordSet?'新登录密码':'登录密码'}}
				</view>
				<view class="value">
					<input v-model="newPassword" placeholder-style="color:#aaaaaa;" placeholder="请输入新密码" password>
				</view>
			</view>
			<view class="item">
				<view class="label">
					确认密码
				</view>
				<view class="value">
					<input v-model="confirmPassword" placeholder-style="color:#aaaaaa;" placeholder="请输入新密码" password>
				</view>
			</view>
			<!-- <view class="item">
				<view class="label">
					手机验证码
				</view>
				<view class="value">
					<input v-model="vcode" maxlength="6" type="text" placeholder="请输入手机验证码"
						placeholder-style="color:#aaaaaa;">
					<count-down ref="countDown" class="get" @onTap="getVerifyUser"  @captcha="getCaptcha" />
				</view>
			</view> -->
			<view class="button" @tap="submit">{{isLoginPasswordSet?'修改密码':'设置密码'}}</view>
		</view>
		<m-loading v-else />
	</view>
</template>

<script>
	import CountDown from '@/components/count-down/'
	import {
		verifyUser,
		setLoginPassword
	} from '@/api/user/user.js'
	export default {
		components: {
			CountDown
		},
		data() {
			return {
				show:false,
				isLoginPasswordSet:false,
				vcode: '',
				oldPassword: '',
				newPassword: '',
				confirmPassword: ''
			}
		},
		onShow() {
		  this.$store.dispatch('user/getUserInfo').then(res => {
		    this.isLoginPasswordSet = res.isLoginPasswordSet
				this.show = true
		  })
		},
		methods: {
			getCaptcha() {
				this.$refs.countDown.getCaptchaData()
			},
			getVerifyUser(e) {
				verifyUser({
					verificationCode:e
				}).then(() => {
					this.$refs.countDown.start()
				})
			},
			submit() {
				if (this.isLoginPasswordSet && !this.oldPassword) {
				  uni.showToast({
				    title: '请输入当前密码',
				    icon: 'none'
				  })
				  return
				}
				if (!this.newPassword) {
				  uni.showToast({
				    title: this.isLoginPasswordSet ? '请输入新登录密码' :  '请输入登录密码',
				    icon: 'none'
				  })
				  return
				}
				if (!this.confirmPassword) {
				  uni.showToast({
				    title: '请输入确认密码',
				    icon: 'none'
				  })
				  return
				}
				if (this.newPassword !== this.confirmPassword) {
				  uni.showToast({
				    title: '二次密码输入不一致',
				    icon: 'none'
				  })
				  return
				}
				// if (!this.vcode) {
				//   uni.showToast({
				//     title: '请输入短信验证码',
				//     icon: 'none'
				//   })
				//   return
				// }
				let param = {}
				if(this.isLoginPasswordSet){
					param = {
					  oldPassword: this.oldPassword,
					  newPassword: this.newPassword,
						vcode: this.vcode
					}
				}else{
					param = {
					  newPassword: this.newPassword,
						vcode: this.vcode
					}
				}
				uni.showLoading({
					title: '处理中'
				})
				setLoginPassword(param).then(res => {
				  this.$store.dispatch('user/getUserInfo').then(() => {
				    uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: '设置成功'
						})
				    setTimeout(() => {
				    	this.$jumpPage('/pages/user/home/index')
				    }, 500);
				  })
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #fff;
		.set-wrap {
			overflow: hidden;
			padding: 40rpx;
			.item {
				display: flex;
				flex-direction: column;
				margin-bottom: 40rpx;
				.label {
					font-size: 28rpx;
					font-weight: 500;
					color: #666;
					padding-left: 40rpx;
				}
			
				.value {
					margin-top: 10rpx;
					height: 100rpx;
					background: #FFFFFF;
					border-radius: 50px;
					border: 2rpx solid #F0F0F0;
					position: relative;
					input {
						height: 100rpx;
						line-height: 100rpx;
						padding-left: 40rpx;
					}
			
					.get {
						position: absolute;
						top:30rpx;
						right: 20rpx;
						width: 188rpx;
						font-size: 28rpx;
						text-align: center;
					}
				}
			}
		}
		
		.button {
			width: 100%;
			height: 92rpx;
			background: $themeColor;
			border-radius: 54rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-weight: 700;
			color: #fff;
		}
	}

	




	
</style>
