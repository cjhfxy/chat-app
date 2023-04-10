<template>
	<view class="content">
		<nav-bar :back="1" title="找回密码"></nav-bar>
		<template v-if="step !==3">
			<p class="txt1">忘记密码</p>
			<p class="txt2">{{ step === 1 ? '请输入您的手机号码以继续。' : '请设置新密码以完成密码重置。'}}</p>
		</template>
		<template v-if="step===1">
			<view class="con">
				<p>
					手机号码
				</p>
				<view class="inp">
					<input type="number" v-model="accountName" placeholder="请输入手机号码" />
				</view>
			</view>
			<view class="btn" @click="validAccount">
				下一步
			</view>
		</template>
		<template v-if="step===2">
			<view class="con">
				<p>
					新密码
				</p>
				<view class="inp">
					<input type="password" v-model="newPassword" placeholder="请输入新密码" />
				</view>
			</view>
			<view class="con">
				<p>
					确认密码
				</p>
				<view class="inp">
					<input type="password" v-model="confirmPassword" placeholder="请输入确认密码" />
				</view>
			</view>
			<view class="con">
				<p>
					短信验证码
				</p>
				<view class="inp">
					<input type="number" v-model="vcode" placeholder="新密码" />
					<count-down ref="countDown" class="get" @onTap="getVcode" @captcha="getCaptcha"/>
				</view>
			</view>
			<view class="btn" @click="reset">
				重置密码
			</view>
		</template>
		<template  v-if="step===3">
			<view class="success-box">
				<image class="image" src="/static/images/login-sucess.png"></image>
			</view>
			<p class="txt1">更改成功</p>
			<p class="txt2">您已成功更改密码。请在登录时使用新密码。</p>
			<view class="btn" @click="$jumpPage('/pages/user/login/index')">
					立即登入
			</view>
		</template>
	</view>
</template>

<script>
	import CountDown from '@/components/count-down/'
	import {
		getVcode
	} from '@/api/user/index.js';
	import {
		validAccount,
		resetLoginPassword
	} from '@/api/user/user.js';
	export default {
		components: {
			CountDown
		},
		data() {
			return {
				step:1,
				accountName: '',
				newPassword:'',
				confirmPassword: '',
				vcode: ''
			}
		},
		methods: {
			getCaptcha() {
				this.$refs.countDown.getCaptchaData()
			},
			getVcode(e) {
				getVcode({
					phoneNumber: this.accountName,
					verificationCode: e
				}).then(() => {
					this.$refs.countDown.start()
				})
			},
			validAccount(){
				if (!this.accountName) {
				  uni.showToast({
				    title: '请输入手机号码',
				    icon: 'none'
				  })
				  return
				}
				validAccount({
					accountName: this.accountName
				}).then(() => {
					this.step = 2
				})
			},
			reset(){
				if (!this.newPassword) {
				  uni.showToast({
				    title: '请输入新密码',
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
				if (!this.vcode) {
				  uni.showToast({
				    title: '请输入短信验证码',
				    icon: 'none'
				  })
				  return
				}
				uni.showLoading({
					title: '处理中'
				})
				resetLoginPassword({
					accountName: this.accountName,
					newPassword:this.newPassword,
					vcode:this.vcode
				}).then(() => {
					uni.hideLoading()
					this.step = 3
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		position: relative;
		width: 100%;
		padding: 40rpx 40rpx 0 40rpx;

		.txt1 {
			margin-top: 48rpx;
			font-size: 64rpx;
			font-weight: bold;
			color: $themeColor;
		}

		.txt2 {
			margin-top: 36rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #212121;
			margin-bottom: 30rpx;
		}
		.success-box{
			margin:72rpx;
			display: flex;
			justify-content: center;
			.image{
				width:400rpx;
				height:400rpx;
			}
		}
		
		.con {
			margintop: 20rpx;

			p {
				margin-left: 32rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #666;
				margin-top: 38rpx;
			}

			.inp {
				width: 654rpx;
				height: 100rpx;
				margin-top: 20rpx;
				border: 1px solid #bdbdbd;
				border-radius: 50rpx;
				padding: 32rpx;
				color: #212121;
				font-size: 30rpx;
				position: relative;
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
		.btn {
			width: 100%;
			height: 100rpx;
			margin-top: 60rpx;
			background: $themeColor;
			border-radius: 54rpx;
			color: #fff;
			text-align: center;
			line-height: 100rpx;
		}
	}
</style>
