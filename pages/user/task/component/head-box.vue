<template>
	<view class="taking-box">
		<view class="top">
			<view class="left">
				<image class="img" src="/static/icons/renwu.png" mode="aspectFill"></image>
				<text>接单号码</text>
			</view>
			<view class="center">
				<text v-if="phoneCity">归属地：{{phoneCity}}</text>
				<image class="img" src="/static/icons/xinhao.png" mode=""></image>
			</view>
		</view>
		<view class="input">
			<view class="left">
				<input type="text" v-model="phoneNumber" class="num" placeholder="请输入接单的手机号码" placeholder-class="text" @blur="getPhoneGeo">
			</view>

			<view class="right">
				<button class="star" @tap="search">查询</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPhoneGeo
	} from '@/api/user/index.js'
	export default {

		data() {
			return {
				phoneNumber: '',
				phoneCity:''
			}
		},
		computed: {
		  lastPhoneNumber() {
		    return this.$store.getters.lastPhoneNumber || ''
		  }
		},
		watch: {
		  lastPhoneNumber: {
		    handler(e) {
		      if (e) {
		        this.phoneNumber = e
		      }
		    },
		    immediate: true
		  }
		},
		methods: {
			getPhoneGeo() {
				if (this.phoneNumber.length !== 11) return
				return new Promise((resolve, reject) => {
					getPhoneGeo({
						phoneNumber:this.phoneNumber
					}).then(data => {
						this.phoneCity = data.city
						resolve()
					}).catch(() => {
						reject()
					})
				})
			},
			changePhone(e){
				this.phoneNumber = e
				this.getPhoneGeo()
				this.$emit('search',e)
			},
			search(){
				if (!this.phoneNumber) {
					return uni.showToast({
						title: '请输入接单手机号码',
						icon: 'none'
					})
				}
				this.$emit('search',this.phoneNumber)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.taking-box {
		height: 170rpx;
		width: 100%;
		background: linear-gradient(270deg, #014C94 0%, #0678E6 100%);
		padding: 24rpx;

		.top {
			display: flex;
			align-items: center;
			width: 400rpx;
			.left {
				font-size: 22rpx;
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
					border-radius: 12rpx;
					padding-left: 36rpx;

					.text {
						height: 40rpx;
						font-size: 30rpx;
						font-weight: bold;
						color: #014C94;
					}
				}
			}
			
			.phoneList{
				padding: 0 20rpx 0 10rpx;
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}

			.right {
				.star {
					width: 222rpx;
					height: 60rpx;
					background: linear-gradient(180deg, #52D0FE 0%, #01ABFE 100%);
					border-radius: 14rpx;
					color: #fff;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
