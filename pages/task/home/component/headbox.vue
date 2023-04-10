<template>
	<view class="taking-box">
		<view class="top">
			<view class="left">
				<image class="img" src="/static/icons/renwu.png" mode="aspectFill"></image>
				<text>接单</text>
			</view>
			<view class="center">
				<text v-if="phoneCity">归属地：{{phoneCity}}</text>
				<image class="img" src="/static/icons/xinhao.png" mode=""></image>
			</view>
		</view>
		<view class="input">
			<view class="left">
				<input type="text" v-model="phoneNumber" class="num" placeholder="请输入接单的手机号码" placeholder-class="text"
					@blur="getPhoneGeo">
			</view>
			<view class="right">
				<button class="star" @tap="attendTask">开始</button>
			</view>
		</view>
		<view class="tip">
			<text>提示:{{tip}}</text>
		</view>
	</view>
</template>

<script>
	import {
		attendTask
	} from '@/api/task/index.js'
	import {
		getPhoneGeo
	} from '@/api/user/index.js'
	import Mixin from '@/utils/mixin.js'
	export default {
		props: {
			tip: String
		},
		mixins: [Mixin],
		data() {
			return {
				phoneNumber: '',
				phoneCity: ''
			}
		},
		methods: {
			changePhone(e) {
				this.phoneNumber = e
			},
			getPhoneGeo() {
				if (this.phoneNumber.length !== 11) return
				return new Promise((resolve, reject) => {
					getPhoneGeo({
						phoneNumber: this.phoneNumber
					}).then(data => {
						this.phoneCity = data.city
						resolve()
					}).catch(() => {
						reject()
					})
				})
			},
			attendTask() {
				let iphoneReg = /^1[0-9]{10}$/
				if (!this.phoneNumber) {
					return uni.showToast({
						title: '请输入接单手机号码',
						icon: 'none'
					})
				} else if (!iphoneReg.test(this.phoneNumber)) {
					return uni.showToast({
						title: '手机号码格式不对',
						icon: 'none'
					})
				}
				uni.showLoading({
					mask: true,
					title: '接单中'
				})
				this.getPhoneGeo()
				attendTask({
					phoneNumber: this.phoneNumber,
					phoneId: uni.getDeviceInfo().deviceId
				}).then(res => {
					this.$store.commit('user/SET_LAST_PHONENUMBER', this.phoneNumber)
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '接单成功'
					})
					setTimeout(() => {
						this.$emit('begin', this.phoneNumber)
					}, 500);
				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.taking-box {
		margin: 0 30rpx;
		background: linear-gradient(270deg, #014C94 0%, #0678E6 100%);
		padding: 24rpx;
		border-radius: 24rpx;
		.top {
			display: flex;
			align-items: center;
			width: 400rpx;

			.left {
				font-size: 28rpx;
				font-weight: bold;
				color: #FFFFFF;

				.img {
					width: 35rpx;
					height: 35rpx;
					margin-right: 4rpx;
				}
			}

			.center {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-size: 24rpx;
				font-weight: 400;
				color: #E5F6FE;

				.img {
					margin-left: 16rpx;
					width: 20rpx;
					height: 20rpx;
				}

			}
		}

		.input {
			margin: 18rpx 0 16rpx 0;
			display: flex;
			align-items: center;

			.left {
				flex: 1;

				.num {
					height: 60rpx;
					background: #FFFFFF;
					border-radius: 12rpx 0 0 12rpx;
					padding-left: 36rpx;

					.text {
						height: 40rpx;
						font-size: 30rpx;
						font-weight: bold;
						color: #014C94;
					}
				}
			}

			.right {
				.star {
					width: 222rpx;
					height: 60rpx;
					background: linear-gradient(180deg, #52D0FE 0%, #01ABFE 100%);
					border-radius: 0 12rpx 12rpx 0;
					color: #fff;
					line-height: 60rpx;
				}
			}
		}

		.tip {
			padding: 16rpx 0 20rpx 0;
			height: 14rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #E5F6FE;
			line-height: 0rpx;
		}
	}
</style>