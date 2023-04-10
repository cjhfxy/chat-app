<template>
	<view class="content">
		<nav-bar title="个人中心" :back="1" />
		<view class="item">
			<view class="left">
				头像
			</view>
			<view class="right">
				<view class="miti-left">
					<image style="width:72rpx;height:72rpx;border-radius: 36rpx;" :src="userInfo.avatar" mode=""></image>
				</view>
				<view class="miti-right">
					<u-icon name="arrow-right" color="#88889C " size="10"></u-icon>
				</view>
			</view>
		</view>
		<view class="item" @click="popShow=true">
			<view class="left">
				昵称
			</view>
			<view class="right">
				<view class="miti-left">
					{{userInfo.nickName}}
				</view>
				<view class="miti-right">
					<u-icon name="arrow-right" color="#88889C " size="10"></u-icon>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="left">
				手机号
			</view>
			<view class="right">
				<view class="miti-left">
					{{userInfo.phoneNumber}}
				</view>
				<view class="miti-right">
					<u-icon name="arrow-right" color="#88889C " size="10"></u-icon>
				</view>
			</view>
		</view>
		<u-popup :show="popShow" mode="bottom" :round="10" @close="popShow=false">
			<view class="nick pop">
				<view class="txt">
					更改昵称
				</view>
				<view class="inp">
					<input type="text" style="text-align: center;" v-model="nickName" />
				</view>
				<view class="btn" @click="setNickName">
					保存
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		modUserInfo
	} from '@/api/user/user.js';
	import upload from '@/api/system/upload'
	export default {
		data() {
			return {
				userInfo: {},
				nickName:'',
				popShow:false
			}
		},
		onShow() {
			this.$store.dispatch('user/getUserInfo').then(res => {
				this.userInfo = res
				this.nickName = this.userInfo.nickName
			})
		},
		methods: {
			setNickName() {
			  if (!this.nickName) {
			    uni.showToast({
				  	icon: 'none',
			      title: '请输入昵称'
			    })
			    return
			  }
			  const param = {
			    nickName: this.nickName
			  }
			  uni.showLoading({
			    mask: true
			  })
			  this.updateUserInfo(param)
			},
			updateUserInfo(userInfo, close) {
				return new Promise(resolve => {
					modUserInfo({
						nickName: userInfo.nickName,
						avatar: userInfo.avatar
					}).then(res => {
						this.$store.dispatch('user/getUserInfo').then(data => {
							uni.hideLoading()
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							})
							this.userInfo = data
							this.popShow = false
						})
						resolve(res)
					})
				})
			},
			copyContractAddress(label) {
				uni.setClipboardData({
					data: this.userInfo.contractAddress,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: success
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		padding-top: 20rpx;
		.item {
			font-size: 32rpx;
			font-weight: 400;
			color: #212121;
			background-color: #fff;
			padding: 30rpx 20rpx;
			display: flex;
			justify-content: space-between;

			.right {
				display: flex;
				align-items: center;

				.miti-left {
					margin-right: 26rpx;
				}
			}

			.icon {
				margin-right: 42rpx;

				image {
					width: 28rpx;
					height: 28rpx;
				}
			}
		}

		// 昵称修改弹出
		.pop {
			display: flex;
			flex-direction: column;
			padding: 40rpx;

			.txt {
				font-size: 42rpx;
				font-weight: bold;
				color: $themeColor;
				margin-bottom: 40rpx;
			}

			.inp {
				width: 670rpx;
				height: 76rpx;
				border-radius: 30rpx;
				border: 2rpx solid #bdbdbd;
				padding-top: 16rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #212121;
			}

			.btn {
				width: 670rpx;
				height: 80rpx;
				background: $themeColor;
				border-radius: 34rpx;
				margin-top: 40rpx;
				opacity: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
			}
		}
	}
</style>
